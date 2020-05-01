import React, { Component, Fragment } from "react";
import UsersTable from "./usersTable";
import { getUsers, deleteUser } from "../services/userService";
import { Container, Button } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Breadcum from "./breadcum";

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

  handleUndo(usersToDelete, originalUsers) {
    const action = (key) => (
      <Fragment>
        <Button
          onClick={() => {
            //this.setState({ projects: originalProjects });
            this.props.closeSnackbar(key);
          }}
          style={{ color: "#fff" }}
        >
          ACEPTAR
        </Button>
      </Fragment>
    );
    const lenghtArray = usersToDelete.length;
    const mensaje =
      lenghtArray === 1
        ? `Usuario eliminado`
        : `${lenghtArray} usuarios eliminados`;
    this.props.enqueueSnackbar(mensaje, {
      autoHideDuration: 3000,
      action,
    });
  }

  handleDelete = async (usersToDelete) => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter((user) => !usersToDelete.includes(user));
    this.setState({ users });
    this.handleUndo(usersToDelete, originalUsers);
    try {
      usersToDelete.forEach(async (user) => {
        await deleteUser(user.id);
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.enqueueSnackbar(`Se produjo un error. ${ex}`, {
          variant: "error",
        });
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
      <main>
        <Container maxWidth="xl">
          <Breadcum
            onListBreadcrumbs={listBreadcrumbs}
            lastLabel={"Usuarios"}
          />
          <UsersTable
            datas={this.state.users}
            onGetUser={this.getUser}
            onLoading={this.state.isLoading}
            style={classes.table}
            onDelete={this.handleDelete}
          />
        </Container>
      </main>
    );
  }
}

export default withSnackbar(Users);
