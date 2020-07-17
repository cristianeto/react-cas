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
      // fullWidth
      style={{ width: "30%", marginRight: "2em" }}
      name={name}
      inputValue={value}
      InputAdornmentProps={{ position: "end" }}
      onChange={(date) => onChange(date, name)}
      value={value ? new Date(value) : null}
      minDate={minDate}
      maxDate={maxDate}
      disabled={disabled}
      clearable
      placeholder="2018-12-31"
      emptyLabel={""}
      invalidDateMessage={"Fecha con formato inválido"}
      minDateMessage={`No debe estar antes de ${minDate}`}
      maxDateMessage={`No debe estar después  ${maxDate}`}
      invalidLabel={"Escoja la fecha"}
      maskChar={"-"}
    />
  );
};

export default InputDate;
