import React from "react";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import MembersTable from "./membersTable";
//import { getDependencies } from "../../services/dependencyService";
import { getUsers } from "../../services/userService";
import { getRoles } from "../../services/roleService";
import { getMembers, saveMember } from "../../services/memberService";
import { Container, Paper, Grid } from "@material-ui/core";
import TitleForm from '../common/titleForm';
import Joi from "@hapi/joi";
import { messages } from '../common/es_ES';
import Form from '../common/form';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

class Members extends Form {
  state = {
    data: [],
    users: [],
    roles: [],
    //dependencies: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    project_id: Joi.string().label("Proyecto").min(36).max(36).messages(messages),
    user_id: Joi.string().label("Miembro").min(36).max(36).messages(messages),
    role_id: Joi.string().label("Rol").min(36).max(36).messages(messages),
    users: Joi.array().label("Miembros").min(1).max(1).messages(messages),
  });

  getMember(project_id, user_id) {
    return this.state.data.find((member) => member.project_id === project_id && member.user_id === user_id);
  }

  handleChangeAutocompleteSelect = (event, newValues, nameInput, project_id, user_id) => {
    console.log(project_id, user_id);
    const member = this.getMember(project_id, user_id);
    const members = [...this.state.data];
    const index = members.indexOf(member);
    members[index].role = newValues;
    members[index].role_id = newValues.id;
    this.setState({ data: members });
    console.log(members[index]);
    this.doUpdate(members[index]);
  };

  async doUpdate(member) {
    await saveMember(member);
  }

  async populateUsers() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async populateRoles() {
    const { data: roles } = await getRoles();
    this.setState({ roles });
  }

  async populateMembers() {
    const projectId = this.props.match.params.id
    const { data: members } = await getMembers(projectId);
    this.setState({ data: this.mapToViewModel(members) });
    //this.setState({ members });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateUsers();
    await this.populateRoles();
    await this.populateMembers();
    this.setState({ isLoading: false });
  }
  mapToViewModel(members) {

    return members;
  }
  render() {
    const { isLoading, users } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/proyectos",
        label: "Proyectos",
      },
      {
        path: "/proyecto/" + this.props.match.params.id,
        label: this.props.match.params.id
      },
      {
        path: "miembros",
        label: "Miembros"
      }
    ];
    const classes = {
      paper: {
        padding: "2em",
        color: "secondary",
        marginBottom: '2em',
      },
      table: {
        padding: "2em",
        color: "secondary",
      },
    };
    return (
      <React.Fragment>
        <Container maxWidth="lg">
          <Breadcrumb
            onListBreadcrumbs={listBreadcrumbs}
            lastLabel={"Proyecto"}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={10} md={10} lg={4}>
              <Paper style={classes.paper}>
                <TitleForm entity={"Agregar miembros del proyecto"} isLoading={isLoading} />
                <form >
                  {this.renderMultiSelect("users", "Miembros de Spirit", "id", "fullname", users)}
                  <Autocomplete
                    id={'id-custom-box2'}
                    name={'role'}
                    options={this.state.roles}
                    getOptionLabel={(role) => role.name
                    }
                    style={{ width: 300 }}
                    //inputValue={value.name}
                    onChange={(event, newValue) => this.handleChangeAutocompleteSelect(event, newValue, 'role_id')}
                    renderInput={(params) => <TextField {...params} margin='normal' size="small" label="Elije el rol o permiso" variant="outlined" />}
                  />
                  {this.renderButton('Guardar')}
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={10} lg={8}>
              <MembersTable
                members={this.state.data}
                //onGetGroup={this.getGroup}
                onLoading={this.state.isLoading}
                onActive={this.handleActive}
                style={classes.table}
                onDelete={this.handleDelete}
                roles={this.state.roles}
                onChange={this.handleChangeAutocompleteSelect}
              />
            </Grid>
          </Grid>



        </Container>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Members);
