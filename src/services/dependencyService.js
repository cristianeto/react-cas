import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/dependencies";

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
  if (dependency.id_dependency) {
    const body = { ...dependency };
    delete body.id_dependency;
    return http.put(dependencyUrl(dependency.id_dependency), body);
  }
  console.log("Post:", dependency);
  return http.post(apiEndpoint, dependency);
}

export function deleteDependency(dependencyId) {
  return http.delete(dependencyUrl(dependencyId));
}
