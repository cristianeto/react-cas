///Dominio LocalHost Prueba
export let CONFIG = {
  Settings: {
    CASLOGIN: "https://seguridad.espoch.edu.ec/cas/login?",
    CASLOGOUT: "https://seguridad.espoch.edu.ec/cas/logout?",
    CASVALIDATE: "https://seguridad.espoch.edu.ec/cas/p3/serviceValidate?",
    //REDIRECT_URI: 'https://pruebacomprobante.espoch.edu.ec:8080/',
    REDIRECT_URI: "http://localhost:3000/",
    LOGOUT_REDIRECT: "https://pruebacomprobante.espoch.edu.ec:8080/logout/",
    LOGOUT_CORREO: "https://login.microsoftonline.com/common/oauth2/logout?",
    VALIDATEPHP:
      //"https://cimogsys.espoch.edu.ec/proyectosinvestigacion/public/api/validateCAS?"
      "http://localhost/proyectosinvestigacion/public/api/validateCAS?"
    // VALIDATEJAVA:
    //"https://pruebas.espoch.edu.ec:8181/ServicioWebComprobantes/ServiciosComprobantes/ValidateCas/"
  }
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

/*export let CONFIG = {
    Settings: {
       CLIENT_ID: 'fdc35fe1-2393-45cf-98b4-d75b2a383bec', // https://apps.dev.microsoft.com’
        TENANT_ID: 'd7f86710-01e1-461d-8599-758de4542e2b', // found in Azure->Active Directory->Properties Pane, TennantID = Directory ID
        AUTHORITY: 'https://login.microsoftonline.com/espoch.edu.ec/',
        RESPONSE_TYPE: 'id_token',
        RESPONSE_MODE: 'id_token',
        STATE: '',
        MS_GRAPH_URI: 'https://graph.microsoft.com/',
        REDIRECT_URI: 'https://comprobanteelectronico.espoch.edu.ec/',
        POST_LOGOUT_REDIRECT: 'https://comprobanteelectronico.espoch.edu.ec/logout',
        MSGRAPH_BETA_API: 'https://graph.microsoft.com/beta/',
        MSGRAPH_v1_API: 'https://graph.microsoft.com/v1.0/',
        SCOPES: ['User.Read'],
        ADMIN_CONSENT: true
    }
};*/
