from uuid import uuid4
from pydantic import BaseModel
from src.services.security import *
from fastapi import HTTPException, status, Request
from datetime import datetime

#### Classes ####################################################


class User(BaseModel):
    username: str
    email: str
    full_name: str | None = None
    disabled: bool | None = False
    avatar_url: str | None = None
    verified: bool | None = False
    user_type: str | None = None
    bio: str | None = None


class UserWithPassword(User):
    password: str


class PublicUser(User):
    user_id: str
    creationDate: str
    updateDate: str


class UserInDB(UserWithPassword):
    user_id: str
    password: str
    creationDate: str
    updateDate: str


class UserProfileMetadata(BaseModel):
    user_object: PublicUser
    roles = list

# TODO : terrible, export role classes from one single source of truth


class Role(BaseModel):
    name: str
    description: str
    permissions: object
    elements: object

#### Classes ####################################################

# TODO : user actions security
# TODO : avatar upload and update


async def get_user(request: Request, username: str):
    users = request.app.db["users"]

    user = users.find_one({"username": username})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User does not exist")

    user = User(**user)
    return user


async def get_profile_metadata(request: Request, user):
    users = request.app.db["users"]
    roles = request.app.db["roles"]

    user = users.find_one({"user_id": user['user_id']})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User does not exist")

    # get roles
    user_roles = roles.find({"linked_users": user['user_id']})

    user_roles_list = []
    for role in user_roles:
        print(role)
        user_roles_list.append(Role(**role))

    return {
        "user_object": PublicUser(**user),
        "roles": user_roles_list
    }


async def get_user_by_userid(request: Request, user_id: str):
    users = request.app.db["users"]

    user = users.find_one({"user_id": user_id})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User does not exist")

    user = User(**user)
    return user


async def security_get_user(request: Request, email: str):
    users = request.app.db["users"]

    user = users.find_one({"email": email})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User with Email does not exist")

    return UserInDB(**user)


async def get_userid_by_username(request: Request, username: str):
    users = request.app.db["users"]

    user = users.find_one({"username": username})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User does not exist")

    return user["user_id"]


async def update_user(request: Request, user_id: str, user_object: UserWithPassword):
    users = request.app.db["users"]

    isUserExists = users.find_one({"user_id": user_id})
    isUsernameAvailable = users.find_one({"username": user_object.username})

    if not isUserExists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User does not exist")

    if isUsernameAvailable:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Username already used")

    user_object.password = await security_hash_password(user_object.password)

    updated_user = {"$set": user_object.dict()}
    users.update_one({"user_id": user_id}, updated_user)

    return User(**user_object.dict())


async def delete_user(request: Request, user_id: str):
    users = request.app.db["users"]

    isUserAvailable = users.find_one({"user_id": user_id})

    if not isUserAvailable:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User does not exist")

    users.delete_one({"user_id": user_id})

    return {"detail": "User deleted"}


async def create_user(request: Request, user_object: UserWithPassword):
    users = request.app.db["users"]

    isUserAvailable = users.find_one({"username": user_object.username})

    if isUserAvailable:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Username already exists")

    # generate house_id with uuid4
    user_id = str(f"user_{uuid4()}")

    # lowercase username
    user_object.username = user_object.username.lower()

    user_object.password = await security_hash_password(user_object.password)

    user = UserInDB(user_id=user_id, creationDate=str(datetime.now()),
                    updateDate=str(datetime.now()), **user_object.dict())

    user_in_db = users.insert_one(user.dict())

    return User(**user.dict())
