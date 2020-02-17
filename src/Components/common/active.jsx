import React from "react";
import { Chip } from "@material-ui/core";

const Active = props => {
  let label = "";
  let color = "";
  if (props.actived === 1) {
    label = "Activo";
    color = "primary";
  } else if (props.actived === 0) {
    label = "Inactivo";
    color = "secondary";
  } else {
    label = "Desconocido";
    color = "disabled";
  }

  return (
    <Chip
      label={label}
      color={color}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    ></Chip>
  );
};

export default Active;
