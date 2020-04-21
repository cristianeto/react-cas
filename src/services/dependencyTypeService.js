import http from "./httpService";
import { apiUrl } from "../config.json";

export function getDependencyTypes() {
  return http.get(apiUrl + "/dependencytypes");
}
