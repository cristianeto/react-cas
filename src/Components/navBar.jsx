import React from "react";
import { Link, NavLink } from "react-router-dom";
import MenuRoles from "./menuRoles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
        <Link to="/proyectos" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"Proyectos"} />
          </ListItem>
        </Link>
      </List>
      <List>
        <NavLink to="/dependencias" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={"Dependencias"} />
          </ListItem>
        </NavLink>
      </List>
      <List>
        <NavLink to="/grupos-investigacion" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <GroupWorkIcon />
            </ListItemIcon>
            <ListItemText primary={"Grupos investigación"} />
          </ListItem>
        </NavLink>
      </List>
      <List>
        <NavLink to="/grupos-investigacion" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Componentes"} />
          </ListItem>
        </NavLink>
      </List>
      <List>
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
      <List>
        <NavLink to="/usuarios" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Usuarios"} />
          </ListItem>
        </NavLink>
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
          {!props.user && (
            <Button color="inherit" onClick={props.onLogin}>
              Login
            </Button>
          )}
          {props.user && (
            <MenuRoles
              user={props.user}
              roles={props.roles}
              onChangeRole={props.onChangeRole}
              onLogout={props.onLogout}
            />
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
