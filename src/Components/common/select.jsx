import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const MySelect = ({ name, label, options, error, ...rest }) => {
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
        labelId="demo-simple-select-outlined-label"
        id={name}
        name={name}
        labelWidth={75}
        {...rest}
      >
        <MenuItem value="">
          <em>Seleccione</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem value={option.id_dependency} key={option.id_dependency}>
            {option.name_dependency}
          </MenuItem>
        ))}
      </Select>
      {/* {error && <div className="alert alert-danger">{error}</div>} */}
    </FormControl>
  );
};

export default MySelect;
