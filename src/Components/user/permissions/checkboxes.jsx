import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';

const Checkboxes = ({ permissions, onChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Permisos extra</FormLabel>
      <FormGroup>
        {permissions.map(permission =>
          <FormControlLabel
            key={permission.id}
            control={
              <Checkbox
                checked={permission.isChecked}
                onChange={(event) => onChange(event, 'permissions', 'permissionsChecked')}
                name={permission.name}
                value={permission.id} />}
            label={permission.name}
          />

        )}
      </FormGroup>
      <FormHelperText>Se cuidadoso</FormHelperText>
    </FormControl>
  );
}

export default Checkboxes;