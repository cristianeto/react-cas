import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { ListItemAvatar, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Button } from '@material-ui/core';

const Panel = ({ title, projectId, data }) => {
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
          {data.map(dat => (

            <ListItem key={dat.id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dat.fullname} secondary={dat.pivot.created_at} />
            </ListItem>
          ))}
        </List>
        <NavLink to={`/proyecto/${projectId}/miembros`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Agregar
        </Button>
        </NavLink>
      </div>

    </React.Fragment>
  );
};

export default Panel;
