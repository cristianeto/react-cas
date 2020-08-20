import React from "react";
import Error from "../common/error";

const NotFound = () => {
  return (
    <Error title={'Página no encontrada'} description={'Lo sentimos, esta página no existe o ha sido dada de baja.'} />
  );
};

export default NotFound;
