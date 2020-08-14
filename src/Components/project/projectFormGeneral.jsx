import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Form from "../common/form";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getProject, saveProject } from "../../services/projectService";
import { getPrograms } from "../../services/programService";
import { getResearchTypes } from "../../services/researchTypeService";
import { getProjectTypes } from "../../services/projectTypeService";
import { getCoverageTypes } from "../../services/coverageTypeService";
import { LinearProgress } from "@material-ui/core";
import { messages } from "../common/es_ES";
class ProjectFormGeneral extends Form {
  _isMounted = false;
  state = {
    data: {
      name: "",
      startDate: "",
      endDate: "",
      endDateReal: "",
      year: "",
      location: "",
      project_type_id: "",
      research_type_id: "",
      coverage_type_id: "",
      program_id: "",
    },
    projectTypes: [],
    researchTypes: [],
    coverageTypes: [],
    programs: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    id: Joi.string().guid({ version: ["uuidv1"] }),
    name: Joi.string().label("Nombre").max(500).messages(messages),
    startDate: Joi.date().label("Fecha Inicio"),
    endDate: Joi.date().label("Fecha Fin"),
    endDateReal: Joi.date().allow("", null).label("Fecha Final Real"),
    year: Joi.number().positive().label("Año").min(2020).messages(messages),
    location: Joi.string().label("Ubicación").max(30).messages(messages),
    project_type_id: Joi.string().label("Tipo proyecto").min(36).max(36).messages(messages),
    research_type_id: Joi.string().label("Tipo investigación").min(36).max(36).messages(messages),
    coverage_type_id: Joi.string().label("Tipo cobertura").min(36).max(36).messages(messages),
    program_id: Joi.string().label("Programa").min(36).max(36).messages(messages),
  });

  async populateProjectTypes() {
    const { data: projectTypes } = await getProjectTypes();
    this.setState({ projectTypes });
  }

  async populateResearchTypes() {
    const { data: researchTypes } = await getResearchTypes();
    this.setState({ researchTypes });
  }

  async populateCoverageTypes() {
    const { data: coverageTypes } = await getCoverageTypes();
    this.setState({ coverageTypes });
  }

  async populatePrograms() {
    const { data: programs } = await getPrograms();
    this.setState({ programs });
  }

  async populateProject() {
    try {
      const projectId = this.props.projectId; //Pasando por URL id movie
      if (projectId === "new") return; //Si si
      const { data: project } = await getProject(projectId); //Si no.
      this.setState({ data: this.mapToViewModel(project) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) this.errorMessage(ex);
      this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    this.setState({ isLoading: true });
    await this.populatePrograms();
    await this.populateResearchTypes();
    await this.populateProjectTypes();
    await this.populateCoverageTypes();
    await this.populateProject();
    if (this._isMounted) this.setState({ isLoading: false });
  }

  mapToViewModel(project) {
    return {
      id: project.id,
      name: project.name,
      startDate: project.startDate === null ? '' : project.startDate,
      endDate: project.endDate === null ? '' : project.endDate,
      endDateReal: project.endDateReal === null ? '' : project.endDateReal,
      year: project.year,
      location: project.location === null ? '' : project.location,
      project_type_id: project.project_type_id === null ? '' : project.project_type_id,
      research_type_id: project.research_type_id === null ? '' : project.research_type_id,
      coverage_type_id: project.coverage_type_id === null ? '' : project.coverage_type_id,
      program_id: project.program_id === null ? '' : project.program_id,
    };
  }

  doSubmit = async () => {
    try {
      await saveProject(this.state.data);
      this.successMessage();
      // this.props.history.push("/proyectos");
    } catch (ex) {
      this.errorMessage(ex);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading && <LinearProgress color="secondary" />}
        {/* <form onSubmit={this.handleSubmit}> */}
        {this.renderTextarea("name", "Nombre")}
        {/* {this.renderInputDate("startDate", "Fecha Inicio")} */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {this.renderDatePicker(
            "startDate",
            "Fecha Inicio",
            "2020-01-01",
            "2020-12-31",
            false
          )}
          {this.renderDatePicker(
            "endDate",
            "Fecha Fin",
            "2020-02-01",
            "2020-12-31",
            false
          )}
          {this.renderDatePicker(
            "endDateReal",
            "Fecha fin real",
            "2020-02-01",
            "2020-12-31",
            false
          )}
        </MuiPickersUtilsProvider>
        {this.renderInput("year", "Año")}
        {this.renderInput("location", "Ubicación")}
        {this.renderSelect(
          "project_type_id",
          "Tipo proyecto",
          110,
          "id",
          "name",
          this.state.projectTypes
        )}
        {this.renderSelect(
          "research_type_id",
          "Tipo investigación",
          145,
          "id",
          "name",
          this.state.researchTypes
        )}
        {this.renderSelect(
          "coverage_type_id",
          "Cobertura",
          85,
          "id",
          "name",
          this.state.coverageTypes
        )}
        {this.renderSelect(
          "program_id",
          "Programa",
          85,
          "id",
          "name",
          this.state.programs
        )}
        {this.renderButton("Guardar")}
        {/* </form> */}
      </React.Fragment>
    );
  }
}

export default withSnackbar(ProjectFormGeneral);
