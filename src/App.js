import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
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
import Logout from "./Components/logout";
import cas from "./services/casService";
import auth from "./services/authService";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      if (!cas.getLogin()) {
        cas.saveTicket();
        await cas.getTicketCAS();
      }
      const user = cas.getLogin();
      this.setState({ user });
      if (auth.getPassport() === "") auth.login(user);
    } catch (error) {
      alert(error);
    }
  }

  handleLogin() {
    try {
      cas.redirect();
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
            <Route path="/logout" exact component={Logout} />
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
