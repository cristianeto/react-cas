import React from "react";
import Joi from "@hapi/joi";
import {withSnackbar} from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import Panel from "../common/panel";

import {getDependencies} from "../../services/dependencyService";
import {getGroupTypes} from "../../services/groupTypeService";
import {getGroup, saveGroup} from "../../services/groupService";
import {getLines} from "../../services/lineService";
import {Container, Typography, Paper, Grid} from "@material-ui/core";
import {getPrograms} from "../../services/programService";
import TitleForm from "../common/titleForm";

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
    id_group: Joi.string(),
    code_group: Joi.string().label("Código").max(10),
    acronym_group: Joi.string().alphanum().label("Siglas").max(10),
    name_group: Joi.string().label("Nombre"),
    mission_group: Joi.string().label("Misión"),
    vision_group: Joi.string().label("Visión"),
    id_dependency: Joi.string().label("Dependencia"),
    id_groupType: Joi.number().label("Tipo"),
    id_researchLine: Joi.array().label("Líneas").min(1),
    id_program: Joi.array().label("Programas").min(1),
  });

  async populateDependencies() {
    const {data: dependencies} = await getDependencies();
    this.setState({dependencies});
  }

  async populateGroupTypes() {
    const {data: groupTypes} = await getGroupTypes();
    this.setState({groupTypes});
  }

  async populateLines() {
    const {data: lines} = await getLines();
    this.setState({lines});
  }

  async populatePrograms() {
    const {data: programs} = await getPrograms();
    this.setState({programs});
  }

  async populateGroup() {
    try {
      const groupId = this.props.match.params.id; //Pasando por URL id movie
      if (groupId === "new") return; //Si si
      const {data: group} = await getGroup(groupId); //Si no.
      this.setState({data: this.mapToViewModel(group)});
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    await this.populateDependencies();
    await this.populateGroupTypes();
    await this.populateGroup();
    await this.populateLines();
    await this.populatePrograms();
    this.setState({isLoading: false});
  }

  mapToViewModel(group) {
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
      this.successMessage();
      this.props.history.push("/grupos-investigacion");
    } catch (ex) {
      this.errorMessage(ex);
      const errors = {...this.state.errors};
      if(ex.response && ex.response.status === 422){
        errors.code_group = ex.response.data.errors.code_group;
        errors.name_group = ex.response.data.errors.name_group;
        errors.acronym_group = ex.response.data.errors.acronym_group;      
        this.setState({errors});
      }
      //console.log(ex.response.data.errors);
    }
  };

  render() {
    const {isLoading, dependencies, lines, programs, groupTypes} = this.state;
    // const optionsSelected = this.getLinesSelected();
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
          <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Grupo"}/>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7} md={8}>
              <Paper style={classes.paper}>
                <TitleForm entity={"Grupo"} isLoading={isLoading}/>
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
                      dependencies
                  )}
                  {this.renderMultiSelect(
                      "id_researchLine",
                      "Líneas de investigación",
                      "name_researchLine",
                      lines
                  )}
                  {this.renderMultiSelect(
                      "id_program",
                      "Programas",
                      "name_program",
                      programs
                  )}
                  {this.renderSelect(
                      "id_groupType",
                      "Tipo proyecto",
                      115,
                      "name_groupType",
                      groupTypes
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
                    Miembros
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
