import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";

const MyMultiSelect = ({
  name,
  label,
  property,
  options,
  error,
  value,
  onChange,
  ...rest
}) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "10em",
        width: 250
      }
    }
  };
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
  const [personName, setPersonName] = React.useState([]);
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder"
  ];

  const handleChangeM = event => {
    console.log("Click: ", value);
    setPersonName(event.target.value);
  };
  return (
    <FormControl style={classes.formControl}>
      <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
      <Select
        labelId="demo-mutiple-name-label"
        id="demo-mutiple-name"
        multiple
        value={personName}
        onChange={handleChangeM}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {names.map((namesd, index) => (
          <MenuItem key={namesd} value={namesd}>
            {namesd}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    /*     <FormControl
      required
      variant="outlined"
      fullWidth
      size="small"
      margin="normal"
    >
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
        error={validation}
        labelId="demo-mutiple-chip-label"
        id={name}
        name={name}
        labelWidth={75}
        multiple
        {...rest}
        input={<Input id={name} name={name} value={[]} />}
        renderValue={selected => (
          <div style={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} style={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
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
    </FormControl> */
  );
};

export default MyMultiSelect;
