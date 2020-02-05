import React, { Component } from "react";
import { getDependencies } from "../services/dependencyService";
import { getUsers } from "../services/userService";
import UsersTable from "./usersTable";
import { Container } from "@material-ui/core";

class Users extends Component {
  state = {
    users: [],
    dependencies: []
  };

  async componentDidMount() {
    const { data: dependencies } = await getDependencies();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];
    const { data: users } = await getUsers();

    this.setState({ users, dependencies });
  }

  getUser(id) {
    return this.state.users.find(g => g.id_person === id);
  }

  render() {
    return (
      <main>
        <Container maxWidth="xl">
          <h1>Usuarios</h1>
          <UsersTable datas={this.state.users} onGetUser={this.getUser} />
        </Container>
      </main>
    );
  }
}

export default Users;
