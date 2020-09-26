import React from "react";
import { Typography, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const PanelStatuses = ({ title, projectSlug, data: statuses }) => {
  return (
    <Paper className="paper">
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List dense={true}>
        {statuses.map(projectStatus =>
          <ListItem key={projectStatus.id}>
            <ListItemText
              primary={`${projectStatus.status.name} por ${projectStatus.user.fullname}`}
              secondary={
                <Tooltip title={projectStatus.created_at} placement="top">
                  <span>{projectStatus.human_created_at}</span>
                </Tooltip>
              }
            />
          </ListItem>
        )}
      </List>
      <NavLink to={`/proyecto/${projectSlug}/estados`} style={{ textDecoration: "none" }}>
        <Button
          className="btn btn-guardar"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Ver más
                  </Button>
      </NavLink>
    </Paper>
  );
};

export default PanelStatuses;
