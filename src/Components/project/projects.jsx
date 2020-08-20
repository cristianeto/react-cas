import React, { Component } from "react";
import { withSnackbar } from "notistack";
import Breadcum from "../common/breadcum";
import ProjectsTable from "./projectsTable";
import { getProjects, deleteProject } from "../../services/projectService";
import { getPrograms } from "../../services/programService";
import { getResearchTypes } from "../../services/researchTypeService";
import { getProjectTypes } from "../../services/projectTypeService";
import { getCoverageTypes } from "../../services/coverageTypeService";
import { Container } from "@material-ui/core";

class Projects extends Component {
  state = {
    projects: [],
    programs: [],
    researchTypes: [],
    projectTypes: [],
    coverageTypes: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: programs } = await getPrograms();
    const { data: researchTypes } = await getResearchTypes();
    const { data: projectTypes } = await getProjectTypes();
    const { data: coverageTypes } = await getCoverageTypes();
    //const dependencies = [{ name: "All Movies", _id: "" }, ...data];
    const { data: projects } = await getProjects();

    this.setState({
      projects,
      programs,
      researchTypes,
      projectTypes,
      coverageTypes,
      isLoading: false,
    });
  }

  getProject(id) {
    return this.state.projects.find((project) => project.slug === id);
  }

  /*  handleUndo(projectsToDelete, originalProjects) {
     const action = (key) => (
       <Fragment>
         <Button
           onClick={() => {
             //this.setState({ projects: originalProjects });
             this.props.closeSnackbar(key);
           }}
           style={{ color: "#fff" }}
         >
           ACEPTAR
         </Button>
       </Fragment>
     );
     const lenghtArray = projectsToDelete.length;
     const mensaje =
       lenghtArray === 1
         ? `Registro eliminado`
         : `${lenghtArray} registros eliminados`;
     this.props.enqueueSnackbar(mensaje, {
       autoHideDuration: 3000,
       action,
     });
   } */

  /*  handleDelete = async (projectsToDelete) => {
     const originalProjects = this.state.projects;
     const projects = originalProjects.filter(
       (project) => !projectsToDelete.includes(project)
     );
     this.setState({ projects });
     projectsToDelete.forEach(async (project) => {
       try {
         await deleteProject(project.id);
         this.handleUndo(projectsToDelete, originalProjects);
       } catch (ex) {
         if (ex.response && ex.response.status === 404) console.log(ex);
         this.props.enqueueSnackbar(`${ex.response.data.message}`, {
           variant: "error",
         });
         this.setState({ projects: originalProjects });
       }
     });
   }; */
  handleDelete = async (projectSlug) => {
    const originalProjects = this.state.projects;
    const projectToRemove = this.getProject(projectSlug);
    const projects = originalProjects.filter(project => project !== projectToRemove);
    this.setState({ projects });
    try {
      await deleteProject(projectToRemove.slug);
      this.props.enqueueSnackbar(`Registro eliminado!`, {
        variant: 'success'
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.enqueueSnackbar(`${ex.response.data.message}`, {
          variant: "error"
        });
      } else if (ex.response.status === 403) {
        this.props.enqueueSnackbar(`Operación no autorizada`, {
          variant: "error"
        });
      }
      this.setState({ projects: originalProjects });
    }
  }

  render() {
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
    ];
    const classes = {
      table: {
        padding: "2em",
        color: "secondary",
      },
    };
    return (
      <Container maxWidth="xl">
        <Breadcum onListBreadcrumbs={listBreadcrumbs} lastLabel={"Proyectos"} />

        <ProjectsTable
          datas={this.state.projects}
          //onGetProject={this.getProject}
          onLoading={this.state.isLoading}
          style={classes.table}
          onDelete={this.handleDelete}
          history={this.props.history}
        />
      </Container>
    );
  }
}

export default withSnackbar(Projects);
