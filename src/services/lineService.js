import http from '../auth/httpService';

const apiEndPoint = '/lines';

export function getLines() {
  return http.get(apiEndPoint);
}
