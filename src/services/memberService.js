import http from "./httpService";

const apiEndpoint1 = "/projects";
const apiEndpoint2 = "/members";

function membersUrl(project_id) {
  return `${apiEndpoint1}/${project_id}${apiEndpoint2}`;
}

function memberUrl(project_id, user_id) {
  return `${apiEndpoint1}/${project_id}${apiEndpoint2}/${user_id}`;
}

export function getMembers(projectId) {
  return http.get(membersUrl(projectId));
}

export function saveMember(member) {
  if (member.project_id && member.user_id) {
    const body = { "role_id": member.role_id }
    delete body.project_id;
    delete body.user_id;
    console.log("Body Update: ", body);
    return http.put(memberUrl(member.project_id, member.user_id), body);
  }
  return http.post(apiEndpoint1 + apiEndpoint2, member);
}