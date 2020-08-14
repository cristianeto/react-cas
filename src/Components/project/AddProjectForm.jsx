import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Form from "../common/form";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { messages } from "../common/es_ES";
import { saveProject } from "../../services/projectService";

class AddProjectForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: ''
      },
      errors: {}
    };
  }

  schema = Joi.object({
    id: Joi.string().guid({ version: ["uuidv1"] }),
    name: Joi.string().label("Nombre").max(500).messages(messages),

  });

  doSubmit = async () => {
    try {
      const res = await saveProject(this.state.data);
      this.props.onClose();
      this.successMessage();
      this.props.history.push("/proyecto/" + res.data.id);
    } catch (ex) {
      //console.error(ex);
      this.errorMessage(ex);
    }
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Nuevo proyecto</DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            {this.renderTextarea("name", "Nombre")}
          </DialogContent>
          <DialogActions>
            <Button variant={'outlined'} onClick={this.props.onClose} color="primary">
              Cancel
          </Button>
            {this.renderButton("Guardar")}
          </DialogActions>
        </form>

      </Dialog>
    );
  }
}


export default withSnackbar(AddProjectForm);