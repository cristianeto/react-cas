import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const MyMultiSelect = ({
  name,
  label,
  property,
  options,
  optionsSelected,
  error,
  ...rest
}) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);

  return (
    <FormControl required fullWidth size="small" margin="normal">
      <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
      <Select
        error={validation}
        labelId="demo-mutiple-name-label"
        id={name}
        multiple
        name={name}
        value={optionsSelected}
        input={<Input />}
        {...rest}
      >
        {options.map(option => (
          <MenuItem key={option[name]} value={option[name]}>
            {option[property]}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default MyMultiSelect;
