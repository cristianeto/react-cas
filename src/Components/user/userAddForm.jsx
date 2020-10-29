import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import auth from "../../services/authService";
import RolesCheckboxes from "./roles/checkboxes";
import PermissionsCheckboxes from "./permissions/checkboxes";
import { getUser, saveUser } from "../../services/userService";
import { getRoles } from '../../services/roleService';
import { saveRolesByUser } from "../../services/userRolesService";
import { getPermissions } from '../../services/permissionService';
import { savePermissionsByUser } from "../../services/userPermissionsService";
import { getEspochUser } from '../../services/espochUserService';
import {
  Grid,
  Paper,
  Divider,
  Container,
  Typography,
} from "@material-ui/core";
import { messages } from '../common/es_ES';
import Loading from '../common/loading';
import SearchButton from '../common/searchButton';
import { notifications } from '../../utils/messages'

class UserAddForm extends Form {
  state = {
    data: {
      belongs_espoch: 'Sí',
      identification_card: "",
      name: "",
      lastname: "",
      fullname: "",
      sex: '',
      email: "",
      roles: [],
      permissions: [],
    },
    rolesChecked: [],
    permissionsChecked: [],
    roles: [],
    permissions: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    id: Joi.string(),
    belongs_espoch: Joi.string().label("Usuario ESPOCH").max(2).messages(messages),
    identification_card: Joi.string().label("Cédula").min(10).max(10).messages(messages),
    name: Joi.string().label("Nombre").max(100).messages(messages),
    lastname: Joi.string().label("Apellido").max(100).messages(messages),
    fullname: Joi.string().allow('').label("Nombre Completo").max(100),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "espoch", "edu", "ec"] },
      })
      .label("Correo")
      .max(100).messages(messages),
    sex: Joi.string().label("Sexo").max(10).messages(messages),
    roles: Joi.array().label("Roles").allow('').messages(messages),
    permissions: Joi.array().label("Permisos").allow('').messages(messages),
  });

  async populateUser() {
    try {
      const userId = this.props.match.params.id; //Pasando por URL id movie
      if (userId === "new" || userId === "se") return; //Si si
      const { data: user } = await getUser(userId); //Si no.
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  mapToViewModel(user) {
    return {
      id: user.id,
      belongs_espoch: user.belongs_espoch,
      identification_card: user.identification_card,
      name: user.name,
      lastname: user.lastname,
      fullname: user.fullname,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    };
  }
  async populateRoles() {
    const { data: roles } = await getRoles();
    this.setState({ roles });
  }

  populateCheckedRoles() {
    const roles = [...this.state.roles]
    roles.forEach((element1, i) => {
      element1.isChecked = false;
    });
    //roles.map((role) => rolesUser.filter(r => r.id === role.id).length > 0 ? role.isChecked = true : role.isChecked = false);
    this.setState({ rolesChecked: roles });
  }

  async populatePermissions() {
    const { data: permissions } = await getPermissions();
    this.setState({ permissions });
  }

  populateCheckedPermissions() {
    const permissions = [...this.state.permissions]
    const permissionsUser = [...this.state.data.permissions];
    permissions.map((role) => permissionsUser.filter(r => r.id === role.id).length > 0 ? role.isChecked = true : role.isChecked = false);
    this.setState({ permissionsChecked: permissions });
  }


  getRole(roleId) {
    return this.state.roles.find((role) => role.id === roleId);
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

  handleSearch = async () => {
    console.log('searching...', this.state.data.identification_card);
    try {
      const { data: espochUser } = await getEspochUser(this.state.data.identification_card);
      if (Object.keys(espochUser).length) {
        const data = { ...this.state.data };
        data['name'] = espochUser.per_nombres;
        data['lastname'] = espochUser.per_primerApellido + ' ' + espochUser.per_segundoApellido;
        data['email'] = espochUser.per_email;
        data['sex'] = espochUser.sex_id === 1 ? 'Hombre' : 'Mujer';
        this.setState({ data })
      } else {
        this.props.enqueueSnackbar(notifications.NOT_FOUND_USER, {
          variant: "error"
        });
      }

    } catch (error) {
      console.error(error);
    }
  }

  doUpdateRoles = async (e) => {
    e.preventDefault();
    const rolesChecked = [...this.state.rolesChecked];
    const arrayRolesToSave = rolesChecked.filter(role => role.isChecked === true);
    const rolesIds = arrayRolesToSave.map(role => role.name)
    try {
      await saveRolesByUser(this.state.data.id, rolesIds);
      this.successMessage();
    } catch (ex) {
      this.errorMessage(ex);
    }
  }
  doUpdatePermissions = async (e) => {
    e.preventDefault();
    const permissionsChecked = [...this.state.permissionsChecked];
    const arrayPermissionsToSave = permissionsChecked.filter(permissions => permissions.isChecked === true);
    const permissionsIds = arrayPermissionsToSave.map(permission => permission.name)
    try {
      await savePermissionsByUser(this.state.data.id, permissionsIds);
      this.successMessage();
    } catch (ex) {
      this.errorMessage(ex);
    }
  }

  doSubmit = async () => {
    try {
      const data = { ...this.state.data };
      data['belongs_espoch'] === 'Sí' ? data['belongs_espoch'] = true : data['belongs_espoch'] = false;
      await saveUser(data);
      this.successMessage();
      if (this.props.match.params.id !== "se") {
        this.props.history.push("/usuarios");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        this.errorMessage(ex);
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.errors.email;
        errors.name = ex.response.data.errors.name;
        errors.lastname = ex.response.data.errors.lastname;
        errors.identification_card = ex.response.data.errors.identification_card;
        this.setState({ errors });
      } else {
        this.errorMessage(ex);
      }
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    // await this.populateUser();
    await this.populateRoles();
    await this.populatePermissions();
    this.populateCheckedRoles();
    this.populateCheckedPermissions();
    this.setState({ isLoading: false });
  }


  render() {
    const { data, isLoading, rolesChecked, permissionsChecked } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/usuarios",
        label: "Usuarios",
      },
    ];
    const espochOptions = [{ 'id': 1, 'name': 'Sí' }, { id: 2, name: 'No' }];
    const sexOptions = [{ 'id': 1, 'name': 'Mujer' }, { id: 2, name: 'Hombre' }];
    const option = data.belongs_espoch === 'Sí' ? true : false;
    return (
      <Container maxWidth="sm" id="userAddForm">
        <Loading open={isLoading} />
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={'Agregar usuario'} />
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className="paper">
              <Typography variant="h5" gutterBottom>
                {this.props.match.params.id === "se"
                  ? "Registrarse"
                  : "Usuario"}
              </Typography>
              <Divider />
              <form onSubmit={this.handleSubmit}>
                {this.renderRadio("belongs_espoch", "Pertenece  a la ESPOCH:", espochOptions)}
                {this.renderInput("identification_card", "Cédula *", 'text', false)}
                {option ? <SearchButton onSearch={this.handleSearch} /> : ''}
                {this.renderInput("name", "Nombre *", 'text', option)}
                {this.renderInput("lastname", "Apellido *", 'text', option)}
                {this.renderInput("email", "Correo *", 'text', option)}
                {this.renderRadio("sex", "Sexo:", sexOptions)}
                {auth.getCurrentUser() !== null && (
                  <div className="checkboxes">
                    <RolesCheckboxes roles={rolesChecked} onChange={this.handleChangeCheckbox} label="Roles" />
                    <PermissionsCheckboxes permissions={permissionsChecked} onChange={this.handleChangeCheckbox} label="Permisos extra" />
                  </div>
                )}
                {this.renderButton("Crear usuario")}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(UserAddForm);
