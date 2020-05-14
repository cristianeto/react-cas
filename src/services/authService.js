import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "passport";

http.setPassport(getPassport());

export async function login(cedula) {
  try {
    console.log(cedula);
    const { data } = await http.post(apiEndpoint, { cedula });
    sessionStorage.setItem(tokenKey, data.access_token);
  } catch (ex) {
    console.log(ex);
    sessionStorage.setItem(tokenKey, null);
  }
}

export function getCurrentUser() {
  try {
    const user = sessionStorage.getItem("cedula");
    return user;
  } catch (ex) {
    return null;
  }
}

export function getPassport() {
  return sessionStorage.getItem(tokenKey);
}

export function isAuthenticated() {
  var rawIdToken = getPassport();
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
