import http from "./httpService";

const apiEndPoint = "/roles";

export function getRoles() {
  return http.get(apiEndPoint);
}
