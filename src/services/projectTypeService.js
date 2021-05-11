import http from '../auth/httpService';

export function getProjectTypes() {
  return http.get('/projecttypes');
}
