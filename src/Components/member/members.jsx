import Joi from "@hapi/joi";
import { Checkbox, Container, Grid, Paper, TextField } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Autocomplete } from '@material-ui/lab';
import { withSnackbar } from "notistack";
import React from "react";
import { deleteMember, getMembers, saveMember } from "../../services/memberService";
import { getRoles } from "../../services/roleService";
//import { getDependencies } from "../../services/dependencyService";
import { getUsers } from "../../services/userService";
import Breadcrumb from "../common/breadcum";
import { messages } from '../common/es_ES';
import Form from '../common/form';
import TitleForm from '../common/titleForm';
import MembersTable from "./membersTable";
import { getProject } from "../../services/projectService";

class Members extends Form {
  state = {
    data: {
      project_slug: this.props.match.params.slug,
      user_id: '',
      role_id: '',
      project_name: '',
    },
    members: [],
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

  getMember(projectSlug, userId) {
    return this.state.members.find((member) => member.project.slug === projectSlug && member.user_id === userId);
  }

  handleChangeAutocompleteSelect = (event, newValues, nameInput, projectSlug, userId) => {
    const member = this.getMember(projectSlug, userId);
    const members = [...this.state.members];
    const index = members.indexOf(member);
    members[index].role = newValues;
    members[index].role_id = newValues.id;
    this.setState({ members });
    this.doUpdate(members[index]);
  };

  handleChangeMulti = (event, values, nameSelect) => {
    console.log(nameSelect);
  }

  handleChangeSelect = (event, newValue, nameSelect) => {
    const data = { ...this.state.data };
    data[nameSelect] = newValue.id;
    this.setState({ data });
  }

  doUpdate = async (member) => {
    try {
      await saveMember(member);
      this.successMessage();
    } catch (ex) {
      this.errorMessage(ex);
    }
  }

  doSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveMember(this.state.data);
      await this.populateMembers();
      this.successMessage();

    } catch (ex) {
      this.errorMessage(ex);
    }
  }

  handleDelete = async (projectId, userId) => {
    console.log(projectId + '; ' + userId);
    const originalMembers = this.state.members;
    const memberToRemove = this.getMember(projectId, userId);
    const members = originalMembers.filter(member => member !== memberToRemove);
    this.setState({ members });
    try {
      await deleteMember(memberToRemove.project.slug, memberToRemove.user_id);
      this.props.enqueueSnackbar(`Registro eliminado!`, {
        variant: 'success'
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.errorMessage(ex);

      this.setState({ members: originalMembers });
    }
  }

  async populateUsers() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async populateRoles() {
    const { data: roles } = await getRoles();
    this.setState({ roles });
  }
  async populateProject() {
    const { data: project } = await getProject(this.props.match.params.slug);
    const data = { ...this.state.data }
    data.project_name = project.name;
    this.setState({ data });
  }
  async populateMembers() {
    const projectSlug = this.props.match.params.slug
    const { data: members } = await getMembers(projectSlug);
    this.setState({ members: this.mapToViewModel(members) });
    //this.setState({ members });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateUsers();
    await this.populateRoles();
    this.populateProject();
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
        path: "/proyecto/" + this.props.match.params.slug,
        label: this.state.data.project_name.substring(0, 30) + '...'
      },
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
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
      <React.Fragment>
        <Container maxWidth="lg">
          <Breadcrumb
            onListBreadcrumbs={listBreadcrumbs}
            lastLabel={"Miembros proyecto"}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={10} md={10} lg={4}>
              <Paper style={classes.paper}>
                <TitleForm entity={"Agregar miembros del proyecto"} isLoading={isLoading} />
                <form onSubmit={this.doSubmit}>
                  <Autocomplete
                    //multiple
                    id={'user'}
                    name={'user'}
                    limitTags={2}
                    options={users}
                    //disableCloseOnSelect
                    disableClearable
                    getOptionLabel={(user) => user.fullname}
                    onChange={(event, values) => this.handleChangeSelect(event, values, 'user_id')}
                    label={'Miembros'}
                    //value={this.state.data.user}
                    renderOption={(option, { selected, inputValue }) => {
                      //console.log("inputvalue:" + selected + "; " + inputValue);
                      return (
                        <React.Fragment>
                          <Checkbox
                            name={'user'}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.fullname}
                        </React.Fragment>
                      );
                    }}
                    getOptionSelected={(option, value) => {
                      return option.id === value.id;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        //error={validation}
                        margin="normal"
                        variant="outlined"
                        label={'Usuarios de Spirit'}
                        size="small"
                        placeholder="Elegir"
                        fullWidth
                      //helperText={error}
                      />
                    )}
                  />
                  <Autocomplete
                    id={'id-custom-box2'}
                    name={'role'}
                    options={this.state.roles}
                    getOptionLabel={(role) => role.name
                    }
                    disableClearable
                    style={{ width: 300 }}
                    //inputValue={value.name}
                    onChange={(event, newValue) => this.handleChangeSelect(event, newValue, 'role_id')}
                    renderInput={(params) => <TextField {...params} margin='normal' size="small" label="Elije el rol o permiso" variant="outlined" />}
                  />
                  {this.renderButton('Guardar')}
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={10} lg={8}>
              <MembersTable
                members={this.state.members}
                //onGetGroup={this.getGroup}
                onLoading={this.state.isLoading}
                onActive={this.handleActive}
                style={classes.table}
                roles={this.state.roles}
                onChange={this.handleChangeAutocompleteSelect}
                onDelete={this.handleDelete}
              />
            </Grid>
          </Grid>



        </Container>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Members);
