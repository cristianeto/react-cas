import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import { getUser, saveUser } from "../../services/userService";
import { getRoles } from '../../services/roleService';
import { saveRolesByUser } from "../../services/userRolesService";
import { getPermissions } from '../../services/permissionService';
import { savePermissionsByUser } from "../../services/userPermissionsService";
import {
  Grid,
  Paper,
  Divider,
  Container,
  FormGroup,
  Typography,
  FormControl,
  FormHelperText,
  LinearProgress,
  FormControlLabel,
} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import TitleForm from '../common/titleForm';
import { messages } from '../common/es_ES';

class UserForm extends Form {
  state = {
    data: {
      identification_card: "",
      name: "",
      lastname: "",
      fullname: "",
      email: "",
      roles: [],
      projects: [],
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
    identification_card: Joi.string().label("C.I.").min(10).max(10),
    name: Joi.string().label("Nombre").max(100),
    lastname: Joi.string().label("Apellido").max(100),
    fullname: Joi.string().allow('').label("Apellido").max(100),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "espoch", "edu", "ec"] },
      })
      .label("Correo")
      .max(100),
    roles: Joi.array().label("Roles").allow('').messages(messages),
    projects: Joi.array().label("Proyectos").allow('').messages(messages),
    permissions: Joi.array().label("Permissions").allow('').messages(messages),
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

  async populateRoles() {
    const { data: roles } = await getRoles();
    this.setState({ roles });
  }

  populateCheckedRoles() {
    const roles = [...this.state.roles]
    const rolesUser = [...this.state.data.roles];
    roles.forEach((element1, i) => {
      element1.permissions = [];
      rolesUser.forEach((element2, j) => {
        if (element1.id === element2.id) {
          element2.isChecked = true;
          roles[i] = element2;
        }
      });
    });
    console.log(roles);
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

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateUser();
    await this.populateRoles();
    await this.populatePermissions();
    this.populateCheckedRoles();
    this.populateCheckedPermissions();
    this.setState({ isLoading: false });
  }

  mapToViewModel(user) {
    return {
      id: user.id,
      identification_card: user.identification_card,
      name: user.name,
      lastname: user.lastname,
      fullname: user.fullname,
      email: user.email,
      roles: user.roles,
      projects: user.projects,
      permissions: user.permissions,
    };
  }

  getRole(roleId) {
    return this.state.roles.find((role) => role.id === roleId);
  }


  handleChangeCheckbox = (event, name, nameChecked) => {
    const array = [...this.state[name]];
    const arrayChecked = [...this.state[nameChecked]];
    const nItem = array.find((item) => item.id === parseInt(event.target.value));
    const indexItem = arrayChecked.indexOf(nItem);
    arrayChecked[indexItem].isChecked = event.target.checked;
    if (name === "roles") {
      this.setState({ roles: arrayChecked });
    } else if (name === "permissions") {
      this.setState({ permissions: arrayChecked });
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
      console.log('saving...');
      await saveUser(this.state.data);
      this.successMessage();
      /* if (this.props.match.params.id !== "se") {
        this.props.history.push("/usuarios");
      } */
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        this.errorMessage(ex);
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.errors.email;
        errors.identification_card =
          ex.response.data.errors.identification_card;
        this.setState({ errors });
      } else {
        this.errorMessage(ex);
      }
    }
  };



  render() {
    const { data, isLoading, rolesChecked, permissionsChecked } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/mi/perfil",
        label: "Mi perfil",
      },
    ];

    const classes = {
      paper: {
        padding: "2em",
        color: "secondary",
      },
    };

    return (
      <Container maxWidth="lg">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={data.fullname} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5}>
            <Paper className="paper">
              <Typography variant="h5" gutterBottom>
                {this.props.match.params.id === "se"
                  ? "Registrarse"
                  : "Usuario"}
              </Typography>
              <Divider />
              {this.state.isLoading && <LinearProgress color="secondary" />}
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("identification_card", "C.I.")}
                {this.renderInput("name", "Nombre")}
                {this.renderInput("lastname", "Apellido")}
                {this.renderInput("email", "Correo")}
                {this.renderButton("Guardar")}
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Paper className="paper">
              <TitleForm entity={"Roles"} isLoading={isLoading} />
              <Divider />
              <div className={classes.demo}>
                <form onSubmit={this.doUpdateRoles}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      {rolesChecked.map(role =>
                        <div key={role.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={role.isChecked}
                                onChange={(event) => this.handleChangeCheckbox(event, 'roles', 'rolesChecked')}
                                name={role.name}
                                value={role.id}
                              />
                            }
                            label={role.name}
                          />
                          <div>
                            <small>
                              {
                                role.permissions.map(p => p.name).join(", ")
                              }
                            </small>
                          </div>
                        </div>

                      )}
                    </FormGroup>
                    <FormHelperText>Se cuidadoso</FormHelperText>
                  </FormControl>
                  {this.renderButton("Guardar")}
                </form>

              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className="paper">
              <TitleForm entity={"Permisos extra"} isLoading={isLoading} />
              <Divider />
              <div className={classes.demo}>
                <form onSubmit={this.doUpdatePermissions}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      {permissionsChecked.map(permission =>
                        <FormControlLabel
                          key={permission.id}
                          control={<Checkbox checked={permission.isChecked} onChange={(event) => this.handleChangeCheckbox(event, 'permissions', 'permissionsChecked')} name={permission.name} value={permission.id} />}
                          label={permission.name}
                        />

                      )}
                    </FormGroup>
                    <FormHelperText>Se cuidadoso</FormHelperText>
                  </FormControl>
                  {this.renderButton("Guardar")}
                </form>

              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(UserForm);
