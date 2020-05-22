import http from "./httpService";

export function getCoverageTypes() {
  return http.get("/coveragetypes");
}
