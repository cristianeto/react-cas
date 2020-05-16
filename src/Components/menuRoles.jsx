import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function MenuRoles(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        color="inherit"
        style={{ textTransform: "lowercase" }}
        onClick={handleClick}
      >
        {props.user.email}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/usuario/1`} className={classes.navLink}>
            MI PERFIL
          </Link>
        </MenuItem>
        <Divider />
        {props.roles &&
          props.roles.map((role) => (
            <MenuItem
              key={role.id_role}
              onClick={() => {
                props.onChangeRole(role.id_role);
              }}
            >
              {role.name_role}
            </MenuItem>
          ))}
        <Divider />
        <MenuItem onClick={props.onLogout}>CERRAR SESIÓN</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
