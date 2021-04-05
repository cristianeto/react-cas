import http from "./httpService";

const apiEndpoint1 = "/groups";
const apiEndpoint2 = "/users";

function membersUrl(groupId) {
  return `${apiEndpoint1}/${groupId}${apiEndpoint2}`;
}

function memberUrl(groupId, userId) {
  return `${apiEndpoint1}/${groupId}${apiEndpoint2}/${userId}`;
}

export function getMembers(groupId) {
  return http.get(membersUrl(groupId));
}

export function saveMember(member) {
  if (member.group_id && member.user_id) {
    //const body = { "staff_id": member.staff_id }
    const body = {}
    delete body.group_id;
    delete body.user_id;
    return http.put(memberUrl(member.group_id, member.user_id), body);
  }
  const body = { ...member };
  //body['group_id'] = member.group_id;
  //body = {};
  delete body.projectId;
  return http.post(apiEndpoint1 + apiEndpoint2, body);
}

export function deleteMember(groupId, userId) {
  return http.delete(memberUrl(groupId, userId));
}