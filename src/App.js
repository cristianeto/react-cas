import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { withSnackbar } from "notistack";
import cas from "./services/casService";
import auth from "./services/authService";
import NavBar from "./Components/navBar";
import NotFound from "./Components/error/notFound";
import NotAuthorized from "./Components/error/notAuthorized";
import Groups from "./Components/group/groups";
import GroupForm from "./Components/group/groupForm";
import Users from "./Components/user/users";
import UserAddForm from "./Components/user/userAddForm";
import UserUpdateForm from "./Components/user/userUpdateForm";
import MeProfile from "./Components/user/meProfile";
import Roles from "./Components/role/roles";
import RoleForm from "./Components/role/roleForm";
import Pemissions from "./Components/permission/permissions";
import PemissionForm from "./Components/permission/permissionForm";
import Welcome from "./Components/welcome";
import MainPage from "./Components/home";
import Projects from "./Components/project/projects";
import ProjectMain from './Components/project/projectMain';
import Members from "./Components/project/member/members";
import GroupMembersForm from "./Components/group/member/groupMembersForm";
import Dependencies from "./Components/dependency/dependencies";
import DependencyForm from "./Components/dependency/dependencyForm";
import Logout from "./Components/logout";
import { getRolesByUser } from "./services/userRolesService";

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCas: cas.getLogin(),
      user: auth.getCurrentUser(),
      roles: [],
      selectedRole: "",
      keyLostConection: "",
    };
  }

  async componentDidMount() {
    try {
      if (!cas.getLogin()) {
        cas.saveTicket();
        await cas.getTicketCAS();
      }
      if (cas.isAuthenticated() && cas.getLogin() && !auth.isAuthenticated()) {
        console.log("logueando al backend");
        const user = await auth.login(cas.getLogin());
        this.setState({ user, emailCas: cas.getLogin() });
      }
      //console.log(this.state.user);
      this.getRoles();

      const key = this.detectedOffline();
      this.detectedOnLine(key);
    } catch (ex) {
      console.log(ex);
      this.props.enqueueSnackbar(`Se produjo un error. ${ex}`, {
        variant: "error",
      });
    }
  }

  async getRoles() {
    if (auth.isAuthenticated()) {
      const { data: roles } = await getRolesByUser(this.state.user.id);
      const selectedRole = auth.getSelectedRole();
      this.setState({ roles, selectedRole });
    } else {
      console.log("Usuario no autenticado en el Backend");
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
    auth.logout();
    cas.logout();
  };

  handleChangeRole = (roleId, closeFunction) => {
    closeFunction();
    const role = this.state.roles.find((role) => role.id === roleId);
    this.setState({ selectedRole: role });
    auth.setSelectedRole(role);
    //this.props.enqueueSnackbar(`Su role cambio a ${role.name} `);
  };

  detectedOffline() {
    //const isOnline = window.navigator.onLine;
    window.onoffline = (event) => {
      const keyLostConection = this.props.enqueueSnackbar(
        "Estás sin conexión",
        {
          variant: "error",
          persist: true,
        }
      );
      this.setState({ keyLostConection });
    };
  }
  detectedOnLine(key) {
    window.ononline = (event) => {
      this.props.closeSnackbar(key);
      this.props.enqueueSnackbar("Estás de regreso!", {
        variant: "success",
      });
    };
  }

  render() {
    const { user, roles } = this.state;
    return (
      <React.Fragment>
        {user !== null ?
          <div style={{
            display: 'flex',
          }} className="app">
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
              <Route path="/" exact component={Welcome} />
              <Route path="/proyecto/:slug/miembros" exact component={Members} />
              <Route path="/proyecto/:slug" exact component={ProjectMain} />
              <Route path="/proyectos" exact component={Projects} />
              <Route path="/grupo/:id/miembros" exact component={GroupMembersForm} />
              <Route path="/grupos-investigacion" component={Groups} />
              <Route path="/grupo/:id" component={GroupForm} />

              <Route path="/mi/perfil" component={MeProfile} />

              <Route path="/usuario/new" component={UserAddForm} />
              <Route path="/usuario/:id" component={UserUpdateForm} />
              <Route path="/registrar/:id" component={UserAddForm} />
              {this.state.selectedRole.id === 1 && (
                <React.Fragment>
                  <Route path="/dependencias" exact component={Dependencies} />
                  <Route path="/dependencia/:id" component={DependencyForm} />
                  <Route path="/usuarios" exact component={Users} />
                  <Route path="/roles" exact component={Roles} />
                  <Route path="/role/:id" component={RoleForm} />
                  <Route path="/permisos" exact component={Pemissions} />
                  <Route path="/permiso/:id" exact component={PemissionForm} />
                </React.Fragment>
              )}

              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/not-authorized" component={NotAuthorized} />
              {/* <Redirect from="/" exact to="/" /> */}
              <Redirect to="/not-found" />
              <Redirect to="/not-authorized" />
            </Switch>
          </div> :
          <MainPage onLogin={this.handleLogin} />
        }
      </React.Fragment>
    );
  }
}
export default withSnackbar(App);
