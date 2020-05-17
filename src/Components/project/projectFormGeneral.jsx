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

class ProjectFormGeneral extends Form {
  _isMounted = false;
  state = {
    data: {
      name_project: "",
      startDate_project: "",
      endDate_project: "",
      endDateReal_project: "",
      year_project: "",
      location_project: "",
      id_program: "",
      id_researchType: "",
      id_projectType: "",
      id_coverageType: "",
    },
    programs: [],
    researchTypes: [],
    projectTypes: [],
    coverageTypes: [],
    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    id_project: Joi.number(),
    name_project: Joi.string().label("Nombre").max(500),
    startDate_project: Joi.date().label("Fecha Inicio"),
    endDate_project: Joi.date().label("Fecha Fin"),
    endDateReal_project: Joi.date().allow("", null).label("Fecha Final Real"),
    year_project: Joi.number().label("Año del proyecto").min(2020).max(2021),
    location_project: Joi.string().label("Ubicación"),
    id_program: Joi.number().label("Programa"),
    id_researchType: Joi.number().label("Tipo investigación"),
    id_projectType: Joi.number().label("Tipo proyecto"),
    id_coverageType: Joi.number().label("Tipo cobertura"),
  });

  async populatePrograms() {
    const { data: programs } = await getPrograms();
    this.setState({ programs });
  }
  async populateResearchTypes() {
    const { data: researchTypes } = await getResearchTypes();
    this.setState({ researchTypes });
  }
  async populateProjectTypes() {
    const { data: projectTypes } = await getProjectTypes();
    this.setState({ projectTypes });
  }
  async populateCoverageTypes() {
    const { data: coverageTypes } = await getCoverageTypes();
    this.setState({ coverageTypes });
  }

  async populateProject() {
    try {
      const projectId = this.props.projectId; //Pasando por URL id movie
      if (projectId === "new") return; //Si si
      const { data: project } = await getProject(projectId); //Si no.
      this.setState({ data: this.mapToViewModel(project) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.enqueueSnackbar(ex.response.data.message, {
          variant: "warning",
        });
      // console.log(ex);
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
    //console.log("Lines:", lines);
    return {
      id_project: project.id_project,
      name_project: project.name_project,
      startDate_project: project.startDate_project,
      endDate_project: project.endDate_project,
      endDateReal_project: project.endDateReal_project,
      year_project: project.year_project,
      location_project: project.location_project,
      id_program: project.id_program,
      id_researchType: project.id_researchType,
      id_projectType: project.id_projectType,
      id_coverageType: project.id_coverageType,
    };
  }
  doSubmit = async () => {
    try {
      await saveProject(this.state.data);
      this.props.enqueueSnackbar(`Proyecto guardado correctamente!`, {
        variant: "success",
      });
      this.props.history.push("/proyectos");
    } catch (ex) {
      this.props.enqueueSnackbar(`${ex.response.data.message}`, {
        variant: "error",
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isLoading && <LinearProgress color="secondary" />}
        <form onSubmit={this.handleSubmit}>
          {this.renderTextarea("name_project", "Nombre")}
          {/* {this.renderInputDate("startDate_project", "Fecha Inicio")} */}

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {this.renderDatePicker(
              "startDate_project",
              "Fecha Inicio",
              "2020-01-01",
              "2020-12-31",
              false
            )}
            {this.renderDatePicker(
              "endDate_project",
              "Fecha Fin",
              "2020-02-01",
              "2020-12-31",
              false
            )}
            {this.renderDatePicker(
              "endDateReal_project",
              "Fecha fin real",
              "2020-02-01",
              "2020-12-31",
              false
            )}
          </MuiPickersUtilsProvider>
          {this.renderInput("year_project", "Año")}
          {this.renderInput("location_project", "Ubicación")}
          {this.renderSelect(
            "id_program",
            "Programa",
            85,
            "name_program",
            this.state.programs
          )}
          {this.renderSelect(
            "id_researchType",
            "Tipo investigación",
            145,
            "name_researchType",
            this.state.researchTypes
          )}
          {this.renderSelect(
            "id_projectType",
            "Tipo proyecto",
            110,
            "name_projectType",
            this.state.projectTypes
          )}
          {this.renderSelect(
            "id_coverageType",
            "Cobertura",
            85,
            "name_coverageType",
            this.state.coverageTypes
          )}
          {this.renderButton("Guardar")}
        </form>
      </React.Fragment>
    );
  }
}

export default withSnackbar(ProjectFormGeneral);
