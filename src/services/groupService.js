import http from "./httpService";

const apiEndpoint = "/groups";

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
  if (group.id_group) {
    const body = { ...group };
    delete body.id_group;
    return http.put(groupUrl(group.id_group), body);
  }
  console.log("Post:", group);
  return http.post(apiEndpoint, group);
}

export function deleteGroup(groupId) {
  return http.delete(groupUrl(groupId));
}
