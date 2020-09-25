import React from "react";
import { Typography } from "@material-ui/core";

const TitleComponent = ({ entity }) => {
  return (
    <Typography variant="h5" gutterBottom>
      {entity}
    </Typography>
  );
};

export default TitleComponent;
