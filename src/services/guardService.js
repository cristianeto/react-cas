import http from "./httpService";

const apiEndPoint = "/guards";

export function getGuards() {
  return http.get(apiEndPoint);
}
