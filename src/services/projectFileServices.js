import http from '../auth/httpService';

const apiEndpoint1 = '/projects';
const apiEndpoint2 = '/resolution';

function projectResolutionUrl(projectSlug) {
  return `${apiEndpoint1}/${projectSlug}${apiEndpoint2}`;
}

export function getProjectResolution(projectSlug) {
  return http.get(projectResolutionUrl(projectSlug));
}

export function saveProjectResolution(project) {
  return http.post(apiEndpoint1 + apiEndpoint2, project.slug);
}
