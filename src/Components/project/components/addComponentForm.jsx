import React, { useState, useEffect } from 'react';
import { saveComponent } from '../../../services/projectComponentService';
import { notifications } from '../../../utils/messages';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

function AddProjectComponentForm(props) {
  const initialState = {
    data: {
      name: '',
      project_slug: props.projectSlug,
      meta: '',
    },
  }
  const [state, setState] = useState(initialState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const data = { ...state.data }
    data[name] = value;
    setState(prevState => ({ ...prevState, data }));
  };
  const handleSubmit = async () => {
    try {
      await saveComponent(state.data);
      enqueueSnackbar(notifications.SUCCESS, { variant: 'success', });
      handleClose();
      setState({ ...initialState });
      props.populateComponents();
    } catch (ex) {
      console.log("Catch error", ex.response)
      enqueueSnackbar(`${ex.response.data.message}`, { variant: 'error', });
    }
  }

  return (
    <div>
      <Button
        className="addComponent"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Agregar Componente
            </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Datos del componente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre del componente"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="meta"
            label="Nombre de la meta"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rowsMax="3"
            size="small"
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} color="primary" className="btn btn-guardar" variant="contained" margin="normal" size="medium">
            Guardar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddProjectComponentForm;