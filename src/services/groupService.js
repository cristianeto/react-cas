import http from '../auth/httpService';

const apiEndpoint = '/groups';

function groupUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getGroups() {
  return http.get(apiEndpoint);
}
export function getGroup(groupId) {
  return http.get(groupUrl(groupId));
}

export function saveGroup(group) {
  if (group.id) {
    const body = { ...group };
    delete body.id;
    return http.put(groupUrl(group.id), body);
  }
  return http.post(apiEndpoint, group);
}

export function deleteGroup(groupId) {
  return http.delete(groupUrl(groupId));
}
