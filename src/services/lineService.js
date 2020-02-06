import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/lines";

export function getLines() {
  return http.get(apiEndPoint);
}
