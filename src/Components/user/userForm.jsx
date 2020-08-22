import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import { getUser, saveUser } from "../../services/userService";
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
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
  async populateRoles() {
    const { data: roles } = await getRoles();
    this.setState({ roles });
  }

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

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateRoles();
    await this.populateUser();
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

  handleChangeCheckbox = (event) => {
    console.log(event.target.checked);
  }

  render() {
    const { data, isLoading } = this.state;
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
          <Grid item xs={12} sm={12} md={6}>
            <Paper style={classes.paper}>
              <Typography variant="h5" gutterBottom>
                {this.props.match.params.id === "se"
                  ? "Registrarse"
                  : "Usuario"}
              </Typography>
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
          <Grid item xs={12} sm={12} md={6}>
            <Paper className="paper">
              <TitleForm entity={"Roles"} isLoading={isLoading} />
              <Divider />
              <div className={classes.demo}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Asignando roles</FormLabel>
                  <FormGroup>
                    {this.state.roles.length > 0 ? this.state.roles.map(role => (
                      /* vendors contains the element we're looking for */
                      <FormControlLabel
                        key={role.id}
                        control={
                          <Checkbox
                            checked={data.roles.filter(r => r.id === role.id).length > 0 ? true : false}
                            onChange={this.handleChangeCheckbox}
                            name="roles[]" />
                        }
                        label={role.name}
                      />
                    ))
                      :
                      <ListItem>
                        <ListItemText
                          primary={"No tienes asignado un role"}
                        />
                      </ListItem>
                    }
                  </FormGroup>
                  <FormHelperText>Se cuidadoso</FormHelperText>
                </FormControl>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(UserForm);
