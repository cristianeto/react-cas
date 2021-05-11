import http from '../auth/httpService';

export function getDependencyTypes() {
  return http.get('/dependencytypes');
}
