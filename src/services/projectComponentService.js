import http from "./httpService";

const apiEndpoint1 = "/projects";
const apiEndpoint2 = "/components";

function projectComponentsUrl(projectSlug) {
  return `${apiEndpoint1}/${projectSlug}${apiEndpoint2}`;
}

function projectComponentUrl(projectId, memberId) {
  return `${apiEndpoint1}/${projectId}${apiEndpoint2}/${memberId}`;
}

export function getProjectComponents(projectSlug) {
  return http.get(projectComponentsUrl(projectSlug));
}
export function saveComponent(component) {
  if (component.id) {
    const body = { ...component }
    delete body.id;
    return http.put(projectComponentUrl(component.id), body);
  }
  return http.post(apiEndpoint1 + apiEndpoint2, component);
}