import React from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Button } from '@material-ui/core';

const ButtonAdd = props => {
  return (
    <React.Fragment>
      <NavLink to={`/${props.entity}/new`} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Agregar {props.entity}
        </Button>
      </NavLink>
    </React.Fragment>
  );
};

export default ButtonAdd;
