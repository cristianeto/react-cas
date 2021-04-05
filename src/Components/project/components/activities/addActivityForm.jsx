import React, { useState, useEffect } from "react";
//import { saveComponent } from '../../../services/projectComponentService';
import { notifications } from "../../../../utils/messages";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { saveActivity } from "../../../../services/activityService";
import { format } from "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const AddActivityForm = React.memo((props) => {
  const initialState = {
    data: {
      name: "",
      responsable: "",
      start_date: format(new Date(), "yyyy/MM/dd"),
      end_date: format(new Date(), "yyyy/MM/dd"),
      component_id: props.component.id,
    },
  };
  const [state, setState] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  /* const handleDateChange = (date) => {
    setSelectedDate(date);
  }; */
  const handleDateChange = (date, name) => {
    const data = { ...state.data };
    data[name] = format(date, "yyyy/MM/dd");
    console.log(data[name]);
    setState((prevState) => ({ ...prevState, data }));
    //setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...state.data };
    data[name] = value;
    setState((prevState) => ({ ...prevState, data }));
  };

  const handleSubmit = async () => {
    try {
      await saveActivity(state.data);
      props.populateActivities();
      enqueueSnackbar(notifications.SUCCESS, { variant: "success" });
      setState({ ...initialState });
      handleClose();
    } catch (ex) {
      console.log("Catch error", ex.response);
      enqueueSnackbar(`${ex.response.data.message}`, { variant: "error" });
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Button
        className="addComponent"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Agregar Actividad
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Datos de la actividad</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre *"
            type="text"
            fullWidth
            multiline
            rowsMax="2"
            variant="outlined"
            size="small"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="responsable"
            label="Responsable *"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <Grid container justify="space-around">
              <DatePicker
                margin="normal"
                id="start_date"
                label="Fecha de inicio *"
                format="yyyy/MM/dd"
                openTo="year"
                views={["year", "month", "date"]}
                variant="outlined"
                value={state.data.start_date}
                onChange={(date) => handleDateChange(date, "start_date")}
              />
              <DatePicker
                margin="normal"
                id="end_date"
                label="Fecha de fin *"
                openTo="year"
                views={["year", "month", "date"]}
                format="yyyy/MM/dd"
                variant="outlined"
                value={state.data.end_date}
                onChange={(date) => handleDateChange(date, "end_date")}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Button
            onClick={handleSubmit}
            color="primary"
            className="btn btn-guardar"
            variant="contained"
            margin="normal"
            size="medium"
          >
            Guardar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default AddActivityForm;
