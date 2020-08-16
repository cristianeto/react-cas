import http from "./httpService";

const apiEndpoint1 = "/users";
const apiEndpoint2 = "/roles";

function userRoleUrl(id) {
  return `${apiEndpoint1}/${id}${apiEndpoint2}`;
}

export function getRolesByUser(userId) {
  return http.get(userRoleUrl(userId));
}
