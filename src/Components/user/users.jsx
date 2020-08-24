import React, { Component } from "react";
import UsersTable from "./usersTable";
import { getUsers, deleteUser } from "../../services/userService";
import { Container } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Breadcum from "../common/breadcum";

class Users extends Component {
  state = {
    users: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: users } = await getUsers();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];

    this.setState({ users, isLoading: false });
  }

  getUser(id) {
    return this.state.users.find((u) => u.id === id);
  }

  handleDelete = async (userId) => {
    const originalUsers = this.state.users;
    const userToRemove = this.getUser(userId);
    const users = originalUsers.filter(user => user !== userToRemove);
    this.setState({ users });
    try {
      await deleteUser(userToRemove.id);
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
      this.setState({ users: originalUsers });
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
      <Container maxWidth="xl">
        <Breadcum onListBreadcrumbs={listBreadcrumbs} lastLabel={"Usuarios"} />
        <UsersTable
          datas={this.state.users}
          onGetUser={this.getUser}
          onLoading={this.state.isLoading}
          style={classes.table}
          onDelete={this.handleDelete}
        />
      </Container>
    );
  }
}

export default withSnackbar(Users);
