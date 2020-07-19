import React, { Component } from "react";
import DependenciesTable from "./dependeniesTable";
import { getDependencies } from "../../services/dependencyService";
import { Container } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Breadcum from "../common/breadcum";

class Dependencies extends Component {
  state = {
    dependencies: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: dependencies } = await getDependencies();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];

    this.setState({ dependencies, isLoading: false });
  }

  getDependency(id) {
    return this.state.dependencies.find((d) => d.id_group === id);
  }

  render() {
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
    ];
    const classes = {
      table: {
        padding: "2em",
        color: "secondary",
      },
    };
    return (
      <Container maxWidth="xl">
        <Breadcum
          onListBreadcrumbs={listBreadcrumbs}
          lastLabel={"Dependencias"}
        />
        <DependenciesTable
          datas={this.state.dependencies}
          onGetGroup={this.getDependency}
          onLoading={this.state.isLoading}
          style={classes.table}
        />
      </Container>
    );
  }
}

export default withSnackbar(Dependencies);
