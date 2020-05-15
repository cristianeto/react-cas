import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { withSnackbar } from "notistack";
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
import { getRolesByUser } from "./services/userRolesService";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      roles: [
        { role_id: 1, role_name: "admin" },
        { role_id: 2, role_name: "user" },
      ],
      selectedRole: {},
    };
  }

  async componentDidMount() {
    try {
      if (!cas.getLogin()) {
        cas.saveTicket();
        await cas.getTicketCAS();
      }
      const user = auth.getCurrentUser();
      if (cas.isAuthenticated() && cas.getLogin() && !auth.isAuthenticated()) {
        await auth.login(user);
      }
      this.setState({ user });
      if (auth.isAuthenticated()) {
        const userId = sessionStorage.getItem("id");
        const { data: roles } = await getRolesByUser(userId);
        this.setState({ roles });
      } else {
        console.log("Usuario no autenticado en el Backend");
      }
    } catch (ex) {
      console.log(ex);
      this.props.enqueueSnackbar(`Se produjo un error. ${ex}`, {
        variant: "error",
      });
    }
  }

  handleLogin() {
    try {
      cas.redirect();
    } catch (err) {
      if (err.error !== "login_required") console.log("error: " + err);
    }
  }
  handleLogout = () => {
    cas.logout();
  };
  handleChangeRole = (role) => {
    console.info(role);
  };
  render() {
    const { user, roles } = this.state;
    return (
      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <NavBar
          user={user}
          roles={roles}
          onLogin={this.handleLogin}
          onChangeRole={this.handleChangeRole}
          onLogout={this.handleLogout}
        />
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
    );
  }
}
export default withSnackbar(App);
