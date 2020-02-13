import React from "react";
import { NavLink } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

const ButtonAdd = props => {
  return (
    <React.Fragment>
      <Tooltip
        title={"Agregar"}
        style={{ position: "absolute", bottom: "2em", right: "3em" }}
      >
        <NavLink to={`/${props.entity}/new`}>
          <Fab size="medium" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </NavLink>
      </Tooltip>
    </React.Fragment>
  );
};

export default ButtonAdd;
