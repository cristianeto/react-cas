import React, { Component } from "react";
import axios from "axios";
import GroupsTable from "./groupsTable";

import { Container } from "@material-ui/core";

class ResearchGroups extends Component {
  state = {
    groups: []
  };

  async componentDidMount() {
    const res = await axios.get(
      `http://localhost/proyectosinvestigacion/public/api/group`
    );
    const groups = res.data;
    this.setState({ groups });
    console.log("grupos", groups);
  }

  getGroup(id) {
    return this.state.groups.find(g => g.id_group === id);
  }

  render() {
    return (
      <main>
        <Container maxWidth="xl">
          <h1>Grupos de Investigación</h1>
          <GroupsTable datas={this.state.groups} onGetGroup={this.getGroup} />
        </Container>
      </main>
    );
  }
}

export default ResearchGroups;
