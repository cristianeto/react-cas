import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth/v1/programs";

export function getPrograms() {
  return http.get(apiEndPoint);
}
