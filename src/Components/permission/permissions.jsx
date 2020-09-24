import React, { Component } from "react";
import PermissionsTable from './permissionsTable';
import { getPermissions } from '../../services/permissionService';
import { Container } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Breadcum from "../common/breadcum";
import Loading from '../common/loading';

class Permission extends Component {
  state = {
    permissions: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: permissions } = await getPermissions();
    this.setState({ permissions, isLoading: false });
  }

  getPermission(id) {
    return this.state.permissions.find((p) => p.id === id);
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
      <Container maxWidth="lg" id="roles">
        <Loading open={this.state.isLoading} />
        <Breadcum onListBreadcrumbs={listBreadcrumbs} lastLabel={"Permisos"} />
        <PermissionsTable
          datas={this.state.permissions}
          onGetPermission={this.getPermission}
          style={classes.table}
        />
      </Container>
    );
  }
}

export default withSnackbar(Permission);
