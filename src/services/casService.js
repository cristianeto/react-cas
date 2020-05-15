import { CONFIG } from "../CasClient/ConfigUrl";
import * as x2js from "xml2js";
import http from "./httpService";
const CONF_URL = CONFIG.Settings;
const ticketKey = "ticketUser";
const loginKey = "loginUser";

function redirect() {
  const redirectURL =
    CONF_URL.CASLOGIN + "service=" + encodeURIComponent(CONF_URL.MY_APLICATION);
  window.open(redirectURL, "_self");
}
export function verificaLogin() {
  if (!isAuthenticated()) {
    redirect();
  }
  return getTicketCAS();
}
export function isAuthenticated() {
  var rawIdToken = getTicket();
  return isNotEmpty(rawIdToken);
}

export function saveTicket() {
  let ticket = window.location.search.replace("?ticket=", "");
  window.history.pushState("", "", "/");
  if (ticket !== null) {
    sessionStorage.setItem(ticketKey, ticket);
  }
}
async function getTicketCAS() {
  var service = encodeURIComponent(CONF_URL.MY_APLICATION);
  var ticket = getTicket();
  if (ticket === "") return;
  var urlvalidate =
    CONF_URL.VALIDATE_TICKET + "service=" + service + "&ticket=" + ticket;
  try {
    const res = await http.get(urlvalidate);
    return validation(res);
  } catch (error) {
    console.log("Mal al validar: ", error);
  }
}

function validation(res) {
  x2js.parseString(res.data, (err, resultado) => {
    console.log(resultado);
    let sucesso = resultado["cas:serviceResponse"]["cas:authenticationSuccess"];
    if (sucesso !== undefined) {
      var sucess =
        resultado["cas:serviceResponse"]["cas:authenticationSuccess"];
      let user = sucess[0]["cas:user"];
      var atributos = sucess[0]["cas:attributes"];
      if (atributos[0]["cas:clientName"] !== undefined) {
        sessionStorage.setItem("clientName", atributos[0]["cas:clientName"]);
        sessionStorage.setItem("cedula", atributos[0]["cas:cedula"]);
      } else {
        sessionStorage.setItem("clientName", "Centralizada");
      }
      sessionStorage.setItem(loginKey, user);
    } else {
      let error = resultado["cas:serviceResponse"]["cas:authenticationFailure"];
      console.log("Error: " + error);
      logout();
    }
    return;
  });
}

function getTicket() {
  return sessionStorage.getItem(ticketKey);
}
function getCedula() {
  return sessionStorage.getItem("cedula");
}
export function getLogin() {
  return sessionStorage.getItem(loginKey);
}
function isNotEmpty(obj) {
  return !isEmpty(obj);
}
function isEmpty(obj) {
  return obj === undefined || obj == null || obj === "" || obj === " ";
}

export function logout() {
  var Autenticacion = sessionStorage.getItem("clientName");
  var logout = "";
  remove();
  if (Autenticacion === "Institucional") {
    logout =
      CONF_URL.LOGOUT_CORREO +
      "post_logout_redirect_uri=" +
      encodeURIComponent(CONF_URL.CASLOGOUT) +
      "service=" +
      encodeURIComponent(CONF_URL.LOGOUT_REDIRECT);
    window.location.href = logout;
  } else {
    logout =
      CONF_URL.CASLOGOUT +
      "service=" +
      encodeURIComponent(CONF_URL.LOGOUT_REDIRECT);
    window.location.href = logout;
  }
}

function remove() {
  window.sessionStorage.removeItem("ticketUser");
  window.sessionStorage.removeItem("loginUser");
  window.sessionStorage.removeItem("cedula");
  window.sessionStorage.removeItem("clientName");
  window.sessionStorage.removeItem("passport");
  window.sessionStorage.removeItem("id");
}
export default {
  redirect,
  getLogin,
  getCedula,
  saveTicket,
  getTicketCAS,
  verificaLogin,
  isAuthenticated,
  logout,
};
