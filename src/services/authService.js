import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "passport";

http.setPassport(getPassport());

export async function login(email) {
  try {
    const { data } = await http.post(apiEndpoint, { email });
    sessionStorage.setItem(tokenKey, data.access_token);
    sessionStorage.setItem("id", data.user.id);
    http.setPassport(getPassport());
    console.log(data.user);
    return data.user;
  } catch (ex) {
    sessionStorage.setItem(tokenKey, null);
  }
}

export function getCurrentUser() {
  try {
    const user = sessionStorage.getItem("loginUser");
    return user;
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
