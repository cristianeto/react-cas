import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/v1/usersroles";

function userRoleUrl(id) {
  return `${apiEndpoint}/1`;
}

export function getRolesByUser(userId) {
  return http.get(userRoleUrl(userId));
}
