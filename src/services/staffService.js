import http from "./httpService";

const apiEndPoint = "/staffs";

export function getStaffs() {
  return http.get(apiEndPoint);
}
