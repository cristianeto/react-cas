import http from '../auth/httpService';

const apiEndpoint1 = '/groups';
const apiEndpoint2 = '/users';

function groupMembersUrl(groupId) {
  return `${apiEndpoint1}/${groupId}${apiEndpoint2}`;
}

function groupMemberUrl(groupId, userId) {
  return `${apiEndpoint1}/${groupId}${apiEndpoint2}/${userId}`;
}

export function getGroupMembers(groupId) {
  return http.get(groupMembersUrl(groupId));
}

export function saveGroupMember(member) {
  if (member.group_id && member.user_id) {
    //const body = { "staff_id": member.staff_id }
    console.log('ambos ids vienen');
    const body = { staff_id: member.staff_id };
    delete body.group_id;
    delete body.user_id;
    return http.post(groupMemberUrl(member.group_id, member.user_id), body);
  }
}
export function updateGroupMember(member) {
  if (member.group_id && member.user_id) {
    const body = { staff_id: member.staff_id };
    return http.put(groupMemberUrl(member.group_id, member.user_id), body);
  }
}

export function deleteGroupMember(groupId, userId) {
  return http.delete(groupMemberUrl(groupId, userId));
}
