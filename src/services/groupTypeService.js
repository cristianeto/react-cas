import http from '../auth/httpService';

export function getGroupTypes() {
  return http.get('/grouptypes');
}
