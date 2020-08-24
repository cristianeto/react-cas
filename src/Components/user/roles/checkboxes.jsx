import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';

const Checkboxes = ({ roles, onChange, label }) => {
  return (
    <React.Fragment>
      <FormControl component="fieldset">
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
                label={role.name}
              />
              <div>
                <small>
                  {role.permissions.map(p => p.name).join(", ")}
                </small>
              </div>
            </div>
          )}
        </FormGroup>
        <FormHelperText>Se cuidadoso</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
}

export default Checkboxes;