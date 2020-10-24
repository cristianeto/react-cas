import React from "react";
import { Typography, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { ListItemAvatar, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

const GroupMembers = ({ title, groupId, data: members }) => {
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
    <Paper className={"paper"}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div style={classes.demo}>
        <List dense={true}>
          {(members.length <= 0) ?
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'No existen registros'} />
            </ListItem>
            : members.map(member => (
              <ListItem key={member.user.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.user.fullname} secondary={
                  <Tooltip title={member.created_at} placement="top">
                    <span>{member.human_created_at}</span>
                  </Tooltip>
                } />
              </ListItem>
            ))
          }
        </List>
        <NavLink to={`/grupo/${groupId}/miembros`} style={{ textDecoration: "none" }}>
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

    </Paper>
  );
};

export default GroupMembers;
