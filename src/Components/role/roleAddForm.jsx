import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import PermissionsCheckboxes from "../user/permissions/checkboxes";
import { saveRole } from "../../services/roleService";
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./role.scss";

class RoleAddForm extends Form {
  state = {
    data: {
      name: "",
      guard_name: "",
      permissions: [],
    },
    guards: [],
    permissionsChecked: [],
    permissions: [],
    errors: [],
    isLoading: false,
  };

  schema = Joi.object({
    name: Joi.string().label("Nombre").max(15).messages(messages),
    guard_name: Joi.string().label("Guard").messages(messages),
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


  handleChangeSelect = (event, newValue, nameSelect) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ 'name': nameSelect, "value": newValue });
    if (errorMessage) errors[nameSelect] = errorMessage;
    else delete errors[nameSelect];

    const data = { ...this.state.data };
    data[nameSelect] = newValue.name;
    this.setState({ data });
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
        errors.guard_name = ex.response.data.errors.guard_name;
        this.setState({ errors });
      } else {
        this.errorMessage(ex);
      }
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateGuards();
    await this.populatePermissions();
    this.populateCheckedPermissions();
    this.setState({ isLoading: false });
  }


  render() {
    const { errors, isLoading, guards, permissionsChecked } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
    ];
    return (
      <Container maxWidth="sm" id="roleAddForm">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Nuevo role"} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className="paper">
              <TitleForm entity={"Nuevo role"} isLoading={isLoading} />
              <Divider />
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Nombre")}
                <Autocomplete
                  id={'id_guard'}
                  name={'guard_name'}
                  options={guards}
                  getOptionLabel={(guard) => guard.name}
                  disableClearable
                  //style={{ width: 300 }}
                  //inputValue={value.name}
                  onChange={(event, newValue) => this.handleChangeSelect(event, newValue, 'guard_name')}
                  renderInput={(params) => <TextField {...params} margin='normal' size="small" label="Seleccione un guard" variant="outlined" error={errors['guard_name']} helperText={errors['guard_name']} />}
                />
                <div className="checkboxes">
                  <PermissionsCheckboxes permissions={permissionsChecked} onChange={this.handleChangeCheckbox} label="Permisos" />
                </div>
                {this.renderButton("Crear role")}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(RoleAddForm);
