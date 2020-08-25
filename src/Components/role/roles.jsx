import React, { Component } from "react";
import RolesTable from "./rolesTable";
import { getRoles } from "../../services/roleService";
import { Container } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Breadcum from "../common/breadcum";

class Roles extends Component {
  state = {
    roles: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: roles } = await getRoles();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];

    this.setState({ roles, isLoading: false });
  }

  getRole(id) {
    return this.state.roles.find((u) => u.id === id);
  }

  handleDelete = async (roleId) => {
    const originalRoles = this.state.roles;
    const roleToRemove = this.getRole(roleId);
    const roles = originalRoles.filter(role => role !== roleToRemove);
    this.setState({ roles });
    try {
      //await deleteRole(roleToRemove.id);
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
      this.setState({ roles: originalRoles });
    }
  };

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
      <Container maxWidth="lg" id="roles">
        <Breadcum onListBreadcrumbs={listBreadcrumbs} lastLabel={"Usuarios"} />
        <RolesTable
          datas={this.state.roles}
          onGetRole={this.getRole}
          onLoading={this.state.isLoading}
          style={classes.table}
          onDelete={this.handleDelete}
        />
      </Container>
    );
  }
}

export default withSnackbar(Roles);
