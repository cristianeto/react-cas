import React from "react";
import Breadcrumb from "./breadcum";
import Form from "./common/form";
import { getDependencies } from "../services/dependencyService";
import { getGroup, saveGroup } from "../services/groupService";
import { Container } from "@material-ui/core";

class GroupForm extends Form {
  state = {
    data: {
      acronym_group: "",
      active_group: "1",
      code_group: "",
      created_at: "",
      id_dependency: "",
      id_group: "",
      id_groupType: "",
      id_researchCenter: "",
      mission_group: "",
      name_group: "",
      updated_at: "",
      vision_group: ""
    },
    dependencies: []
    // errors: {}
  };

  async populateDependencies() {
    const { data: dependencies } = await getDependencies();
    this.setState({ dependencies });
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
    await this.populateGroup();
  }

  mapToViewModel(group) {
    return {
      acronym_group: group.acronym_group,
      active_group: group.active_group,
      code_group: group.code_group,
      created_at: group.created_at,
      id_dependency: group.id_dependency,
      id_group: group.id_group,
      id_groupType: group.id_groupType,
      id_researchCenter: group.id_researchCenter,
      mission_group: group.mission_group,
      name_group: group.name_group,
      updated_at: group.updated_at,
      vision_group: group.vision_group
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
            this.state.dependencies
          )}
          {this.renderButton("Guardar")}
        </form>
      </Container>
    );
  }
}

export default GroupForm;
