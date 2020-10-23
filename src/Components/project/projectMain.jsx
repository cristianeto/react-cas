import React, { Component } from 'react';
import Breadcrumb from "../common/breadcum";
import { Container, Grid, Paper } from "@material-ui/core";
import PanelMembers from './panelMembers';
//import Panel from '../common/panel';
import ProjectForm from './projectForm';
import Typography from '@material-ui/core/Typography';
import { getProjectStatuses } from '../../services/projectStatusService';
import { getMembers } from '../../services/memberService';
import PanelStatuses from './panelStatuses';
import ProjectComponents from './components/projectComponents';
import { getProjectComponents } from '../../services/projectComponentService';
import AddComponentForm from './components/addComponentForm';
import { getProjectBudget } from '../../services/budgetProject';

class ProjectMain extends Component {

  state = {
    data: {
      slug: this.props.match.params.slug,
    },
    budget: 0.00,
    members: [],
    projectStatuses: [],
    projectComponents: [],
    isLoading: false,
  }

  async populateProjectStatuses() {
    const projectSlug = this.state.data.slug;
    const { data: projectStatuses } = await getProjectStatuses(projectSlug);
    this.setState({ projectStatuses });
  }

  async populateProjectComponents() {
    const projectSlug = this.state.data.slug;
    const { data: projectComponents } = await getProjectComponents(projectSlug);
    this.setState({ projectComponents });
  }

  async populateMembers() {
    const projectSlug = this.state.data.slug;
    const { data: members } = await getMembers(projectSlug);
    this.setState({ members });
  }

  async populateBudget() {
    const projectSlug = this.state.data.slug;
    const { data: project } = await getProjectBudget(projectSlug);
    if (project.budget)
      this.setState({ budget: project.budget });
  }

  async componentDidMount() {
    this._isMounted = true;
    //this.getStepContent();
    this.setState({ isLoading: true });

    await this.populateProjectStatuses();
    await this.populateProjectComponents();
    await this.populateMembers();
    await this.populateBudget();

    if (this._isMounted) this.setState({ isLoading: false });

  }

  render() {
    const { data, projectComponents, projectStatuses, members } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/proyectos",
        label: "Proyectos",
      },
    ];
    return (

      <Container maxWidth="xl" id="projectMain">

        <Breadcrumb
          onListBreadcrumbs={listBreadcrumbs}
          lastLabel={"Proyecto"}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8} xl={9}>
            <ProjectForm projectSlug={data.slug} history={this.props.history} populateStatuses={() => this.populateProjectStatuses()} />
            <AddComponentForm projectSlug={data.slug} populateComponents={() => this.populateProjectComponents()} />
            {projectComponents.length > 0 &&
              <ProjectComponents data={projectComponents} />
            }
          </Grid>
          <Grid container item xs={12} sm={12} md={4} xl={3}>
            <Grid item xs={12} sm={12}>
              <Paper className="paper">
                <Typography variant="h6" gutterBottom>
                  Presupuesto aprobado:
                  </Typography>
                <Typography variant="h6" gutterBottom>
                  $ {this.state.budget}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Presupuesto consumido:
                  </Typography>
                <Typography variant="h6" gutterBottom>
                  $ {this.state.budget}
                </Typography>
              </Paper>
              <PanelStatuses title="Últimos estados" projectSlug={data.slug} data={projectStatuses} />
              <PanelMembers title="Miembros" projectSlug={data.slug} data={members} />
            </Grid>
          </Grid>

        </Grid>
      </Container>
    );
  }
}

export default ProjectMain;