import http from "./httpService";
import { apiUrl } from "../config.json";

export function getProjectTypes() {
  return http.get(apiUrl + "/projecttypes");
}
