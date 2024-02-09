import { getAPIUrl } from '@services/config/config'
import { RequestBody, RequestBodyForm } from '@services/utils/ts/requests'

export async function uploadNewVideoFile(file: any, activity_uuid: string) {
  // Send file thumbnail as form data
  const formData = new FormData()
  formData.append('file_object', file)
  formData.append('activity_uuid', activity_uuid)

  return fetch(
    `${getAPIUrl()}blocks/video`,
    RequestBodyForm('POST', formData, null)
  )
    .then((result) => result.json())
    .catch((error) => console.log('error', error))
}

export async function getVideoFile(file_id: string) {
  return fetch(
    `${getAPIUrl()}blocks/video?file_id=${file_id}`,
    RequestBody('GET', null, null)
  )
    .then((result) => result.json())
    .catch((error) => console.log('error', error))
}
