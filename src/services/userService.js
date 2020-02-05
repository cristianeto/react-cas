import http from "./httpService";
import { apiUrl } from "../config.json";

export function getUsers() {
  return http.get(apiUrl + "/users");
}
