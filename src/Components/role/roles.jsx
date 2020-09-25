import React, { Component } from "react";
import RolesTable from "./rolesTable";
import { getRoles, deleteRole } from "../../services/roleService";
import { Container } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Breadcum from "../common/breadcum";
import Loading from '../common/loading';

class Roles extends Component {
  state = {
    roles: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: roles } = await getRoles();
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
      await deleteRole(roleToRemove.id);
      this.props.enqueueSnackbar(`Registro eliminado!`, {
        variant: 'success'
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.enqueueSnackbar(`${ex.response.data.message}`, {
          variant: "error"
        });
      } else if (ex.response.status === 403) {
        console.log(ex);
        this.props.enqueueSnackbar(`${ex.response.data.message}`, {
          variant: "error"
        });
      }
      this.setState({ roles: originalRoles });
    }
  };

  render() {
    const { isLoading, roles } = this.state;
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
        <Loading open={isLoading} />
        <Breadcum onListBreadcrumbs={listBreadcrumbs} lastLabel={"Roles"} />
        <RolesTable
          datas={roles}
          onGetRole={this.getRole}
          style={classes.table}
          onDelete={this.handleDelete}
        />
      </Container>
    );
  }
}

export default withSnackbar(Roles);
