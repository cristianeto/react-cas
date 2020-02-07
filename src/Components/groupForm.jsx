import React from "react";
import Joi from "@hapi/joi";
import Breadcrumb from "./breadcum";
import Form from "./common/form";
import LinesGroup from "./linesGroup";
import { getDependencies } from "../services/dependencyService";
import { getGroupTypes } from "../services/groupTypeService";
import { getGroup, saveGroup } from "../services/groupService";
import { getLines } from "../services/lineService";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class GroupForm extends Form {
  state = {
    data: {
      acronym_group: "",
      code_group: "",
      name_group: "",
      mission_group: "",
      vision_group: "",
      id_dependency: "",
      id_researchLine: "",
      id_groupType: ""
    },
    dependencies: [],
    groupTypes: [],
    lines: [],
    errors: {}
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
    id_researchLine: Joi.any().label("Líneas")
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
      console.log("data: ", this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateDependencies();
    await this.populateGroupTypes();
    await this.populateGroup();
    await this.populateLines();
  }

  mapToViewModel(group) {
    let lines = [0];
    /* group.lines.forEach(line => {
      lines.push(line.id_researchLine);
    }); */
    console.log("Lines:", lines);

    return {
      id_group: group.id_group,
      code_group: group.code_group,
      acronym_group: group.acronym_group,
      name_group: group.name_group,
      mission_group: group.mission_group,
      vision_group: group.vision_group,
      id_dependency: group.id_dependency,
      id_groupType: group.id_groupType,
      id_researchLine: lines
    };
  }
  doSubmit = async () => {
    await saveGroup(this.state.data);
    this.props.history.push("/grupos-investigacion");
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
      <Container maxWidth="xl">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Grupo"} />
        <h1>
          Grupo: <small>{data.acronym_group}</small>
        </h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={8}>
            <Paper style={classes.paper}>
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
          <Grid item xs={12} sm={5} md={4}>
            <Paper style={classes.paper}>
              <LinesGroup></LinesGroup>
            </Paper>
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

export default GroupForm;
