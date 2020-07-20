import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import TitleForm from "../common/titleForm";
import { getUser, saveUser } from "../../services/userService";
import auth from "../../services/authService";
import { Container, Typography, Paper, Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";

class meProfile extends Form {
  state = {
    data: {
      identification_card: "",
      name: "",
      lastname: "",
      email: "",
    },
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
      const currentUser = auth.getCurrentUser();
      const { data: user } = await getUser(currentUser.id); //Si no.
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateUser();
    this.setState({ isLoading: false });
  }

  mapToViewModel(user) {
    return {
      id: user.id,
      identification_card: user.identification_card,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };
  }

  doSubmit = async () => {
    try {
      await saveUser(this.state.data);
      this.successMessage();
      // this.props.history.push("/usuarios");
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

    const classes = {
      paper: {
        padding: "2em",
        color: "secondary",
      },
    };

    return (
      <Container maxWidth="lg">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Usuario"} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={8}>
            <Paper style={classes.paper}>
              <TitleForm
                entity={"Mi perfil"}
                isLoading={this.state.isLoading}
              />
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("identification_card", "C.I.")}
                {this.renderInput("name", "Nombre")}
                {this.renderInput("lastname", "Apellido")}
                {this.renderInput("email", "Correo")}
                {this.renderButton("Guardar")}
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <Paper style={classes.paper}>
              <Typography variant="h4" gutterBottom>
                Mis roles
              </Typography>
              <div className={classes.demo}>
                <List dense={true}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Administrador"
                      secondary={"2020-12-28"}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(meProfile);
