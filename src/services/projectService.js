import http from "./httpService";

const apiEndpoint = "/projects";

function projectUrl(slug) {
  return `${apiEndpoint}/${slug}`;
}

export function getProjects() {
  return http.get(apiEndpoint);
}
export function getProject(projectSlug) {
  return http.get(projectUrl(projectSlug));
}

export function saveProject(project) {
  if (project.slug) {
    const body = { ...project };
    //delete body.slug;
    return http.put(projectUrl(project.slug), body);
  }
  return http.post(apiEndpoint, project);
}

export function deleteProject(projectSlug) {
  return http.delete(projectUrl(projectSlug));
}
