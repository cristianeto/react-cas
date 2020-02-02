import React from "react";
import { TextField } from "@material-ui/core";

const Input = ({ name, label, placeHolder, error, ...rest }) => {
  return (
    <TextField
      {...rest}
      required
      id={name}
      name={name}
      label={label}
      placeholder={placeHolder}
      margin="normal"
      fullWidth
      multiline
      rowsMax="4"
      variant="outlined"
      size="small"
    />
    //   {error && <div className="alert alert-danger">{error}</div>}
  );
};

export default Input;
