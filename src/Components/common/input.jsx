import React from "react";
import { TextField } from "@material-ui/core";

const Input = ({ name, label, placeHolder, error, ...rest }) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);
  return (
    <TextField
      error={validation}
      {...rest}
      id={name}
      name={name}
      label={label}
      placeholder={placeHolder}
      margin="normal"
      fullWidth
      variant="outlined"
      size="small"
      helperText={error}
    />
  );
};

export default Input;
