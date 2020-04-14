import React, { Component } from "react";
import GroupsTable from "./groupsTable";
import { getDependencies } from "../services/dependencyService";
import { getGroups, saveGroup } from "../services/groupService";
import ButtonAdd from "./common/buttonAdd";
import { Container, Typography } from "@material-ui/core";
import { withSnackbar } from "notistack";

class Groups extends Component {
  state = {
    groups: [],
    dependencies: [],
    isLoading: false
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: dependencies } = await getDependencies();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];
    const { data: groups } = await getGroups();

    this.setState({ groups, dependencies, isLoading: false });
  }

  getGroup(id) {
    return this.state.groups.find(g => g.id_group === id);
  }
  handleActive = async idGroup => {
    const originalGroups = this.state.groups;
    const group = this.getGroup(idGroup);
    const groups = [...this.state.groups];
    const index = groups.indexOf(group);
    groups[index] = { ...groups[index] };
    if (groups[index].active_group === 1) {
      groups[index].active_group = 0;
    } else if (groups[index].active_group === 0) {
      groups[index].active_group = 1;
    } else {
      groups[index].active_group = 3;
    }
    this.setState({ groups });
    // groups[index].active_group = !groups[index].active_group;
    try {
      await saveGroup(groups[index]);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      this.props.enqueueSnackbar(`Error al actualizar! ${ex}`, {
        variant: "error"
      });

      this.setState({ groups: originalGroups });
    }
  };

  render() {
    return (
      <main>
        <Container
          maxWidth="xl"
          style={{ backgroundColor: "#f5f5f5", paddingTop: "1em" }}
        >
          <Typography variant="h6" gutterBottom>
            Grupos de Investigación <ButtonAdd entity={"grupo"} />
          </Typography>
          <GroupsTable
            datas={this.state.groups}
            onGetGroup={this.getGroup}
            onLoading={this.state.isLoading}
            onActive={this.handleActive}
          />
        </Container>
      </main>
    );
  }
}

export default withSnackbar(Groups);
