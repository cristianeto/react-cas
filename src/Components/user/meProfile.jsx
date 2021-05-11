import React from 'react';
import { withSnackbar } from 'notistack';
import Breadcrumb from '../common/breadcum';
import Form from '../common/form';
import { getUser } from '../../services/userService';
import auth from '../../auth/authService';
import {
  Container,
  Paper,
  Grid,
  Chip,
  Divider,
  Button,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Avatar from '@material-ui/core/Avatar';
import img_avatar from '../../static/img/img_avatar.png';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import './user.scss';
import TitleComponent from '../common/titleComponent';
import Loading from '../common/loading';

class meProfile extends Form {
  state = {
    data: {
      identification_card: '',
      name: '',
      lastname: '',
      fullname: '',
      email: '',
      roles: [],
      projects: [],
      groups: [],
      permissions: [],
      selectedRole: '',
    },
    errors: {},
    isLoading: false,
  };

  async populateUser() {
    try {
      const currentUser = auth.getCurrentUser();
      const { data: user } = await getUser(currentUser.id); //Si no.
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateUser();
    this.setState({ isLoading: false });
  }

  mapToViewModel(user) {
    return {
      id: user.id,
      identification_card: user.identification_card,
      name: user.name,
      lastname: user.lastname,
      fullname: user.fullname,
      email: user.email,
      roles: user.roles,
      projects: user.projects,
      groups: user.groups,
      permissions: user.permissions,
      selectedRole: auth.getSelectedRole().id,
    };
  }

  render() {
    const listBreadcrumbs = [
      {
        path: '/',
        label: 'Inicio',
      },
    ];

    const classes = {
      navLink: {
        color: 'inherit',
        textDecoration: 'none',
      },
    };
    const { data, isLoading } = this.state;
    return (
      <Container maxWidth='xl' id='user'>
        <Loading open={isLoading} />
        <Breadcrumb
          onListBreadcrumbs={listBreadcrumbs}
          lastLabel={'Mi perfil'}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} xl={3}>
            <Paper className='paper main-paper'>
              <div className='main-paper__content'>
                <div className='main-paper__content_avatar'>
                  <Avatar
                    alt={data.fullname}
                    src={img_avatar}
                    className='img'
                  />
                </div>
                <div className='main-paper__content_name'>{data.name}</div>
              </div>
              <List
                component='nav'
                aria-label='roles'
                className='main-paper__data'
              >
                <ListItem className='data__roles'>
                  {data.roles.map((role) =>
                    data.selectedRole === role.id ? (
                      <Chip
                        label={role.display_name}
                        key={role.id}
                        color='primary'
                        style={{ margin: '0.25em' }}
                      />
                    ) : (
                      <Chip
                        label={role.display_name}
                        key={role.id}
                        style={{ marginRight: '0.5em' }}
                      />
                    )
                  )}
                </ListItem>
                <ListItem divider>
                  <ListItemText primary='Cantidad de proyectos:' />
                  <Chip label={data.projects.length} color='primary' />
                </ListItem>
                <ListItem divider>
                  <ListItemText
                    primary='Cédula:'
                    secondary={data.identification_card}
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary='Nombre:' secondary={data.fullname} />
                </ListItem>
                <ListItem>
                  <ListItemText primary='E-mail:' secondary={data.email} />
                </ListItem>
                <Link to={`/usuario/${data.id}`} className='link'>
                  <Button
                    variant='contained'
                    color='primary'
                    className='btn btn-guardar '
                  >
                    Editar
                  </Button>
                </Link>
              </List>
            </Paper>
          </Grid>
          <Grid container item xs={12} sm={12} md={8} xl={9}>
            <Grid item xs={12}>
              <Paper className='paper'>
                <TitleComponent entity={'Proyectos'} />
                <Divider />
                <div className={classes.demo}>
                  <List dense={true}>
                    {data.projects.length > 0 ? (
                      data.projects.map((project) => (
                        <ListItem divider key={project.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <React.Fragment>
                                <Link
                                  to={'/proyecto/' + project.slug}
                                  style={classes.navLink}
                                >
                                  {project.name}
                                </Link>
                              </React.Fragment>
                            }
                            secondary={
                              <React.Fragment>
                                <Tooltip title={project.updated_at}>
                                  <span variant='caption'>
                                    Última actualización:{' '}
                                    {project.human_updated_at}
                                  </span>
                                </Tooltip>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary={'No existen proyectos'} />
                      </ListItem>
                    )}
                  </List>
                </div>
              </Paper>
              <Paper className='paper'>
                <TitleComponent entity={'Grupos'} />
                <Divider />
                <div className={classes.demo}>
                  <List dense={true}>
                    {data.groups.length > 0 ? (
                      data.groups.map((group) => (
                        <ListItem divider key={group.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <React.Fragment>
                                <Link
                                  to={'/grupo/' + group.slug}
                                  style={classes.navLink}
                                >
                                  Grupo 1
                                </Link>
                              </React.Fragment>
                            }
                            secondary={
                              <React.Fragment>
                                <Tooltip title={group.updated_at}>
                                  <span variant='caption'>INVESTIGADOR</span>
                                </Tooltip>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText
                          primary={'No existen grupos asociados a tu perfil'}
                        />
                      </ListItem>
                    )}
                  </List>
                </div>
              </Paper>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={6} xl={6}>
                <Paper className='paper'>
                  <TitleComponent entity={'Roles'} isLoading={isLoading} />
                  <Divider />
                  <div className={classes.demo}>
                    <List dense={true}>
                      {data.roles.length > 0 ? (
                        data.roles.map((role) => (
                          <ListItem divider key={role.id}>
                            <ListItemText
                              primary={role.display_name}
                              secondary={
                                role.permissions.length > 0 && (
                                  <React.Fragment>
                                    <span variant='caption'>
                                      Permisos:{' '}
                                      {role.permissions
                                        .map((p) => p.display_name)
                                        .join(', ')}
                                    </span>
                                  </React.Fragment>
                                )
                              }
                            />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText
                            primary={'No tienes asignado un role'}
                          />
                        </ListItem>
                      )}
                    </List>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={6} xl={6}>
                <Paper className='paper'>
                  <TitleComponent
                    entity={'Permisos extra'}
                    isLoading={isLoading}
                  />
                  <Divider />
                  <div className={classes.demo}>
                    <List dense={true}>
                      {data.permissions.length > 0 ? (
                        data.permissions.map((permission) => (
                          <ListItem divider key={permission.id}>
                            <ListItemText primary={permission.display_name} />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary={'No tienes permisos extra'} />
                        </ListItem>
                      )}
                    </List>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/*      <Grid container item xs={12} sm={12} md={4} xl={3}>
            
          </Grid> */}
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(meProfile);
