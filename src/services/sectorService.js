import http from "./httpService";

const apiEndPoint = "/sectors";

export function getSectors() {
  return http.get(apiEndPoint);
}
