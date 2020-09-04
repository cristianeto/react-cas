import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { ListItemAvatar, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Button } from '@material-ui/core';

const PanelMember = ({ title, projectSlug, data }) => {
  const classes = {
    root: {
      flexGrow: 1,
      maxWidth: 752
    },
    demo: {
      backgroundColor: "#"
    },
    title: {
      margin: "4em 0 2em"
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div style={classes.demo}>
        <List dense={true}>
          {(data.length <= 0) ?
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'No existen registros'} />
            </ListItem>
            : data.map(dat => (
              <ListItem key={dat.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={dat.fullname} />
              </ListItem>
            ))
          }
        </List>
        <NavLink to={`/proyecto/${projectSlug}/miembros`} style={{ textDecoration: "none" }}>
          <Button
            className="btn btn-guardar"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Ver más
        </Button>
        </NavLink>
      </div>

    </React.Fragment>
  );
};

export default PanelMember;
