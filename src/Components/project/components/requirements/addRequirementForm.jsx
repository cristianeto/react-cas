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
import Joi from "@hapi/joi";
import { messages } from "../../../common/es_ES";
import { Checkbox } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab/";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { saveRequirement } from "../../../../services/requirementService";

const AddRequirementForm = React.memo(
  ({ activities, populateRequirements, budget }) => {
    const initialState = {
      data: {
        name: "",
        quantity: "",
        price: "0.00",
        total_price: "0.00",
        activity_id: "",
      },
      errors: {},
    };

    const [state, setState] = useState(initialState);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);

    /* const handleDateChange = (date) => {
    setSelectedDate(date);
  }; */

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = ({ target: input }) => {
      const errors = { ...state.errors };
      const errorMessage = validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];

      const data = { ...state.data };
      data[input.name] = input.value;
      setState((prevState) => ({ ...prevState, data, errors }));
      if (input.name !== "name")
        data["total_price"] = data["quantity"] * data["price"];
    };

    const handleChangeSelect = (event, newValue, nameSelect) => {
      const data = { ...state.data };
      data[nameSelect] = newValue.id;
      setState((prevState) => ({ ...prevState, data }));
    };

    const validateProperty = ({ name, value }) => {
      const obj = { [name]: value };
      const { error } = schema.validate(obj);
      return error ? error.details[0].message : null;
    };

    const schema = Joi.object({
      name: Joi.string()
        .label("Descripción")
        .min(3)
        .max(500)
        .messages(messages),
      quantity: Joi.number()
        .label("Cantidad")
        .positive()
        .integer()
        .messages(messages),
      price: Joi.number()
        .precision(2)
        .label("Precio unitario")
        .positive()
        .messages(messages),
      total_price: Joi.number()
        .precision(2)
        .label("Precio total")
        .messages(messages),
    });

    const handleSubmit = async () => {
      try {
        await saveRequirement(state.data);
        populateRequirements();
        //budget();
        enqueueSnackbar(notifications.SUCCESS, { variant: "success" });
        setState({ ...initialState });
        handleClose();
      } catch (ex) {
        console.log("Catch error", ex.response);
        enqueueSnackbar(`${ex.response.data.message}`, { variant: "error" });
      }
    };

    useEffect(() => {});

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
      <div>
        <Button
          className="addComponent"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Agregar Requerimiento
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Datos del requerimiento
          </DialogTitle>
          <DialogContent>
            <TextField
              error={state.errors["name"] === undefined ? false : true}
              autoFocus
              margin="dense"
              name="name"
              label="Descripción *"
              type="text"
              fullWidth
              multiline
              rowsMax="2"
              variant="outlined"
              size="small"
              onChange={handleChange}
              helperText={state.errors["name"]}
            />
            <TextField
              error={state.errors["quantity"] === undefined ? false : true}
              margin="dense"
              name="quantity"
              label="Cantidad *"
              type="text"
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              helperText={state.errors["quantity"]}
            />
            <TextField
              error={state.errors["price"] === undefined ? false : true}
              margin="dense"
              name="price"
              label="Precio unitario *"
              type="text"
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleChange}
              helperText={state.errors["price"]}
            />
            <TextField
              error={state.errors["total_price"] === undefined ? false : true}
              margin="dense"
              name="total_price"
              label="Precio total *"
              type="text"
              fullWidth
              variant="outlined"
              size="small"
              value={state.data.total_price}
              disabled
              onChange={handleChange}
              helperText={state.errors["total_price"]}
            />
            <Autocomplete
              //multiple
              id={"activity"}
              name={"activity"}
              limitTags={2}
              options={activities}
              //disableCloseOnSelect
              disableClearable
              getOptionLabel={(activity) => activity.name}
              onChange={(event, values) =>
                handleChangeSelect(event, values, "activity_id")
              }
              label={"Actividad *"}
              //value={this.state.data.user}
              renderOption={(option, { selected, inputValue }) => {
                //console.log("inputvalue:" + selected + "; " + inputValue);
                return (
                  <React.Fragment>
                    <Checkbox
                      name={"activity"}
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </React.Fragment>
                );
              }}
              getOptionSelected={(option, value) => {
                return option.id === value.id;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  //error={validation}
                  margin="normal"
                  variant="outlined"
                  label={"Actividad *"}
                  size="small"
                  placeholder="Actividad a la que pertenece"
                  fullWidth
                  //helperText={error}
                />
              )}
            />
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
  }
);

export default AddRequirementForm;
