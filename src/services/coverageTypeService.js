import http from '../auth/httpService';

export function getCoverageTypes() {
  return http.get('/coveragetypes');
}
