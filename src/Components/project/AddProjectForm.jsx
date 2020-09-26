import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Form from "../common/form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { messages } from "../common/es_ES";
import { saveProject } from "../../services/projectService";

class AddProjectForm extends Form {
  state = {
    data: {
      name: ''
    },
    errors: {}
  };


  schema = Joi.object({
    id: Joi.string().guid(),
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
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">Nuevo proyecto</DialogTitle>
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