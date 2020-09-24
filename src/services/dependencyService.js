import http from "./httpService";

const apiEndpoint = "/dependencies";

function dependencyUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getDependencies() {
  return http.get(apiEndpoint);
}
export function getDependency(dependencyId) {
  return http.get(dependencyUrl(dependencyId));
}

export function saveDependency(dependency) {
  if (dependency.id) {
    const body = { ...dependency };
    delete body.id;
    return http.put(dependencyUrl(dependency.id), body);
  }
  return http.post(apiEndpoint, dependency);
}

export function deleteDependency(dependencyId) {
  return http.delete(dependencyUrl(dependencyId));
}
