import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "./breadcum";
import Form from "./common/form";

import { getDependencies } from "../services/dependencyService";
import { getGroupTypes } from "../services/groupTypeService";
import { getGroup, saveGroup } from "../services/groupService";
import { getLines } from "../services/lineService";
import { Container } from "@material-ui/core";
import { LinearProgress, Typography, Paper, Grid } from "@material-ui/core";

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
      id_groupType: ""
    },
    dependencies: [],
    groupTypes: [],
    lines: [],
    errors: {},
    isLoading: false
  };

  schema = Joi.object({
    id_group: Joi.number(),
    code_group: Joi.string()
      .label("Código")
      .max(10),
    acronym_group: Joi.string()
      .alphanum()
      .label("Siglas")
      .max(10),
    name_group: Joi.string().label("Nombre"),
    mission_group: Joi.string().label("Misión"),
    vision_group: Joi.string().label("Visión"),
    id_dependency: Joi.number().label("Dependencia"),
    id_groupType: Joi.number().label("Tipo"),
    id_researchLine: Joi.array().label("Líneas")
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
    this.setState({ isLoading: false });
  }

  mapToViewModel(group) {
    let lines = [];
    group.lines.forEach(line => {
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
      id_researchLine: group.lines
    };
  }
  doSubmit = async () => {
    try {
      await saveGroup(this.state.data);
      this.props.enqueueSnackbar(
        `${this.state.data.acronym_group} fue guardado correctamente!`,
        { variant: "success" }
      );
      /* this.props.history.push("/grupos-investigacion"); */
    } catch (error) {
      this.props.enqueueSnackbar(`Se produjo un error. ${error}`, {
        variant: "error"
      });
    }
  };

  handleChangeMultiple = ({ target: input }) => {
    const valueArray = input.value;

    const data = { ...this.state.data };
    const entities = [...this.state["lines"]];

    let newArray = [];
    entities.forEach(line => {
      valueArray.forEach(val => {
        if (line.id_researchLine === val) newArray.push(line);
      });
    });
    data[input.name] = newArray;
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const listBreadcrumbs = [
      {
        path: "grupos-investigación",
        label: "Grupos Investigación"
      }
    ];

    const classes = {
      paper: {
        padding: "2em",
        color: "secondary"
      }
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
                  "name_dependency",
                  this.state.dependencies
                )}
                {this.renderMultiSelect(
                  "id_researchLine",
                  "Líneas",
                  "name_researchLine",
                  this.state.lines
                )}
                {this.renderSelect(
                  "id_groupType",
                  "Tipo",
                  "name_groupType",
                  this.state.groupTypes
                )}
                {this.renderButton("Guardar")}
              </form>
            </Paper>
          </Grid>
          <Grid container item xs={12} sm={5} md={4}>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}>
                {this.renderPanel(
                  "id_researchLine",
                  "name_researchLine",
                  "Líneas de Investigación"
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}>
                {this.renderPanel(
                  "id_researchLine",
                  "name_researchLine",
                  "Programas"
                )}
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
