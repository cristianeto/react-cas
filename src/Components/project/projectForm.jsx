import React from 'react';
import Joi from "@hapi/joi";
import Form from '../common/form';
import { withSnackbar } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Stepper, Step, StepButton, Button, Typography, LinearProgress } from '@material-ui/core';
import { getProject, saveProject } from "../../services/projectService";
import { getProjectTypes } from "../../services/projectTypeService";
import { getResearchTypes } from "../../services/researchTypeService";
import { getCoverageTypes } from "../../services/coverageTypeService";
import { getPrograms } from "../../services/programService";
import { getSectors } from "../../services/sectorService";
import { getUsers } from "../../services/userService";
import { messages } from "../common/es_ES";
import SaveIcon from "@material-ui/icons/Save";


class ProjectForm extends Form {
  constructor(props) {
    super(props)
    this.state = {
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
        sectors: [],
        users: [],
      },
      projectTypes: [],
      researchTypes: [],
      coverageTypes: [],
      programs: [],
      sectors: [],
      users: [],
      errors: {},
      isLoading: false,

      activeStep: 0,
      completed: {},
    }
  }

  getSteps = () => {
    return ['Inf. General', 'Perfil', 'Miembros', 'Presupuesto'];
  }

  getStepContent = (step) => {
    const { isLoading, projectTypes, researchTypes, coverageTypes, programs, sectors, users } = this.state;
    switch (step) {
      case 0:

        return (<React.Fragment>
          {isLoading && <LinearProgress color="secondary" />}
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
          {/* {this.renderInput("year", "Año")} */}
          {this.renderInput("location", "Ubicación")}
          {this.renderSelect(
            "project_type_id",
            "Tipo proyecto",
            110,
            "id",
            "name",
            projectTypes
          )}
          {this.renderSelect(
            "research_type_id",
            "Tipo investigación",
            145,
            "id",
            "name",
            researchTypes
          )}
          {this.renderSelect(
            "coverage_type_id",
            "Cobertura",
            85,
            "id",
            "name",
            coverageTypes
          )}
          {this.renderSelect(
            "program_id",
            "Programa",
            85,
            "id",
            "name",
            programs
          )}
          {this.renderMultiSelect(
            "sectors",
            "Sectores Impacto",
            "id",
            "name",
            sectors
          )
          }
          {/* {this.renderButton("Guardar")} */}
          {/* </form> */}
        </React.Fragment>)
      //return (<ProjectFormGeneral state={this.state} />)
      //return (<ProjectFormGeneral data={this.state.data} projectTypes={this.state.projectTypes} researchTypes={this.state.researchTypes} coverageTypes={this.state.coverageTypes} programs={this.state.programs} />);
      case 1:
        return (<React.Fragment>
          {this.renderTextarea("name", "Nombre")}
        </React.Fragment>);
      case 2:
        return (<React.Fragment>
          {this.renderMultiSelect("users", "Miembros proyecto", "id", "fullname", users)}
        </React.Fragment>);
      case 3:
        return 'Step 4: Presupuesto';
      default:
        return 'Unknown step';
    }
  }
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
    sectors: Joi.array().label("Sectores impacto").min(1).messages(messages),
    users: Joi.array().label("Miembros Proyecto").min(1).messages(messages),
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
  async populateSectors() {
    const { data: sectors } = await getSectors();
    this.setState({ sectors });
  }

  async populateUsers() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async populateProject() {
    try {
      const projectId = this.props.projectId; //Pasando por URL id movie
      //const projectId = this.props.match.params.id; //Pasando por URL id movie
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
    //this.getStepContent();
    this.setState({ isLoading: true });
    await this.populateProjectTypes();
    await this.populateResearchTypes();
    await this.populateCoverageTypes();
    await this.populatePrograms();
    await this.populateSectors();
    await this.populateUsers();
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
      sectors: project.impact_sectors,
      users: project.users,
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


  steps = this.getSteps();

  totalSteps = () => {
    return this.steps.length;
  };

  completedSteps = () => {
    return Object.keys(this.state.completed).length;
  };

  isLastStep = () => {
    return this.state.activeStep === this.totalSteps() - 1;
  };

  allStepsCompleted = () => {
    return this.completedSteps() === this.totalSteps();
  };

  handleNext = () => {
    const newActiveStep =
      this.isLastStep() && !this.allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        this.steps.findIndex((step, i) => !(i in this.state.completed))
        : this.state.activeStep + 1;
    this.setState({ activeStep: newActiveStep })
  };

  handleBack = () => {
    //setActiveStep((prevActiveStep) => prevActiveStep - 1);
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleStep = (step) => () => {
    this.setState({
      activeStep: step
    });
  };

  handleComplete = () => {
    const newCompleted = this.state.completed;
    newCompleted[this.state.activeStep] = true;
    this.setState({ completed: newCompleted });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({ activeStep: 0, completed: {} })
  };


  render() {
    const classes = {
      root: {
        width: '100%',
      },
      button: {
        marginRight: '1em',
      },
      completed: {
        display: 'inline-block',
      },
      instructions: {
        marginTop: '1em',
        marginBottom: '1em',
      },
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classes.root} >
          <Stepper nonLinear activeStep={this.state.activeStep}>
            {this.steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.allStepsCompleted() ? (
              <div>
                <Typography>
                  All steps completed - you&apos;re finished
            </Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
                <div>
                  <div >{this.getStepContent(this.state.activeStep, this.state.sectors)}</div>
                  <div>
                    <Button variant={'outlined'} disabled={this.state.activeStep === 0} onClick={this.handleBack} style={classes.button} >
                      Atrás
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      style={classes.button}
                    >
                      Siguiente
              </Button>
                    {this.state.activeStep !== this.steps.length &&
                      (this.state.completed[this.state.activeStep] ? (
                        <Typography variant="caption">
                          Step {this.state.activeStep + 1} already completed
                        </Typography>
                      ) : (
                          <Button variant="contained" type="submit" color="primary" style={classes.button} startIcon={<SaveIcon />} >
                            {this.completedSteps() === this.totalSteps() - 1 ? 'Finalizar' : 'Guardar'}
                          </Button>
                        ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </form >
    )
  }

}

export default withSnackbar(ProjectForm);