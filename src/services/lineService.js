import http from "./httpService";

const apiEndPoint = "/lines";

export function getLines() {
  return http.get(apiEndPoint);
}
