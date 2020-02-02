import http from "./httpService";
import { apiUrl } from "../config.json";

export function getGroupTypes() {
  return http.get(apiUrl + "/grouptypes");
}
