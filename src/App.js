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
      emailCas: cas.getLogin(),
      user: auth.getCurrentUser(),
      roles: [],
      selectedRole: "",
    };
  }

  async componentDidMount() {
    try {
      if (!cas.getLogin()) {
        cas.saveTicket();
        await cas.getTicketCAS();
      }
      const emailCas = cas.getLogin();
      if (cas.isAuthenticated() && cas.getLogin() && !auth.isAuthenticated()) {
        console.log("logueando al backend");
        const user = await auth.login(emailCas);
        this.setState({ user });
      }
      this.setState({ emailCas });
      if (auth.isAuthenticated()) {
        const { data: roles } = await getRolesByUser(this.state.user.id);
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

  handleChangeRole = (roleId) => {
    const role = this.state.roles.find((role) => role.id_role === roleId);
    this.setState({ selectedRole: role });
    this.props.enqueueSnackbar(`Su role cambio a ${role.name_role} `, {
      variant: "info",
    });
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
          selectedRole={this.state.selectedRole}
        />
        <Switch>
          {/* <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} /> */}
          <Route path="/proyecto/:id" component={ProjectForm} />
          <Route path="/proyectos" component={Projects} />
          <Route path="/usuario/:id" component={UserForm} />
          {this.state.selectedRole.id_role === 1 && (
            <Route path="/usuarios" component={Users} />
          )}
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
