import http from "./httpService";

const apiEndpoint1 = "/projects";
const apiEndpoint2 = "/status";

function projectStatusesUrl(projectSlug) {
  return `${apiEndpoint1}/${projectSlug}${apiEndpoint2}`;
}

export function getProjectStatuses(projectSlug) {
  return http.get(projectStatusesUrl(projectSlug));
}

export function saveProjectStatus(projectSlug, status) {
  return http.post(apiEndpoint1 + '/' + projectSlug + apiEndpoint2 + '/' + status);
}
