import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import PermissionsCheckboxes from "../user/permissions/checkboxes";
import { saveRole, getRole } from "../../services/roleService";
import { getGuards } from "../../services/guardService";
import { getPermissions } from "../../services/permissionService";
import {
  Grid,
  Paper,
  Divider,
  Container,
  TextField,
} from "@material-ui/core";
import { messages } from '../common/es_ES';
import TitleForm from '../common/titleForm';
import "./role.scss";

class RoleForm extends Form {
  state = {
    data: {
      name: "",
      display_name: "",
      /* guard_name: "", */
      permissions: [],
    },
    inputValue: "",
    guards: [],
    permissionsChecked: [],
    permissions: [],
    errors: [],
    isLoading: false,
  };

  schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().label("Identificador").max(20).messages(messages),
    display_name: Joi.string().label("Nombre").max(20).messages(messages),
    /* guard_name: Joi.string().label("Guard").messages(messages), */
    permissions: Joi.array().label("Permisos").allow('').messages(messages),
  });

  populateCheckedPermissions() {
    const permissions = [...this.state.permissions]
    const permissionsUser = [...this.state.data.permissions];
    permissions.map((permission) => permissionsUser.filter(p => p.id === permission.id).length > 0 ? permission.isChecked = true : permission.isChecked = false);
    this.setState({ permissionsChecked: permissions });
  }

  async populateGuards() {
    const { data: guards } = await getGuards();
    this.setState({ guards });
  }
  async populatePermissions() {
    const { data: permissions } = await getPermissions();
    this.setState({ permissions });
  }

  handleChangeCheckbox = (event, name, nameChecked) => {
    const data = { ...this.state.data };
    const array = [...this.state[name]];
    const arrayChecked = [...this.state[nameChecked]];
    const nItem = array.find((item) => item.id === parseInt(event.target.value));
    const indexItem = array.indexOf(nItem);
    arrayChecked[indexItem].isChecked = event.target.checked;
    data[name] = arrayChecked.filter(a => a.isChecked);
    this.setState({ [name]: arrayChecked, data });
  }
  doSubmit = async () => {
    try {
      await saveRole(this.state.data);
      this.successMessage();
      this.props.history.push("/roles");
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        this.errorMessage(ex);
        const errors = { ...this.state.errors };
        errors.name = ex.response.data.errors.name;
        errors.display_name = ex.response.data.errors.display_name;
        /* errors.guard_name = ex.response.data.errors.guard_name; */
        this.setState({ errors });
      } else if (ex.response.status === 403)
        this.props.enqueueSnackbar('Operación no autizada!', {
          variant: 'error',
        });
    }
  };

  async populateRole() {
    try {
      const roleId = this.props.match.params.id; //Pasando por URL id movie
      console.log("roleID: ", roleId);
      if (roleId === "new") return; //Si si
      const { data: role } = await getRole(roleId); //Si no.
      this.setState({ data: this.mapToViewModel(role) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(role) {
    return {
      id: role.id,
      name: role.name,
      display_name: role.display_name,
      /* guard_name: role.guard_name, */
      permissions: role.permissions,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateGuards();
    await this.populateRole();
    await this.populatePermissions();
    this.populateCheckedPermissions();
    this.setState({ isLoading: false });
  }


  render() {
    const { data, isLoading, permissionsChecked } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/roles",
        label: "Roles",
      },
    ];
    let validation;
    this.state.errors["name"] === undefined ? (validation = false) : (validation = true);
    return (
      <Container maxWidth="sm" id="roleForm">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Nuevo rol"} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className="paper">
              <TitleForm entity={"Rol"} isLoading={isLoading} />
              <Divider />
              <form onSubmit={this.handleSubmit}>
                <TextField
                  error={validation}
                  onChange={this.handleChange}
                  id={"name"}
                  name={"name"}
                  value={data.name}
                  disabled={this.props.match.params.id === 'new' ? false : true}
                  label={"Identificador *"}
                  placeholder={"Ingrese el identificador"}

                  variant="outlined"
                  size="small"
                  margin="normal"
                  helperText={this.state.errors["name"]}
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
                <div className="checkboxes">
                  <PermissionsCheckboxes permissions={permissionsChecked} onChange={this.handleChangeCheckbox} label="Permisos (opcional)" />
                </div>
                {this.renderButton(this.props.match.params.id === 'new' ? "Crear rol" : "Actualizar rol")}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(RoleForm);
