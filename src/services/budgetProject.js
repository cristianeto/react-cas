import http from "./httpService";

const apiEndpoint1 = "/projects";
const apiEndpoint2 = "/budget";

function projectBudgetUrl(projectSlug) {
  return `${apiEndpoint1}/${projectSlug}${apiEndpoint2}`;
}

export function getProjectBudget(projectSlug) {
  return http.get(projectBudgetUrl(projectSlug));
}
