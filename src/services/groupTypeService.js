import http from "./httpService";

export function getGroupTypes() {
  return http.get("/grouptypes");
}
