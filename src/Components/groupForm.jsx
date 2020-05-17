import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "./breadcum";
import Form from "./common/form";
import Panel from "./common/panel";

import { getDependencies } from "../services/dependencyService";
import { getGroupTypes } from "../services/groupTypeService";
import { getGroup, saveGroup } from "../services/groupService";
import { getLines } from "../services/lineService";
import {
  Container,
  LinearProgress,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import { getPrograms } from "../services/programService";

class GroupForm extends Form {
  state = {
    data: {
      acronym_group: "",
      code_group: "",
      name_group: "",
      mission_group: "",
      vision_group: "",
      id_dependency: "",
      id_researchLine: [],
      id_program: [],
      id_groupType: "",
    },
    dependencies: [],
    groupTypes: [],
    lines: [],
    programs: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    id_group: Joi.number(),
    code_group: Joi.string().label("Código").max(10),
    acronym_group: Joi.string().alphanum().label("Siglas").max(10),
    name_group: Joi.string().label("Nombre"),
    mission_group: Joi.string().label("Misión"),
    vision_group: Joi.string().label("Visión"),
    id_dependency: Joi.number().label("Dependencia"),
    id_groupType: Joi.number().label("Tipo"),
    id_researchLine: Joi.array().label("Líneas"),
    id_program: Joi.array().label("Programas"),
  });

  async populateDependencies() {
    const { data: dependencies } = await getDependencies();
    this.setState({ dependencies });
  }
  async populateGroupTypes() {
    const { data: groupTypes } = await getGroupTypes();
    this.setState({ groupTypes });
  }
  async populateLines() {
    const { data: lines } = await getLines();
    this.setState({ lines });
  }
  async populatePrograms() {
    const { data: programs } = await getPrograms();
    this.setState({ programs });
  }
  async populateGroup() {
    try {
      const groupId = this.props.match.params.id; //Pasando por URL id movie
      if (groupId === "new") return; //Si si
      const { data: group } = await getGroup(groupId); //Si no.
      this.setState({ data: this.mapToViewModel(group) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateDependencies();
    await this.populateGroupTypes();
    await this.populateGroup();
    await this.populateLines();
    await this.populatePrograms();
    this.setState({ isLoading: false });
  }

  mapToViewModel(group) {
    let lines = [];
    group.lines.forEach((line) => {
      lines.push(line.id_researchLine);
    });
    //console.log("Lines:", lines);

    return {
      id_group: group.id_group,
      code_group: group.code_group,
      acronym_group: group.acronym_group,
      name_group: group.name_group,
      mission_group: group.mission_group,
      vision_group: group.vision_group,
      id_dependency: group.id_dependency,
      id_groupType: group.id_groupType,
      id_researchLine: group.lines,
      id_program: group.programs,
    };
  }
  doSubmit = async () => {
    try {
      await saveGroup(this.state.data);
      this.props.enqueueSnackbar(`Registro guardado correctamente!`, {
        variant: "success",
      });
      this.props.history.push("/grupos-investigacion");
    } catch (ex) {
      this.props.enqueueSnackbar(`${ex.response.data.message}`, {
        variant: "error",
      });
    }
  };

  cloningArray(inputName) {
    let entities = [];
    switch (inputName) {
      case "id_researchLine":
        entities = [...this.state["lines"]];
        break;
      case "id_program":
        entities = [...this.state["programs"]];
        break;
      default:
        break;
    }
    return entities;
  }

  render() {
    const { data } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/grupos-investigacion",
        label: "Grupos Investigación",
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
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Grupo"} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={8}>
            <Paper style={classes.paper}>
              <Typography variant="h4" gutterBottom>
                Grupo: <small>{data.acronym_group}</small>
                {this.state.isLoading && <LinearProgress color="secondary" />}
              </Typography>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("code_group", "Código")}
                {this.renderInput("acronym_group", "Siglas")}
                {this.renderInput("name_group", "Nombre")}
                {this.renderTextarea("mission_group", "Misión")}
                {this.renderTextarea("vision_group", "Visión")}
                {this.renderSelect(
                  "id_dependency",
                  "Facultad",
                  75,
                  "name_dependency",
                  this.state.dependencies
                )}
                {this.renderMultiSelect(
                  "id_researchLine",
                  "Líneas de investigación",
                  "name_researchLine",
                  this.state.lines
                )}
                {this.renderMultiSelect(
                  "id_program",
                  "Programas",
                  "name_program",
                  this.state.programs
                )}
                {this.renderSelect(
                  "id_groupType",
                  "Tipo proyecto",
                  115,
                  "name_groupType",
                  this.state.groupTypes
                )}
                {this.renderButton("Guardar")}
              </form>
            </Paper>
          </Grid>
          <Grid container item xs={12} sm={5} md={4} spacing={3}>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}>
                <Panel
                  id="id_researchLine"
                  property="name_researchLine"
                  title="Líneas de Investigación"
                  data={this.state.data["id_researchLine"]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}>
                <Panel
                  id="id_program"
                  property="name_program"
                  title="Programas"
                  data={this.state.data["id_program"]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Usuarios
                </Typography>
                <div style={classes.demo}></div>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(GroupForm);
