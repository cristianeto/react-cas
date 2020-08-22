import React, { Fragment } from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import TitleForm from "../common/titleForm";
import { getUser, saveUser } from "../../services/userService";
import auth from "../../services/authService";
import { Container, Typography, Paper, Grid, Chip, Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import img_avatar from "../../static/img/img_avatar.png";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

class meProfile extends Form {
  state = {
    data: {
      identification_card: "",
      name: "",
      lastname: "",
      fullname: "",
      email: "",
      roles: [],
      projects: [],
      selectedRole: "",
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
      fullname: user.fullname,
      email: user.email,
      roles: user.roles,
      projects: user.projects,
      selectedRole: auth.getSelectedRole().id
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
    ];

    const classes = {
      mainPaper: {
        color: "secondary",
        borderTop: "5px solid blue"
      },
      paper: {
        padding: "2em 2em 0",
        color: "secondary",
      },
      large: {
        height: "8em",
        width: "8em",
        textAlign: "center",
      },
      navLink: {
        color: "inherit",
        textDecoration: "none",
      },
    };
    const { data } = this.state;
    return (
      <Container maxWidth="xl">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Mi perfil"} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} xl={3}>
            <Paper style={classes.mainPaper}>
              <div style={classes.paper}>
                <TitleForm
                  entity={"Mi perfil"}
                  isLoading={this.state.isLoading}
                />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1em' }} >
                  <Avatar alt={this.state.name} src={img_avatar} style={classes.large} />
                </div>
              </div>
              <List component="nav" className={classes.root} aria-label="mailbox folders">
                <ListItem >
                  {data.roles.map(role => (
                    (data.selectedRole === role.id) ?
                      <Chip label={role.name} key={role.id} color="primary" style={{ margin: '0.25em' }} />
                      : <Chip label={role.name} key={role.id} style={{ marginRight: '0.5em' }} />
                  )
                  )}
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="# de proyectos:" />
                  <Chip label={data.projects.length} color="primary" />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Cédula:" secondary={data.identification_card} />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Nombre:" secondary={data.fullname} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="E-mail:" secondary={data.email} />
                </ListItem>
              </List>
              {/* <form onSubmit={this.handleSubmit}>
                {this.renderInput("identification_card", "C.I.")}
                {this.renderInput("name", "Nombre")}
                {this.renderInput("lastname", "Apellido")}
                {this.renderInput("email", "Correo")}
                {this.renderButton("Guardar")}
              </form> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} xl={5}>
            <Paper style={classes.paper}>
              <Typography variant="h5" gutterBottom>
                Mis proyectos
              </Typography>
              <div className={classes.demo}>
                <List dense={true}>
                  {data.projects.length > 0 ? data.projects.map(project => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Link to={"/proyecto/" + project.slug} style={classes.navLink}>{project.name}</Link>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Tooltip title={project.updated_at}>
                              <span variant="caption">
                                Última actualización: {project.human_updated_at}
                              </span>
                            </Tooltip>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))
                    :
                    <ListItem>
                      <ListItemText
                        primary={"No existen proyectos"}
                      />
                    </ListItem>
                  }
                  <Divider />
                </List>
              </div>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={4} xl={4}>
            <Grid item xs={12}>
              <Paper style={classes.paper}>
                <Typography variant="h5" gutterBottom>
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
            <Grid item xs={12}>
              <Paper style={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  Mis permisos
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
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(meProfile);
