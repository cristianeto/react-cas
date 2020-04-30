import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

const InputDate = ({
  name,
  label,
  placeHolder,
  error,
  value,
  onChange,
  minDate,
  maxDate,
  disabled,
  ...rest
}) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);
  return (
    <KeyboardDatePicker
      error={validation}
      {...rest}
      autoOk
      variant="dialog"
      inputVariant="outlined"
      label={label}
      format="yyyy-MM-dd"
      size="small"
      margin="normal"
      fullWidth
      name={name}
      inputValue={value}
      InputAdornmentProps={{ position: "end" }}
      onChange={(date) => onChange(date, name)}
      value={value ? value : null}
      minDate={minDate || undefined}
      maxDate={maxDate}
      disabled={disabled}
      maskChar={"01/01/2020"}
    />
  );
};

export default InputDate;
