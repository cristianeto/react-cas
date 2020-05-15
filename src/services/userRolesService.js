import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/v1/usersroles";

function userRoleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRolesByUser(userId) {
  return http.get(userRoleUrl(userId));
}
