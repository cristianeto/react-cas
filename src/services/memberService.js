import http from "./httpService";

const apiEndpoint1 = "/projects";
const apiEndpoint2 = "/members";

function membersUrl(id) {
  return `${apiEndpoint1}/${id}${apiEndpoint2}`;
}

export function getMembers(projectId) {
  return http.get(membersUrl(projectId));
}
