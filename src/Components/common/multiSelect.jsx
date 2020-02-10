import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const MyMultiSelect = ({
  name,
  value,
  label,
  property,
  options,
  onChange,
  error
}) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);

  const classes = {
    formControl: {
      minWidth: "100%",
      maxWidth: "100%"
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: "3em"
    }
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  return (
    <FormControl style={classes.formControl}>
      <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
      <Select
        labelId="demo-mutiple-name-label"
        id={name + []}
        name={name + []}
        value={[value]}
        multiple
        input={<Input />}
        MenuProps={MenuProps}
        onChange={onChange}
      >
        {options.map(option => (
          <MenuItem key={option[name]} value={option[property]}>
            {option[property]}
          </MenuItem>
        ))}
      </Select>
      {/* {error && <FormHelperText>{error}</FormHelperText>} */}
    </FormControl>
  );
  /* return (
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
  ); */
};

export default MyMultiSelect;
