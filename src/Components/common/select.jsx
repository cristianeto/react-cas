import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const MySelect = ({ name, label, property1, property2, options, error, ...rest }) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);
  return (
    <FormControl
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
        {...rest}
      >
        <MenuItem value="" disabled>
          <em>Seleccione una opción</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option[property1]} key={option[property1]}>
            {option[property2]}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;
