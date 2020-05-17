import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/programs";

export function getPrograms() {
  return http.get(apiEndPoint);
}
