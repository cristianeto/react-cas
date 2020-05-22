import http from "./httpService";

export function getProjectTypes() {
  return http.get("/projecttypes");
}
