import http from '../auth/httpService';

const apiEndPoint = '/roles';

function roleUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getRoles() {
  return http.get(apiEndPoint);
}
export function getRole(roleId) {
  return http.get(roleUrl(roleId));
}

export function saveRole(role) {
  if (role.id) {
    const body = { ...role };
    delete body.id;
    delete body.name;
    console.log(role);
    return http.put(roleUrl(role.id), body);
  }
  //return http.post(apiEndPoint, role);
}

export function deleteRole(roleId) {
  return http.delete(roleUrl(roleId));
}
