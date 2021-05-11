import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import cas from './auth/casService';
import auth from './auth/authService';
import NavBar from './Components/navBar';
import NotFound from './Components/error/notFound';
import NotAuthorized from './Components/error/notAuthorized';
import Groups from './Components/group/groups';
import GroupForm from './Components/group/groupForm';
import Users from './Components/user/users';
import UserAddForm from './Components/user/userAddForm';
import UserUpdateForm from './Components/user/userUpdateForm';
import MeProfile from './Components/user/meProfile';
import Roles from './Components/role/roles';
import RoleForm from './Components/role/roleForm';
import Pemissions from './Components/permission/permissions';
import PemissionForm from './Components/permission/permissionForm';
import Welcome from './Components/welcome';
import Projects from './Components/project/projects';
import ProjectMain from './Components/project/projectMain';
import Members from './Components/project/member/members';
import GroupMembersForm from './Components/group/member/groupMembersForm';
import Dependencies from './Components/dependency/dependencies';
import DependencyForm from './Components/dependency/dependencyForm';
import Logout from './Components/logout';
import LoginScreen from './login/LoginScreen';

import './App.scss';

const App = () => {
  const [emailCas, setEmailCas] = useState(cas.getLogin());
  const [user, setUser] = useState(auth.getCurrentUser());
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [keyLostConection, setKeyLostConection] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    tryLogin();
  }, []);

  const tryLogin = async () => {
    try {
      if (!emailCas) {
        cas.saveTicket();
        await cas.getTicketCAS();
      }
      if (cas.isAuthenticated() && cas.getLogin() && !auth.isAuthenticated()) {
        console.log('logueando al backend');
        const user = await auth.login(cas.getLogin());
        setUser(user);
        setEmailCas(cas.getLogin());
      }

      if (auth.getCurrentUser()) {
        const user = auth.getCurrentUser();
        getRolesByUser(user);
      }

      const key = detectedOffline();
      detectedOnLine(key);
    } catch (ex) {
      console.log(ex);
      enqueueSnackbar(`Se produjo un error. ${ex}`, {
        variant: 'error',
      });
    }
  };

  const getRolesByUser = (user) => {
    const { roles } = user;
    const selectedRole = auth.getSelectedRole();
    setRoles(roles);
    setSelectedRole(selectedRole);
  };
  const handleLogin = () => {
    try {
      cas.redirect();
    } catch (err) {
      if (err.error !== 'login_required') console.log('error: ' + err);
    }
  };
  const handleLogout = () => {
    auth.logout();
    cas.logout();
  };

  const handleChangeRole = (roleId, closeFunction) => {
    closeFunction();
    const role = roles.find((role) => role.id === roleId);
    setSelectedRole(role);
    auth.setSelectedRole(role);
    //enqueueSnackbar(`Su role cambio a ${role.name} `);
  };

  const detectedOffline = () => {
    //const isOnline = window.navigator.onLine;
    window.onoffline = (event) => {
      const keyLostConection = enqueueSnackbar('Estás sin conexión', {
        variant: 'error',
        persist: true,
      });
      setKeyLostConection(keyLostConection);
    };
  };
  const detectedOnLine = (key) => {
    window.ononline = (event) => {
      closeSnackbar(key);
      enqueueSnackbar('Estás de regreso!', {
        variant: 'success',
      });
    };
  };

  // const { user, roles } = state;

  return (
    <React.Fragment>
      {user !== null ? (
        <div
          style={{
            display: 'flex',
          }}
          className='app'
        >
          <NavBar
            user={user}
            roles={roles}
            onLogin={handleLogin}
            onChangeRole={handleChangeRole}
            onLogout={handleLogout}
            selectedRole={selectedRole}
          />

          <Switch>
            {/* <Route path="/login" component={LoginForm} />
                <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} /> */}
            <Route path='/' exact component={Welcome} />
            <Route path='/proyecto/:slug/miembros' exact component={Members} />
            <Route path='/proyecto/:slug' exact component={ProjectMain} />
            <Route path='/proyectos' exact component={Projects} />
            <Route
              path='/grupo/:id/miembros'
              exact
              component={GroupMembersForm}
            />
            <Route path='/grupos-investigacion' component={Groups} />
            <Route path='/grupo/:id' component={GroupForm} />

            <Route path='/mi/perfil' component={MeProfile} />

            <Route path='/usuario/new' component={UserAddForm} />
            <Route path='/usuario/:id' component={UserUpdateForm} />
            <Route path='/registrar/:id' component={UserAddForm} />
            {selectedRole.id === 1 && (
              <React.Fragment>
                <Route path='/dependencias' exact component={Dependencies} />
                <Route path='/dependencia/:id' component={DependencyForm} />
                <Route path='/usuarios' exact component={Users} />
                <Route path='/roles' exact component={Roles} />
                <Route path='/role/:id' component={RoleForm} />
                <Route path='/permisos' exact component={Pemissions} />
                <Route path='/permiso/:id' exact component={PemissionForm} />
              </React.Fragment>
            )}

            <Route path='/logout' component={Logout} />
            <Route path='/not-found' component={NotFound} />
            <Route path='/not-authorized' component={NotAuthorized} />
            {/* <Redirect from="/" exact to="/" /> */}
            <Redirect to='/not-found' />
            <Redirect to='/not-authorized' />
          </Switch>
        </div>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </React.Fragment>
  );
};
export default App;
