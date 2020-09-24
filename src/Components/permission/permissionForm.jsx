import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import { getPermission, savePermission } from "../../services/permissionService";
import {
  Grid,
  Paper,
  Divider,
  Container,
  TextField,
} from "@material-ui/core";
import { messages } from '../common/es_ES';
import TitleForm from '../common/titleForm';
import Loading from '../common/loading';

class PermissionForm extends Form {
  state = {
    data: {
      name: "",
      display_name: "",
      permissions: [],
    },
    inputValue: "",
    errors: [],
    isLoading: false,
  };

  schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().label("Identificador").max(20).messages(messages),
    display_name: Joi.string().label("Nombre").max(20).messages(messages),
  });

  doSubmit = async () => {
    try {
      await savePermission(this.state.data);
      this.successMessage();
    } catch (ex) {
      this.errorMessage(ex);
      if (ex.response && ex.response.status === 422) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data.errors.name;
        errors.display_name = ex.response.data.errors.display_name;
        this.setState({ errors });
      }

    }
  };

  async populatePermission() {
    try {
      const permissionId = this.props.match.params.id; //Pasando por URL id movie
      if (permissionId === "new") return; //Si si
      const { data: permission } = await getPermission(permissionId); //Si no.
      this.setState({ data: this.mapToViewModel(permission) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
      else if (ex.response.status === 403)
        this.props.history.replace("/not-authorized");
    }
  }

  mapToViewModel(permission) {
    return {
      id: permission.id,
      name: permission.name,
      display_name: permission.display_name,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populatePermission();
    this.setState({ isLoading: false });
  }


  render() {
    const { data, isLoading, errors } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/permisos",
        label: "Permisos",
      },
    ];
    let validation;
    errors["name"] === undefined ? (validation = false) : (validation = true);
    return (
      <Container maxWidth="sm" id="permissionForm">
        <Loading open={this.state.isLoading} />
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Permiso"} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className="paper">
              <TitleForm entity={"Permiso"} isLoading={isLoading} />
              <Divider />
              <form onSubmit={this.handleSubmit}>
                <TextField
                  error={validation}
                  onChange={this.handleChange}
                  id={"name"}
                  name={"name"}
                  value={data.name}
                  disabled={true}
                  label={"Identificador"}
                  placeholder={"Ingrese el identificador"}

                  variant="outlined"
                  size="small"
                  margin="normal"
                  helperText={errors["name"]}
                />
                {this.renderInput("display_name", "Nombre *")}
                {/* {this.renderSelect(
                  "guard_name",
                  "Guard",
                  70,
                  "guard_name",
                  "guard_name",
                  guards
                )} */}
                {this.renderButton("Actualizar permiso")}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(PermissionForm);
