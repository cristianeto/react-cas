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
      format="dd-MM-yyyy"
      size="small"
      margin="normal"
      fullWidth
      name={name}
      // inputValue={value}
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
      minDateMessage={"La fecha no debe estar antes de la fecha menor"}
      maxDateMessage={"La fecha no debe estar después de la fecha mayor"}
      invalidLabel={"Escoja la fecha"}
      //maskChar={"2020/01/01"}
    />
  );
};

export default InputDate;
