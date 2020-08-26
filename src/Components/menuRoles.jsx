import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function MenuRoles(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, roles, selectedRole, onChangeRole, onLogout } = props;

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
        //style={{ textTransform: "lowercase" }}
        onClick={handleClick}
      >
        <Typography variant="caption" display="block" gutterBottom>
          {`${user.fullname}`} {`(${selectedRole.display_name})`}
        </Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={`/mi/perfil`} className={classes.navLink}>
          <MenuItem onClick={handleClose}>MI PERFIL</MenuItem>
          <Divider />
        </Link>
        {roles &&
          roles.map((role) => (
            <Link to={"/"} key={role.id} className={classes.navLink}>
              <MenuItem
                onClick={() => {
                  onChangeRole(role.id, handleClose);
                }}
              >
                {role.display_name}
              </MenuItem>
            </Link>
          ))}
        <Divider />
        <MenuItem onClick={onLogout}>CERRAR SESIÓN</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
