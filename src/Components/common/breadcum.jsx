import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Breadcum = props => {
  const breadcrumbLink = {
    color: "primary",
    textDecoration: "none"
  };
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "1em 0 1em"
      }}
    >
      {props.onListBreadcrumbs.map(breadItem => (
        <Link
          color="inherit"
          to={breadItem.path}
          style={breadcrumbLink}
          key={breadItem.path}
        >
          {breadItem.label}
        </Link>
      ))}
      <Typography color="textPrimary">{props.lastLabel}</Typography>
    </Breadcrumbs>
  );
};

export default Breadcum;
