///Dominio LocalHost Prueba
export let CONFIG = {
  Settings: {
    CASLOGIN: process.env.REACT_APP_CASLOGIN,
    CASLOGOUT: process.env.REACT_APP_CASLOGOUT,
    MY_APLICATION: process.env.REACT_APP_MY_APLICATION,
    LOGOUT_REDIRECT: process.env.REACT_APP_LOGOUT_REDIRECT,
    LOGOUT_CORREO: process.env.REACT_APP_LOGOUT_CORREO,
    VALIDATE_TICKET: process.env.REACT_APP_VALIDATE_TICKET,
  },
};

/* export let CONFIG = {
  Settings: {
    CASLOGIN: "https://seguridad.espoch.edu.ec/cas/login?",
    CASLOGOUT: "https://seguridad.espoch.edu.ec/cas/logout?",
    MY_APLICATION: "https://cimogsys.espoch.edu.ec/spirit",
    LOGOUT_REDIRECT: "https://cimogsys.espoch.edu.ec/spirit/logout/",
    LOGOUT_CORREO: "https://login.microsoftonline.com/common/oauth2/logout?",
    VALIDATE_TICKET: "/validateCAS?",
  },
}; */
