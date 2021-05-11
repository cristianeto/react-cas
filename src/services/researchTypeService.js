import http from '../auth/httpService';

export function getResearchTypes() {
  return http.get('/researchtypes');
}
