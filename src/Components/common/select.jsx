import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const MySelect = ({ name, label, property, options, error, ...rest }) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);
  return (
    <FormControl
      required
      variant="outlined"
      fullWidth
      size="small"
      margin="normal"
    >
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        error={validation}
        labelId="demo-simple-select-outlined-label"
        id={name}
        name={name}
        labelWidth={75}
        {...rest}
      >
        <MenuItem value="" disabled>
          <em>Seleccione una opción</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem value={option[name]} key={option[name]}>
            {option[property]}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;
