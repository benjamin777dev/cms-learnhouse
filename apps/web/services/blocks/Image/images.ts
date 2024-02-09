import { getAPIUrl } from '@services/config/config'
import { RequestBody, RequestBodyForm } from '@services/utils/ts/requests'

export async function uploadNewImageFile(file: any, activity_uuid: string) {
  // Send file thumbnail as form data
  const formData = new FormData()
  formData.append('file_object', file)
  formData.append('activity_uuid', activity_uuid)

  return fetch(
    `${getAPIUrl()}blocks/image`,
    RequestBodyForm('POST', formData, null)
  )
    .then((result) => result.json())
    .catch((error) => console.log('error', error))
}

export async function getImageFile(file_id: string) {
  // todo : add course id to url
  return fetch(
    `${getAPIUrl()}blocks/image?file_id=${file_id}`,
    RequestBody('GET', null, null)
  )
    .then((result) => result.json())
    .catch((error) => console.log('error', error))
}
