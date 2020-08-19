import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Panel = ({ id, property, title, data }) => {
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
          {data.length > 0 ? data.map(dat => (
            <ListItem key={dat[id]}>
              <ListItemText primary={dat[property]} />
            </ListItem>
          )) :
            <ListItem >
              <ListItemText primary={'No existen registros'} />
            </ListItem>
          }
        </List>


      </div>
    </React.Fragment>
  );
};

export default Panel;
