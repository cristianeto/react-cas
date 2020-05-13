import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "passport";

// http.setJwt(getJwt());

export async function login(email) {
  const data = await http.post(apiEndpoint, { email });
  console.log(data);
  sessionStorage.setItem(tokenKey, data.data.access_token);
}
export function getPassport() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  getPassport,
};
