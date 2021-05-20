import http from '../auth/httpService';

export function getDependencyTypes() {
  return http.get('/dependencytypes');
}

export function getDependenciesByType(type) {
  return http.get(`/dependencies/types/${type}`);
}
