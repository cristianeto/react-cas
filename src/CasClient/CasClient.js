/* import { CONFIG } from "./ConfigUrl";
import * as x2js from "xml2js";
import axios from "axios";
const CONFIG2 = CONFIG.Settings;
export function redirect() {
  const redirect =
    CONFIG2.CASLOGIN + "service=" + encodeURIComponent(CONFIG2.REDIRECT_URI);
  window.open(redirect, "_self");
}

function Logout() {
  var Autenticacion = sessionStorage.getItem("clientName");
  var logout = "";
  remove();
  if (Autenticacion === "Institucional") {
    logout =
      CONFIG2.LOGOUT_CORREO +
      "post_logout_redirect_uri=" +
      encodeURIComponent(CONFIG2.CASLOGOUT) +
      "service=" +
      encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
    window.location.href = logout;
  } else {
    logout =
      CONFIG2.CASLOGOUT +
      "service=" +
      encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
    window.location.href = logout;
  }
}

export function verificaLogin() {
  if (!isAuthenticated()) {
    redirect();
  }
  return validateLogin();
}

async function validateLogin() {
  var service = encodeURIComponent(CONFIG2.REDIRECT_URI);
  var ticket = sessionStorage.getItem("ticketUser");
  if (sessionStorage.getItem("ticketUser") === "") return;
  var urlvalidate =
    CONFIG2.VALIDATE_TICKET + "service=" + service + "&ticket=" + ticket;
  console.log("url: ", urlvalidate);
  console.log("sesion TikectUSer: ", sessionStorage.getItem("ticketUser"));

  let promise = new Promise(async (resolve, reject) => {
    axios
      .get(urlvalidate)
      .then((res) => {
        console.log("Holaaaaaa", res);
        validation(resolve, reject, res);
      })
      .catch((error) => {
        console.log("Error: " + error.message);
        //Logout();
      })
      .finally(() => {
        console.log("La promesa fue ejecutada completamente!");
      });
  });
  return promise;
}

function validation(resolve, reject, res) {
  console.log("validation...");
  x2js.parseString(res.data, function (err, resultado) {
    console.log("parseString...");
    let sucesso = resultado["cas:serviceResponse"]["cas:authenticationSuccess"];
    if (sucesso !== undefined) {
      console.log("success...");

      var sucess =
        resultado["cas:serviceResponse"]["cas:authenticationSuccess"];
      let user = sucess[0]["cas:user"];
      var atributos = sucess[0]["cas:attributes"];
      if (atributos[0]["cas:clientName"] !== undefined) {
        sessionStorage.setItem("clientName", atributos[0]["cas:clientName"]);
      } else {
        sessionStorage.setItem("clientName", "Centralizada");
      }
      sessionStorage.setItem("loginUser", user);
    } else {
      let error = resultado["cas:serviceResponse"]["cas:authenticationFailure"];
      console.log("Error: " + error);
      Logout();
    }
    window.location.href = CONFIG2.REDIRECT_URI;
    resolve();
  });
}

function urlWithoutTicket(url) {
  return url.replace(/(^|[&?])ticket(=[^&]*)?/, "");
}

function uniqueUrl(url) {
  var unique_url = url;
  unique_url += url.indexOf("?") === -1 ? "?" : "&";
  unique_url += "_=" + new Date().getTime();
  return unique_url;
}

function isAuthenticated() {
  var rawIdToken = sessionStorage.getItem("ticketUser");
  console.log("rawIdToken: ", rawIdToken);
  return isNotEmpty(rawIdToken);
}

function remove() {
  window.sessionStorage.removeItem("ticketUser");
  window.sessionStorage.removeItem("loginUser");
  window.sessionStorage.removeItem("clientName");
}

function isNotEmpty(obj) {
  return !isEmpty(obj);
}
function isEmpty(obj) {
  return obj === undefined || obj == null || obj === "" || obj === " ";
}

export function saveTicket() {
  let ticket = window.location.search.replace("?ticket=", "");
  if (ticket !== null) {
    sessionStorage.setItem("ticketUser", ticket);
  }
}
export function getLogin() {
  return sessionStorage.getItem("loginUser");
}
export function getTicket() {
  return sessionStorage.getItem("ticketUser");
}
function ReadTicket(url) {
  var intIndex = url.includes("ticket");
  if (intIndex) {
    this.cadena = url.split("=");
    var rawClientInfo = this.cadena[1];
    sessionStorage.setItem("ticketUser", this.cadena[1]);
    return rawClientInfo;
  } else {
    return rawClientInfo;
  }
}
function SalirSistema() {
  sessionStorage.removeItem("idRol");
  sessionStorage.removeItem("perfil");
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("totalfactura");
  sessionStorage.removeItem("totalfacturaAnu");
  sessionStorage.removeItem("totalNota");
  sessionStorage.removeItem("correo");
}

export default {
  redirect,
  getLogin,
  saveTicket,
  validateLogin,
  verificaLogin,
};
 */
