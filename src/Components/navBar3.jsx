import React from "react";
import { Link, NavLink } from "react-router-dom";
import MenuRoles from "./menuRoles";
import ImageProfile from "./common/imageProfile";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import FolderIcon from "@material-ui/icons/Folder";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import avatar from "../static/img/img_avatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  navLink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { selectedRole, user, onLogin, onLogout, roles, onChangeRole } = props;
  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem style={{ display: "flex", justifyContent: "center" }}>
          <ImageProfile alt={"avatar"} location={avatar} size={"large"} />
        </ListItem>
        <NavLink to="/proyectos" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"Proyectos"} />
          </ListItem>
        </NavLink>
        <NavLink to="/dependencias" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={"Dependencias"} />
          </ListItem>
        </NavLink>
        <NavLink to="/grupos-investigacion" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <GroupWorkIcon />
            </ListItemIcon>
            <ListItemText primary={"Grupos investigación"} />
          </ListItem>
        </NavLink>
        <NavLink to="/grupos-investigacion" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Componentes"} />
          </ListItem>
        </NavLink>
        <NavLink to="/grupos-investigacion" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Requerimientos"} />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      {selectedRole.id_role === 1 && (
        <List>
          <NavLink to="/usuarios" className={classes.navLink}>
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItem>
          </NavLink>
          <NavLink to="/configuracion" className={classes.navLink}>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Configuración"} />
            </ListItem>
          </NavLink>
        </List>
      )}
      <List
        style={{
          alignSelf: "flex-end",
        }}
      >
        <ListItem>
          <Typography variant="caption" display="block" gutterBottom>
            SPIrit V1.0 - CIMOGSYS
          </Typography>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.navLink}>
              Spirit
            </Link>
          </Typography>
          {!user && (
            <Button color="inherit" onClick={onLogin}>
              Login
            </Button>
          )}
          {user && (
            <MenuRoles
              user={user}
              roles={roles}
              selectedRole={selectedRole}
              onChangeRole={onChangeRole}
              onLogout={onLogout}
            />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        style={{
          display: "flex",
        }}
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        {sideList("left")}
      </Drawer>
    </div>
  );
}
