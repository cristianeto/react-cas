import http from "./httpService";

const apiEndpoint = "/projects";

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
  if (project.id) {
    const body = { ...project };
    delete body.id;
    return http.put(projectUrl(project.id), body);
  }
  return http.post(apiEndpoint, project);
}

export function deleteProject(projectId) {
  return http.delete(projectUrl(projectId));
}
