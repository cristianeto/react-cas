import http from "./httpService";

const apiEndpoint = "/roles";

function roleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRoles() {
  return http.get(apiEndpoint);
}
export function getRole(roleId) {
  return http.get(roleUrl(roleId));
}

export function saveRole(role) {
  if (role.id) {
    const body = { ...role };
    delete body.id;
    delete body.name;
    return http.put(roleUrl(role.id), body);
  }
  return http.post(apiEndpoint, role);
}

export function deleteRole(roleId) {
  return http.delete(roleUrl(roleId));
}
