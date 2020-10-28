import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';

const Checkboxes = ({ roles, onChange, label }) => {
  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {roles.map(role =>
          <div key={role.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={role.isChecked}
                  onChange={(event) => onChange(event, 'roles', 'rolesChecked')}
                  name={role.name}
                  value={role.id}
                />
              }
              label={role.display_name}
            />
            <div>
              <small>
                {role.permissions.map(p => p.display_name).join(", ")}
              </small>
            </div>
          </div>
        )}
      </FormGroup>
      <FormHelperText>Se cuidadoso</FormHelperText>
    </FormControl>

  );
}

export default Checkboxes;