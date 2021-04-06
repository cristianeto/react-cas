import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import Panel from "../common/panel";

import { getDependencies } from "../../services/dependencyService";
import { getGroupTypes } from "../../services/groupTypeService";
import { getGroup, saveGroup } from "../../services/groupService";
import { getLines } from "../../services/lineService";
import { Container, Paper, Grid } from "@material-ui/core";
import { getPrograms } from "../../services/programService";
import TitleComponent from "../common/titleComponent";
import Loading from '../common/loading';
import {getGroupMembers} from "../../services/groupMemberService";
import GroupMembers from "./groupMembers";

class GroupForm extends Form {
  state = {
    data: {
      acronym: "",
      code: "",
      name: "",
      mission: "",
      vision: "",
      dependency_id: "",
      lines: [],
      programs: [],
      group_type_id: "",
    },
    dependencies: [],
    groupTypes: [],
    lines: [],
    programs: [],
    members: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    id: Joi.string(),
    code: Joi.string().label("Código").max(10),
    acronym: Joi.string().alphanum().label("Siglas").max(10),
    name: Joi.string().label("Nombre"),
    mission: Joi.string().max(500).label("Misión"),
    vision: Joi.string().max(500).label("Visión"),
    dependency_id: Joi.number().integer().label("Dependencia"),
    group_type_id: Joi.number().integer().label("Tipo"),
    lines: Joi.array().label("Líneas").min(1),
    programs: Joi.array().label("Programas").min(1),
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

  async populateMembers() {
    const groupId = this.state.data.id;
    const { data: members } = await getGroupMembers(groupId);
    this.setState({ members });
  }

  async populateGroup() {
    try {
      const groupId = this.props.match.params.id; //Pasando por URL id movie
      if (groupId === "new") return; //Si si
      const { data: group } = await getGroup(groupId); //Si no.
      this.setState({ data: this.mapToViewModel(group) });
      await this.populateMembers();
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
    return {
      id: group.id,
      code: group.code,
      acronym: group.acronym,
      name: group.name,
      mission: group.mission,
      vision: group.vision,
      dependency_id: group.dependency_id,
      group_type_id: group.group_type_id,
      lines: group.lines,
      programs: group.programs,
    };
  }

  doSubmit = async () => {
    try {
      await saveGroup(this.state.data);
      this.successMessage();
      this.props.history.push("/grupos-investigacion");
    } catch (ex) {
      this.errorMessage(ex);
      const errors = { ...this.state.errors };
      if (ex.response && ex.response.status === 422) {
        errors.code = ex.response.data.errors.code;
        errors.name = ex.response.data.errors.name;
        errors.acronym = ex.response.data.errors.acronym;
        this.setState({ errors });
      }
      //console.log(ex.response.data.errors);
    }
  };

  render() {
    const { isLoading, dependencies, lines, programs, groupTypes, data, members } = this.state;
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
    return (
      <Container maxWidth="lg">
        <Loading open={isLoading} />
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Grupo"} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={8}>
            <Paper className="paper" >
              <TitleComponent entity={"Grupo"} />
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("code", "Código")}
                {this.renderInput("acronym", "Siglas")}
                {this.renderInput("name", "Nombre")}
                {this.renderTextarea("mission", "Misión")}
                {this.renderTextarea("vision", "Visión")}
                {this.renderSelect(
                  "dependency_id",
                  "Facultad",
                  75,
                  "id",
                  "name",
                  dependencies
                )}
                {this.renderMultiSelect(
                  "lines",
                  "Líneas de investigación",
                  "id",
                  "name",
                  lines
                )}
                {this.renderMultiSelect(
                  "programs",
                  "Programas",
                  "id",
                  "name",
                  programs
                )}
                {this.renderSelect(
                  "group_type_id",
                  "Tipo Grupo",
                  115,
                  "id",
                  "name",
                  groupTypes
                )}
                {this.renderButton("Guardar")}
              </form>
            </Paper>
          </Grid>
          <Grid container item xs={12} sm={5} md={4} spacing={3}>
            <Grid item xs={12} sm={12}>
              <Paper className="paper">
                <Panel
                  id="id"
                  property="name"
                  title="Líneas de Investigación"
                  data={this.state.data["lines"]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper className="paper">
                <Panel
                  id="id"
                  property="name"
                  title="Programas"
                  data={this.state.data["programs"]}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              {this.props.match.params.id !== 'new' &&(<GroupMembers title="Miembros" groupId={data.id} data={members} />)}
            </Grid>
          </Grid>          
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(GroupForm);
