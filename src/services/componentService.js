import http from "./httpService";

const apiEndpoint = "/components";

function componentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getComponents() {
  return http.get(apiEndpoint);
}
export function getComponent(componentId) {
  return http.get(componentUrl(componentId));
}

export function saveComponent(component) {
  if (component.id) {
    const body = { ...component };
    delete body.id;
    return http.put(componentUrl(component.id), body);
  }
  return http.post(apiEndpoint, component);
}

export function deleteComponent(componentId) {
  return http.delete(componentUrl(componentId));
}
