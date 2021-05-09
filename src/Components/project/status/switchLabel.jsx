import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabel({
  openLabel,
  closeLabel,
  checked,
  onChangeSwitch,
}) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={onChangeSwitch} name='checkedA' />
        }
        label={checked ? openLabel : closeLabel}
      />
    </FormGroup>
  );
}
