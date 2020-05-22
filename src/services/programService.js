import http from "./httpService";

const apiEndPoint = "/programs";

export function getPrograms() {
  return http.get(apiEndPoint);
}
