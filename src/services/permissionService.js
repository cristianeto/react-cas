import http from "./httpService";

const apiEndPoint = "/permissions";

export function getPermissions() {
  return http.get(apiEndPoint);
}
