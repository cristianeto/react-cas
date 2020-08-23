import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import { getUser, saveUser } from "../../services/userService";
import { saveRolesByUser } from "../../services/userRolesService";
import {
  Grid,
  Paper,
  Divider,
  Container,
  FormGroup,
  FormLabel,
  Typography,
  FormControl,
  FormHelperText,
  LinearProgress,
  FormControlLabel,
} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import TitleForm from '../common/titleForm';
import { getRoles } from '../../services/roleService';

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
    roles: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    id: Joi.string(),
    identification_card: Joi.string().label("C.I.").min(10).max(10),
    name: Joi.string().label("Nombre").max(100),
    lastname: Joi.string().label("Apellido").max(100),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "espoch", "edu", "ec"] },
      })
      .label("Correo")
      .max(100),
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
    roles.map((role) => rolesUser.filter(r => r.id === role.id).length > 0 ? role.isChecked = true : role.isChecked = false);
    this.setState({ rolesChecked: roles });
    console.log("populateRoles: ", this.state.rolesChecked);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateUser();
    await this.populateRoles();
    this.populateCheckedRoles();
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


  handleChangeCheckbox = (event) => {
    const rolesChecked = [...this.state.rolesChecked];
    const role = this.getRole(parseInt(event.target.value));
    const indexRole = rolesChecked.indexOf(role);
    rolesChecked[indexRole].isChecked = event.target.checked;
    this.setState({ rolesChecked });
  }

  doUpdate = async (e) => {
    e.preventDefault();
    const rolesChecked = [...this.state.rolesChecked];
    const arrayRolesToSave = rolesChecked.filter(role => role.isChecked === true);
    const rolesIds = arrayRolesToSave.map(role => role.name)
    console.log(rolesIds);
    try {
      await saveRolesByUser(this.state.data.id, rolesIds);
      this.successMessage();
    } catch (ex) {
      this.errorMessage(ex);
    }
  }

  doSubmit = async () => {
    try {
      await saveUser(this.state.data);
      this.successMessage();
      if (this.props.match.params.id !== "se") {
        this.props.history.push("/usuarios");
      }
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
    const { data, isLoading, rolesChecked } = this.state;
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
                {this.renderButton("Actualizar")}
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Paper className="paper">
              <TitleForm entity={"Roles"} isLoading={isLoading} />
              <Divider />
              <div className={classes.demo}>
                <form onSubmit={this.doUpdate}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      {rolesChecked.map(role =>
                        <FormControlLabel
                          key={role.id}
                          control={<Checkbox checked={role.isChecked} onChange={this.handleChangeCheckbox} name={role.name} value={role.id} />}
                          label={role.name}
                        />

                      )}
                    </FormGroup>
                    <FormHelperText>Se cuidadoso</FormHelperText>
                  </FormControl>
                  {this.renderButton("Actualizar")}
                </form>

              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className="paper">
              <TitleForm entity={"Permisos"} isLoading={isLoading} />
              <Divider />
              <div className={classes.demo}>
                <form onSubmit={this.doUpdate}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      {rolesChecked.map(role =>
                        <FormControlLabel
                          key={role.id}
                          control={<Checkbox checked={role.isChecked} onChange={this.handleChangeCheckbox} name={role.name} value={role.id} />}
                          label={role.name}
                        />

                      )}
                    </FormGroup>
                    <FormHelperText>Se cuidadoso</FormHelperText>
                  </FormControl>
                  {this.renderButton("Actualizar")}
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
