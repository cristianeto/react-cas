import http from "./httpService";

const apiEndpoint1 = "/projects";
const apiEndpoint2 = "/members";

function membersUrl(projectSlug) {
  return `${apiEndpoint1}/${projectSlug}${apiEndpoint2}`;
}

function memberUrl(projectId, memberId) {
  return `${apiEndpoint1}/${projectId}${apiEndpoint2}/${memberId}`;
}

export function getMembers(projectSlug) {
  return http.get(membersUrl(projectSlug));
}

export function saveMember(member) {
  if (member.project_id && member.user_id) {
    const body = { "role_id": member.role_id }
    delete body.project_id;
    delete body.user_id;
    return http.put(memberUrl(member.project.slug, member.user_id), body);
  }
  const body = { ...member };
  body['project_slug'] = member.project_slug;
  delete body.projectId;
  return http.post(apiEndpoint1 + apiEndpoint2, body);
}

export function deleteMember(projectSlug, memberId) {
  return http.delete(memberUrl(projectSlug, memberId));
}