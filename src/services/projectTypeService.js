import http from "./httpService";
import { apiUrl } from "../config.json";

export function getResearchTypes() {
  return http.get(apiUrl + "/researchtypes");
}
