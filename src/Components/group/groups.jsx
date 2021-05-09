import React, { Component, Fragment } from 'react';
import { withSnackbar } from 'notistack';
import Breadcum from '../common/breadcum';
import GroupsTable from './groupsTable';
import { getDependencies } from '../../services/dependencyService';
import { getGroups, saveGroup, deleteGroup } from '../../services/groupService';
import { Container, Button } from '@material-ui/core';

class Groups extends Component {
  state = {
    groups: [],
    dependencies: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: dependencies } = await getDependencies();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];
    const { data: groups } = await getGroups();

    this.setState({ groups, dependencies, isLoading: false });
  }

  getGroup(id) {
    return this.state.groups.find((g) => g.id === id);
  }
  handleActive = async (idGroup) => {
    const originalGroups = this.state.groups;
    const group = this.getGroup(idGroup);
    const groups = [...this.state.groups];
    const index = groups.indexOf(group);
    groups[index] = { ...groups[index] };
    if (groups[index].active === 1) {
      groups[index].active = 0;
    } else if (groups[index].active === 0) {
      groups[index].active = 1;
    } else {
      groups[index].active = 3;
    }
    this.setState({ groups });
    // groups[index].active = !groups[index].active_group;
    try {
      await saveGroup(groups[index]);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log('x');
      this.props.enqueueSnackbar(`${ex.response.data.message}`, {
        variant: 'error',
      });
      this.setState({ groups: originalGroups });
    }
  };

  handleUndo(groupsToDelete, originalGroups) {
    const action = (key) => (
      <Fragment>
        <Button
          onClick={() => {
            //this.setState({ groups: originalGroups });
            this.props.closeSnackbar(key);
          }}
          style={{ color: '#fff' }}
        >
          ACEPTAR
        </Button>
      </Fragment>
    );
    const lenghtArray = groupsToDelete.length;
    const mensaje =
      lenghtArray === 1
        ? `Registro eliminado`
        : `${lenghtArray} registros eliminados`;
    this.props.enqueueSnackbar(mensaje, {
      autoHideDuration: 3000,
      action,
      variant: 'success',
    });
  }

  handleDelete = async (groupsToDelete) => {
    const originalGroups = this.state.groups;
    const groups = originalGroups.filter(
      (group) => !groupsToDelete.includes(group)
    );
    this.setState({ groups });
    groupsToDelete.forEach(async (group) => {
      try {
        await deleteGroup(group.id);
        // this.handleUndo(groupsToDelete, originalGroups);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) console.log(ex);
        this.props.enqueueSnackbar(`${ex.response.data.message}`, {
          variant: 'error',
        });
        this.setState({ groups: originalGroups });
      }
    });
    this.handleUndo(groupsToDelete, originalGroups);
  };

  render() {
    const listBreadcrumbs = [
      {
        path: '/',
        label: 'Inicio',
      },
    ];
    const classes = {
      table: {
        padding: '2em',
        color: 'secondary',
      },
    };
    return (
      <Container maxWidth='xl'>
        <Breadcum onListBreadcrumbs={listBreadcrumbs} lastLabel={'Grupos'} />
        <GroupsTable
          datas={this.state.groups}
          //onGetGroup={this.getGroup}
          onLoading={this.state.isLoading}
          onActive={this.handleActive}
          style={classes.table}
          onDelete={this.handleDelete}
        />
      </Container>
    );
  }
}

export default withSnackbar(Groups);
