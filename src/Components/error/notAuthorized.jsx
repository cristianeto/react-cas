import React from "react";
import Error from "../common/error";

const NotAuthorized = (props) => {
  return (
    <Error title={'Página no autorizada'} description={'Lo sentimos, no tienes los permisos necesarios para acceder a esta página.'} />
  );
};

export default NotAuthorized;
