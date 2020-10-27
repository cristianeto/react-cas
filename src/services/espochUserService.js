import http from "./httpService";

const apiEndPoint = "/auth";

function espochUserUrl(identificationCard) {
  return `${apiEndPoint}/${identificationCard}`;
}

export function getEspochUser(identificationCard) {
  return http.get(espochUserUrl(identificationCard));
}