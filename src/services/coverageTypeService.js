import http from "./httpService";
import { apiUrl } from "../config.json";

export function getCoverageTypes() {
  return http.get(apiUrl + "/coveragetypes");
}
