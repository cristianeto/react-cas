import http from "./httpService";

const apiEndPoint = "/espochService";

function espochUserUrl(identificationCard) {
  return `${apiEndPoint}/${identificationCard}`;
}

export function getEspochUser(identificationCard) {
  return http.get(espochUserUrl(identificationCard));
}