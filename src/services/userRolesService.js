import http from "./httpService";

const apiEndpoint1 = "/users";
const apiEndpoint2 = "/roles";

function userRoleUrl(id) {
  return `${apiEndpoint1}/${id}${apiEndpoint2}`;
}

export function getRolesByUser(userId) {
  return http.get(userRoleUrl(userId));
}

export function saveRolesByUser(userId, roles) {
  if (userId) {
    const body = { "roles": roles }
    return http.put(userRoleUrl(userId), body);
  }
  /* const body = { ...member };
  body['project_slug'] = member.project_slug;
  delete body.projectId;
  return http.post(apiEndpoint1 + apiEndpoint2, body); */
}
