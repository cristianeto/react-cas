import React from "react";
import { TextField } from "@material-ui/core";

const Input = ({ name, label, placeHolder, error, ...rest }) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);
  return (
    <React.Fragment>
      <TextField
        error={validation}
        {...rest}
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
        helperText={error}
      />
    </React.Fragment>
  );
};

export default Input;
