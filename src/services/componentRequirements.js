import http from "./httpService";

const apiEndpoint1 = "/components";
const apiEndpoint2 = "/requirements";

function componentRequirementsUrl(componentId) {
  return `${apiEndpoint1}/${componentId}${apiEndpoint2}`;
}

function componentRequirementUrl(componentId, requirementId) {
  return `${apiEndpoint1}/${componentId}${apiEndpoint2}/${requirementId}`;
}

export function getComponentRequirements(componentId) {
  return http.get(componentRequirementsUrl(componentId));
}
export function saveRequirement(requirement) {
  if (requirement.id) {
    const body = { ...requirement }
    delete body.id;
    return http.put(componentRequirementUrl(requirement.id), body);
  }
  return http.post(apiEndpoint1 + apiEndpoint2, requirement);
}