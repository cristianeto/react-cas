import React, { Component } from "react";
import DependenciesTable from "./dependeniesTable";
import { getDependencies, deleteDependency } from "../../services/dependencyService";
import { Container } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Breadcum from "../common/breadcum";
import Loading from "../common/loading";

class Dependencies extends Component {
  state = {
    dependencies: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: dependencies } = await getDependencies();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];
    console.log(dependencies);
    this.setState({ dependencies, isLoading: false });
  }

  getDependency(id) {
    return this.state.dependencies.find((d) => d.id === id);
  }

  handleDelete = async (dependencyId) => {
    const originalDependencies = this.state.dependencies;
    const dependencyToRemove = this.getDependency(dependencyId);
    const dependencies = originalDependencies.filter(dependency => dependency !== dependencyToRemove);
    this.setState({ dependencies });
    try {
      await deleteDependency(dependencyToRemove.id);
      this.props.enqueueSnackbar(`Registro eliminado!`, {
        variant: 'success'
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.enqueueSnackbar(`${ex.response.data.message}`, {
          variant: "error"
        });
      } else if (ex.response.status === 403) {
        this.props.enqueueSnackbar(`Operación no autorizada`, {
          variant: "error"
        });
      }
      this.setState({ dependencies: originalDependencies });
    }
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
        <Loading open={this.state.isLoading} />
        <Breadcum onListBreadcrumbs={listBreadcrumbs} lastLabel={"Dependencias"} />
        <DependenciesTable
          datas={this.state.dependencies}
          onGetGroup={this.getDependency}
          onDelete={this.handleDelete}
          style={classes.table}
        />
      </Container>
    );
  }
}

export default withSnackbar(Dependencies);
