import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Form from "../common/form";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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
    slug: Joi.string().label("Slug").max(500).messages(messages),
  });

  doSubmit = async () => {
    try {
      const res = await saveProject(this.state.data);
      this.props.onClose();
      this.successMessage();
      this.props.history.push("/proyecto/" + res.data.slug);
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
            {this.renderTextarea("name", "Nombre")}
            {this.renderButton("Crear proyecto")}
          </DialogContent>
        </form>
      </Dialog>
    );
  }
}


export default withSnackbar(AddProjectForm);