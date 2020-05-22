import http from "./httpService";

const apiEndpoint = "/usersroles";

function userRoleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRolesByUser(userId) {
  return http.get(userRoleUrl(userId));
}
