import React, { Component } from "react";
import { getDependencies } from "../services/dependencyService";
import { getGroups } from "../services/groupService";
import GroupsTable from "./groupsTable";
import ButtonAdd from "./common/buttonAdd";
import { Container } from "@material-ui/core";

class Groups extends Component {
  state = {
    groups: [],
    dependencies: []
  };

  async componentDidMount() {
    const { data: dependencies } = await getDependencies();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];
    const { data: groups } = await getGroups();

    this.setState({ groups, dependencies });
  }

  getGroup(id) {
    return this.state.groups.find(g => g.id_group === id);
  }

  render() {
    return (
      <main>
        <Container maxWidth="xl">
          <h1>
            Grupos de Investigación <ButtonAdd entity={"grupo"} />
          </h1>
          <GroupsTable datas={this.state.groups} onGetGroup={this.getGroup} />
        </Container>
      </main>
    );
  }
}

export default Groups;
