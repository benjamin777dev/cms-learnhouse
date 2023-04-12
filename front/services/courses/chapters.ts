import { getAPIUrl } from "@services/config/config";
import { RequestBody, errorHandling } from "@services/utils/ts/requests";

/*
 This file includes only POST, PUT, DELETE requests
 GET requests are called from the frontend using SWR (https://swr.vercel.app/)
*/

//TODO : depreciate this function
export async function getCourseChaptersMetadata(course_id: any) {
  const result = await fetch(`${getAPIUrl()}chapters/meta/course_${course_id}`, RequestBody("GET", null));
  const res = await errorHandling(result);
  return res;
}

export async function updateChaptersMetadata(course_id: any, data: any) {
  const result: any = await fetch(`${getAPIUrl()}chapters/meta/course_${course_id}`, RequestBody("PUT", data));
  const res = await errorHandling(result);
  return res;
}

export async function createChapter(data: any, course_id: any) {
  const result: any = await fetch(`${getAPIUrl()}chapters/?course_id=course_${course_id}`, RequestBody("POST", data));
  const res = await errorHandling(result);

  return res;
}

export async function deleteChapter(coursechapter_id: any) {
  const result: any = await fetch(`${getAPIUrl()}chapters/${coursechapter_id}`, RequestBody("DELETE", null));
  const res = await errorHandling(result);
  return res;
}
