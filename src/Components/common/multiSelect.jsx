import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MyMultiSelect = ({
  name,
  label,
  property,
  optionsSelected,
  options,
  onChange,
  error,
  ...rest
}) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);

  return (
    <Autocomplete
      multiple
      id={name}
      name={name}
      limitTags={2}
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option[property]}
      onChange={(event, values) => onChange(event, values, name)}
      {...rest}
      value={optionsSelected}
      renderOption={(option, { selected, inputValue }) => {
        //console.log("inputvalue:" + selected + "-" + inputValue);
        return (
          <React.Fragment>
            <Checkbox
              name={name}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option[property]}
          </React.Fragment>
        );
      }}
      getOptionSelected={(option, value) => {
        return option[name] === value[name];
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={validation}
          margin="normal"
          variant="outlined"
          label={label}
          size="small"
          placeholder="Elegir"
          fullWidth
          helperText={error}
        />
      )}
    />
  );
};

export default MyMultiSelect;
