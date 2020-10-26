import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FolderIcon from '@material-ui/icons/Folder';
import { NavLink } from 'react-router-dom';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PanToolIcon from '@material-ui/icons/PanTool';
import SettingsIcon from '@material-ui/icons/Settings';
import ImageProfile from "./common/imageProfile";

import avatar from "../static/img/img_avatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  navLink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function MenuList({ selectedRole }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/mi/perfil" className={classes.navLink}>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <ImageProfile alt={"avatar"} location={avatar} size={"small"} />
          </ListItem>
        </NavLink>
        <NavLink to="/proyectos" className={classes.navLink}>
          <ListItem button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"Proyectos"} />
          </ListItem>
        </NavLink>
        <NavLink to="/grupos-investigacion" className={classes.navLink}>
          <ListItem button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary={"Grupos invest..."} />
          </ListItem>
        </NavLink>

      </List>
      <Divider />
      {selectedRole.id === 1 && (
        <List component="nav" aria-label="secondary mailbox folder">
          <NavLink to="/dependencias" className={classes.navLink}>
            <ListItem button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={"Dependencias"} />
            </ListItem>
          </NavLink>
          <NavLink to="/usuarios" className={classes.navLink}>
            <ListItem button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItem>
          </NavLink>
          <NavLink to="/roles" className={classes.navLink}>
            <ListItem button
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <FingerprintIcon />
              </ListItemIcon>
              <ListItemText primary={"Roles"} />
            </ListItem>
          </NavLink>
          <NavLink to="/permisos" className={classes.navLink}>
            <ListItem button
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <PanToolIcon />
              </ListItemIcon>
              <ListItemText primary={"Permisos"} />
            </ListItem>
          </NavLink>
          <NavLink to="/configuracion" className={classes.navLink}>
            <ListItem button
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Configuración"} />
            </ListItem>
          </NavLink>
        </List>
      )}
    </div>
  );
}
