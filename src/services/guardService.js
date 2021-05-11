import http from '../auth/httpService';

const apiEndPoint = '/guards';

export function getGuards() {
  return http.get(apiEndPoint);
}
