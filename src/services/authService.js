import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "passport";

http.setPassport(getPassport());

export async function login(email) {
  try {
    const { data } = await http.post(apiEndpoint, { email });
    console.log(data);
    sessionStorage.setItem(tokenKey, data.access_token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    http.setPassport(getPassport());
    return data.user;
  } catch (ex) {
    sessionStorage.setItem(tokenKey, null);
    console.error(ex);
    return ex;
  }
}

export function getCurrentUser() {
  try {
    const user = sessionStorage.getItem("user");
    return JSON.parse(user);
  } catch (ex) {
    return null;
  }
}

export function getPassport() {
  return sessionStorage.getItem(tokenKey);
}

export function isAuthenticated() {
  const rawIdToken = getPassport();
  return isNotEmpty(rawIdToken);
}
function isNotEmpty(obj) {
  return !isEmpty(obj);
}
function isEmpty(obj) {
  return obj === undefined || obj == null || obj === "" || obj === " ";
}
export default {
  login,
  getPassport,
  getCurrentUser,
  isAuthenticated,
};
