import http from "./httpService";

export function getResearchTypes() {
  return http.get("/researchtypes");
}
