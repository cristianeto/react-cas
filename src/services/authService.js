import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "passport";
const userKey = "user";

http.setPassport(getPassport());

export async function login(email) {
  try {
    const { data } = await http.post(apiEndpoint, { email });
    sessionStorage.setItem(tokenKey, data.access_token);
    sessionStorage.setItem(userKey, JSON.stringify(data.user));
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
    return JSON.parse(sessionStorage.getItem(userKey));
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
async function logout() {
  http.setPassport(getPassport());
  remove();
  await http.get(apiEndpoint + "/logout");
}
function remove() {
  window.sessionStorage.removeItem(tokenKey);
  window.sessionStorage.removeItem(userKey);
}
export default {
  login,
  getPassport,
  getCurrentUser,
  isAuthenticated,
  logout,
};
