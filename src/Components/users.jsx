import React, { Component } from "react";
import UsersTable from "./usersTable";
import { getUsers } from "../services/userService";
import { Container } from "@material-ui/core";
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
          />
        </Container>
      </main>
    );
  }
}

export default withSnackbar(Users);
