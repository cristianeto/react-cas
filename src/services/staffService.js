import http from '../auth/httpService';

const apiEndPoint = '/staffs';

export function getStaffs() {
  return http.get(apiEndPoint);
}
