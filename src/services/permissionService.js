import http from "./httpService";

const apiEndPoint = "/permissions";

function permissionUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getPermissions() {
  return http.get(apiEndPoint);
}

export function getPermission(permissionId) {
  return http.get(permissionUrl(permissionId));
}

export function savePermission(role) {
  if (role.id) {
    const body = { ...role };
    delete body.id;
    delete body.name;
    return http.put(permissionUrl(role.id), body);
  }
}