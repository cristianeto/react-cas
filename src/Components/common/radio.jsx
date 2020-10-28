import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const Radios = ({ name, value, label, options, onChange, error }) => {
  let validation;
  error === undefined ? (validation = false) : (validation = true);
  return (
    <FormControl component="fieldset" error={validation} style={{ width: '100%' }} margin="normal">
      <FormLabel component="legend">{label} </FormLabel>
      <RadioGroup aria-label="quiz"
        name={name}
        value={value}
        onChange={onChange}
        style={{ flexDirection: 'row' }}
      >
        {options.map(option =>
          <FormControlLabel key={option.id} value={option.name} control={<Radio />} label={option.name} />
        )}
      </RadioGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}

export default Radios;