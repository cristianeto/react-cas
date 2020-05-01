import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { CasClient } from "./CasClient/CasClient";
import NavBar from "./Components/navBar";
import NotFound from "./Components/notFound";
import Groups from "./Components/groups";
import GroupForm from "./Components/groupForm";
import ProjectForm from "./Components/projectForm";
import UserForm from "./Components/userForm";
import Welcome from "./Components/welcome";
import Users from "./Components/users";
import Projects from "./Components/projects";
import Dependencies from "./Components/dependencies";
import DependencyForm from "./Components/dependencyForm";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    //if (this.props.location.pathname === '/callback') return;
    /*  let ClientCAS = new CasClient();
    try {
      if (!ClientCAS.getLogin()) {
        ClientCAS.saveTicket();
        await ClientCAS.verificaLogin().then();
      }
      console.log("Pasando...");

      if (ClientCAS.isAuthenticated() && ClientCAS.getLogin()) {
        this.ObtenerDatosCentralizada();
      }
      //this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log("error: " + err);
    } */

    const user = null;
    /* const user = {
      name: "Cristian",
      apellido: "Guaman",
    }; */
    this.setState({ user });

    let ClientCAS = new CasClient();
    try {
      if (!ClientCAS.getLogin()) {
        ClientCAS.saveTicket();
        // this.handleLogin(ClientCAS);
        await ClientCAS.validateLogin().then();
      }
    } catch (error) {}
  }

  async handleLogin(ClientCAS) {
    console.log("click");
    let ClientCAS2 = new CasClient();
    try {
      await ClientCAS2.verificaLogin().then();
      console.log("Pasando...");

      /*  if (ClientCAS.isAuthenticated() && ClientCAS.getLogin()) {
        this.ObtenerDatosCentralizada();
      } */
      //this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log("error: " + err);
    }
  }
  render() {
    const { user } = this.state;
    return (
      <SnackbarProvider maxSnack={3}>
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
          <NavBar user={user} onLogin={this.handleLogin} />
          <Switch>
            {/* <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} /> */}
            <Route path="/proyecto/:id" component={ProjectForm} />
            <Route path="/proyectos" component={Projects} />
            <Route path="/usuario/:id" component={UserForm} />
            <Route path="/usuarios" component={Users} />
            <Route path="/" exact component={Welcome} />
            <Route path="/dependencias" component={Dependencies} />
            <Route path="/dependencia/:id" component={DependencyForm} />
            <Route path="/grupos-investigacion" component={Groups} />
            <Route path="/grupo/:id" component={GroupForm} />
            <Route path="/not-found" component={NotFound} />
            {/* <Redirect from="/" exact to="/" /> */}
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </SnackbarProvider>
    );
  }
}
