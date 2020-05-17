import React from "react";
import { LinearProgress, Typography } from "@material-ui/core";

const TitleForm = ({ entity, isLoading }) => {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        {entity}
      </Typography>
      {isLoading && <LinearProgress color="secondary" />}
    </React.Fragment>
  );
};

export default TitleForm;
