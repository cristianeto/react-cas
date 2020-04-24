import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/projects";

function projectUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProjects() {
  return http.get(apiEndpoint);
}
export function getProject(projectId) {
  return http.get(projectUrl(projectId));
}

export function saveProject(project) {
  if (project.id_project) {
    const body = { ...project };
    delete body.id_project;
    return http.put(projectUrl(project.id_project), body);
  }
  return http.post(apiEndpoint, project);
}

export function deleteProject(projectId) {
  return http.delete(projectUrl(projectId));
}
