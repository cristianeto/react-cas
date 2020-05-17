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
  const { user, roles, onChangeRole, onLogout } = props;

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
        {user.email}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/mi/perfil`} className={classes.navLink}>
            MI PERFIL
          </Link>
        </MenuItem>
        <Divider />
        {roles &&
          roles.map((role) => (
            <MenuItem
              key={role.id_role}
              onClick={() => {
                onChangeRole(role.id_role);
              }}
            >
              {role.name_role}
            </MenuItem>
          ))}
        <Divider />
        <MenuItem onClick={onLogout}>CERRAR SESIÓN</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
