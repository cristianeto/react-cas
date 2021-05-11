import http from '../auth/httpService';

const apiEndpoint = '/requirements';

function requirementUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRequirements() {
  return http.get(apiEndpoint);
}
export function getRequirement(requirementId) {
  return http.get(requirementUrl(requirementId));
}

export function saveRequirement(requirement) {
  if (requirement.id) {
    const body = { ...requirement };
    delete body.id;
    return http.put(requirementUrl(requirement.id), body);
  }
  return http.post(apiEndpoint, requirement);
}

export function deleteRequirement(requirementId) {
  return http.delete(requirementUrl(requirementId));
}
