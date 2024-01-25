import { getBackendUrl } from "@services/config/config";
const LEARNHOUSE_MEDIA_URL = process.env.NEXT_PUBLIC_LEARNHOUSE_MEDIA_URL;

function getMediaUrl() {
  if (LEARNHOUSE_MEDIA_URL) {
    return LEARNHOUSE_MEDIA_URL;
  } else {
    return getBackendUrl();
  }
}

export function getCourseThumbnailMediaDirectory(orgUUID: string, courseId: string, fileId: string) {
  let uri = `${getMediaUrl()}content/orgs/${orgUUID}/courses/${courseId}/thumbnails/${fileId}`;
  return uri;
}

export function getUserAvatarMediaDirectory(userUUID: string, fileId: string) {
  let uri = `${getMediaUrl()}content/users/${userUUID}/avatars/${fileId}`;
  return uri;
}

export function getActivityBlockMediaDirectory(orgUUID: string, courseId: string, activityId: string, blockId: any, fileId: any, type: string) {
  if (type == "pdfBlock") {
    let uri = `${getMediaUrl()}content/${orgUUID}/courses/${courseId}/activities/${activityId}/dynamic/blocks/pdfBlock/${blockId}/${fileId}`;
    return uri;
  }
  if (type == "videoBlock") {
    let uri = `${getMediaUrl()}content/${orgUUID}/courses/${courseId}/activities/${activityId}/dynamic/blocks/videoBlock/${blockId}/${fileId}`;
    return uri;
  }
  if (type == "imageBlock") {
    let uri = `${getMediaUrl()}content/${orgUUID}/courses/${courseId}/activities/${activityId}/dynamic/blocks/imageBlock/${blockId}/${fileId}`;
    return uri;
  }
}

export function getActivityMediaDirectory(orgUUID: string, courseId: string, activityId: string, fileId: string, activityType: string) {
  if (activityType == "video") {
    let uri = `${getMediaUrl()}content/${orgUUID}/courses/${courseId}/activities/${activityId}/video/${fileId}`;
    return uri;
  }
  if (activityType == "documentpdf") {
    let uri = `${getMediaUrl()}content/${orgUUID}/courses/${courseId}/activities/${activityId}/documentpdf/${fileId}`;
    return uri;
  }
}

export function getOrgLogoMediaDirectory(orgUUID: string, fileId: string) {
  let uri = `${getMediaUrl()}content/orgs/${orgUUID}/logos/${fileId}`;
  return uri;
}
