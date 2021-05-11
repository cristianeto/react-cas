import http from '../auth/httpService';

const apiEndpoint1 = '/users';
const apiEndpoint2 = '/permissions';

function userPermissionUrl(id) {
  return `${apiEndpoint1}/${id}${apiEndpoint2}`;
}

export function getPermissionsByUser(userId) {
  return http.get(userPermissionUrl(userId));
}

export function savePermissionsByUser(userId, permissions) {
  if (userId) {
    const body = { permissions: permissions };
    return http.put(userPermissionUrl(userId), body);
  }
  /* const body = { ...member };
  body['project_slug'] = member.project_slug;
  delete body.projectId;
  return http.post(apiEndpoint1 + apiEndpoint2, body); */
}
