///Dominio LocalHost Prueba
export let CONFIG = {
  Settings: {
    CASLOGIN: "https://seguridad.espoch.edu.ec/cas/login?",
    CASLOGOUT: "https://seguridad.espoch.edu.ec/cas/logout?",
    MY_APLICATION: "http://localhost:3000/",
    LOGOUT_REDIRECT: "http://localhost:3000/logout/",
    LOGOUT_CORREO: "https://login.microsoftonline.com/common/oauth2/logout?",
    VALIDATE_TICKET: "/validateCAS?",
  },
};

///Dominio Pruebas
/*export let CONFIG = {
    Settings: {
        CASLOGIN: 'https://seguridad.espoch.edu.ec/cas/login?',
        CASLOGOUT: 'https://seguridad.espoch.edu.ec/cas/logout?',
        CASVALIDATE: 'https://seguridad.espoch.edu.ec/cas/p3/serviceValidate?',
        REDIRECT_URI: 'https://pruebasw.espoch.edu.ec:9191/',
        LOGOUT_REDIRECT: 'https://pruebasw.espoch.edu.ec:9191/logout/',
        LOGOUT_CORREO: 'https://login.microsoftonline.com/common/oauth2/logout?',
        VALIDATEJAVA:'https://pruebas.espoch.edu.ec:8181/ServicioWebComprobantes/ServiciosComprobantes/ValidateCas/'
        }
};
*/

//Servidor Produccion
/*export let CONFIG = {
    Settings: {
        CASLOGIN: 'https://seguridad.espoch.edu.ec/cas/login?',
        CASLOGOUT: 'https://seguridad.espoch.edu.ec/cas/logout?',
        CASVALIDATE: 'https://seguridad.espoch.edu.ec/cas/p3/serviceValidate?',
        REDIRECT_URI: 'https://comprobanteelectronico.espoch.edu.ec/',
        LOGOUT_REDIRECT: 'https://comprobanteelectronico.espoch.edu.ec/logout',
        LOGOUT_CORREO: 'https://login.microsoftonline.com/common/oauth2/logout?',
        VALIDATEJAVA:'https://servicioscomprobante.espoch.edu.ec:8181/ServicioWebComprobantes/ServiciosComprobantes/ValidateCas/'
        }
};*/
