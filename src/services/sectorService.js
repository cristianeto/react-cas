import http from '../auth/httpService';

const apiEndPoint = '/sectors';

export function getSectors() {
  return http.get(apiEndPoint);
}
