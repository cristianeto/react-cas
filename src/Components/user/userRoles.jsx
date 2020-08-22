import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState([
    { id: 1, name: "gilad", isChecked: true, },
    { id: 2, name: "jason", isChecked: false, },
    { id: 3, name: "antoine", isChecked: false, }
  ]);

  const handleChange = (event) => {
    console.log('event name: ', event.target.name);
    const state = [...state];
    console.log('state:', state);
    const roles = state.map(s => {
      if (s.name === event.target.name) {
        s.isChecked = event.target.checked
      }
    });
    console.log('roless:', roles);

  };


  //const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  console.log("state: ", state);
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          {state.map(s =>
            <FormControlLabel
              key={s.id}
              control={<Checkbox checked={s.isChecked} onChange={handleChange} name={s.name} value={s.name} />}
              label={s.name}
            />

          )}

        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </div>
  );
}
