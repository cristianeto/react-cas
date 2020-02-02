import React from "react";
import Joi from "@hapi/joi";
import Breadcrumb from "./breadcum";
import Form from "./common/form";
import { getDependencies } from "../services/dependencyService";
import { getGroupTypes } from "../services/groupTypeService";
import { getGroup, saveGroup } from "../services/groupService";
import { Container } from "@material-ui/core";

class GroupForm extends Form {
  state = {
    data: {
      acronym_group: "",
      code_group: "",
      name_group: "",
      mission_group: "",
      vision_group: "",
      id_dependency: "",
      id_groupType: ""
    },
    dependencies: [],
    groupTypes: [],
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
    name_group: Joi.string(),
    mission_group: Joi.string(),
    vision_group: Joi.string(),
    id_dependency: Joi.number(),
    id_groupType: Joi.number()
  });

  async populateDependencies() {
    const { data: dependencies } = await getDependencies();
    this.setState({ dependencies });
  }
  async populateGroupTypes() {
    const { data: groupTypes } = await getGroupTypes();
    this.setState({ groupTypes });
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
    await this.populateDependencies();
    await this.populateGroupTypes();
    await this.populateGroup();
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
      id_groupType: group.id_groupType
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
    return (
      <Container maxWidth="xl">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Grupo"} />
        <h1>
          Grupo: <small>{data.acronym_group}</small>
        </h1>
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
          {this.renderSelect(
            "id_groupType",
            "Tipo",
            "name_groupType",
            this.state.groupTypes
          )}
          {this.renderButton("Guardar")}
        </form>
      </Container>
    );
  }
}

export default GroupForm;
