import Joi from "@hapi/joi";
import { Checkbox, Container, Grid, Paper, TextField } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Autocomplete } from '@material-ui/lab';
import { withSnackbar } from "notistack";
import React from "react";
import { deleteGroupMember, getGroupMembers, saveGroupMember } from "../../../services/groupMemberService";
import { getStaffs } from "../../../services/staffService";
//import { getDependencies } from "../../services/dependencyService";
import { getUsers } from "../../../services/userService";
import Breadcrumb from "../../common/breadcum";
import { messages } from '../../common/es_ES';
import Form from '../../common/form';
import TitleComponent from '../../common/titleComponent';
import MembersTable from "./membersTable";
import Loading from '../../common/loading';

class GroupMembersForm extends Form {
  state = {
    data: {
      group_id: this.props.match.params.id,
      user_id: '',
      staff_id: '',
      project_name: '',
    },
    members: [],
    users: [],
    staffs: [],
    //dependencies: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    group_id: Joi.string().label("Proyecto").min(36).max(36).messages(messages),
    user_id: Joi.string().label("Miembro").min(36).max(36).messages(messages),
    staff_id: Joi.string().label("Cargo").min(36).max(36).messages(messages),
    users: Joi.array().label("Miembros").min(1).max(1).messages(messages),
  });

  getMember(groupId, userId) {
    return this.state.members.find((member) => member.group.id === groupId && member.user_id === userId);
  }

  handleChangeAutocompleteSelect = (event, newValues, nameInput, groupId, userId) => {
    const member = this.getMember(groupId, userId);
    const members = [...this.state.members];
    const index = members.indexOf(member);
    members[index].staff = newValues;
    members[index].staff_id = newValues.id;
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
      await saveGroupMember(member);
      this.successMessage();
    } catch (ex) {
      this.errorMessage(ex);
    }
  }

  doSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveGroupMember(this.state.data);
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
      await deleteGroupMember(memberToRemove.project.slug, memberToRemove.user_id);
      this.props.enqueueSnackbar(`Registro eliminado!`, {
        variant: 'success'
      });
    } catch (ex) {
      this.errorMessage(ex);
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");

      this.setState({ members: originalMembers });
    }
  }

  async populateUsers() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async populateStaffs() {
    const { data: staffs } = await getStaffs();
    this.setState({ staffs });
  }
  /*   async populateProject() {
      const { data: project } = await getProject(this.props.match.params.slug);
      const data = { ...this.state.data }
      data.project_name = project.name;
      this.setState({ data });
    } */
  async populateMembers() {
    const groupId = this.props.match.params.id;
    const { data: members } = await getGroupMembers(groupId);
    this.setState({ members: this.mapToViewModel(members) });
    //this.setState({ members });
  }

  async componentDidMount() {
    console.log('calling component did mount')
    this.setState({ isLoading: true });
    await this.populateUsers();
    await this.populateStaffs();
    /* this.populateProject(); */
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
        path: "/grupos-investigacion",
        label: "Grupos",
      },
      {
        path: "/grupo/" + this.props.match.params.id,
        label: this.props.match.params.id
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
          <Loading open={isLoading} />
          <Breadcrumb
            onListBreadcrumbs={listBreadcrumbs}
            lastLabel={"Miembros del grupo"}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Paper className="paper">
                <TitleComponent entity={"Agregar miembros al grupo"} />
                <form onSubmit={this.doSubmit}>
                  <Autocomplete
                    //mnmulti
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
                    name={'staff'}
                    options={this.state.staffs}
                    getOptionLabel={(staff) => staff.name}
                    disableClearable
                    //inputValue={value.name}
                    onChange={(event, newValue) => this.handleChangeSelect(event, newValue, 'staff_id')}
                    renderInput={(params) => <TextField {...params} margin='normal' size="small" label="Elije el cargo que ocupa" variant="outlined" />}
                  />
                  {this.renderButton('Guardar')}
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              {this.state.members.length>0 && <MembersTable
                members={this.state.members}
                //onGetGroup={this.getGroup}
                onLoading={this.state.isLoading}
                onActive={this.handleActive}
                style={classes.table}
                staffs={this.state.staffs}
                onChange={this.handleChangeAutocompleteSelect}
                onDelete={this.handleDelete}
              />}
            </Grid>
          </Grid>



        </Container>
      </React.Fragment>
    );
  }
}

export default withSnackbar(GroupMembersForm);
