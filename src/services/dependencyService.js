import http from "./httpService";
import { apiUrl } from "../config.json";

export function getDependencies() {
  return http.get(apiUrl + "/dependencies");
}
