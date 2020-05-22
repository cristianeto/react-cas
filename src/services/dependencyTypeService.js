import http from "./httpService";

export function getDependencyTypes() {
  return http.get("/dependencytypes");
}
