import http from '../auth/httpService';

const apiEndPoint = '/programs';

export function getPrograms() {
  return http.get(apiEndPoint);
}
