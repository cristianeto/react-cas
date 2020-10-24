import React from 'react';
import Joi from "@hapi/joi";
import Form from '../common/form';
import { withSnackbar } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
/* import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale' */
import { Stepper, Step, StepButton, Button, Typography } from '@material-ui/core';
import { getProject, saveProject } from "../../services/projectService";
import { getProjectTypes } from "../../services/projectTypeService";
import { getResearchTypes } from "../../services/researchTypeService";
import { getCoverageTypes } from "../../services/coverageTypeService";
import { getPrograms } from "../../services/programService";
import { getSectors } from "../../services/sectorService";
import { messages } from "../common/es_ES";
import SaveIcon from "@material-ui/icons/Save";
import TitleComponent from '../common/titleComponent';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import './project.scss';
import Loading from '../common/loading';
import { Paper } from '@material-ui/core';

class ProjectForm extends Form {
  state = {
    data: {
      name: "",
      slug: "",
      kind: "",
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

      summary: '',
      background: '',
      justification: '',
      current_situation: '',
      general_objective: '',
      specific_objectives: '',
      sustainability: '',
      methodology: '',
      expected_results: '',
      transference_results: '',
      beneficiaries: '',

    },
    projectTypes: [],
    researchTypes: [],
    coverageTypes: [],
    programs: [],
    sectors: [],
    errors: {},
    isLoading: false,

    activeStep: 0,
    completed: {},
  }


  getSteps = () => {
    return ['Inf. General', 'Inf. Adicional'];
  }

  getStepContent = (step) => {
    const { projectTypes, researchTypes, coverageTypes, programs, sectors } = this.state;
    const kinds = [{ 'id': 1, 'name': 'Institucional' }, { id: 2, name: 'Facultad' }];
    switch (step) {
      case 0:
        return (<React.Fragment>
          {/* {isLoading && <LinearProgress color="secondary" />} */}
          {/* <form onSubmit={this.handleSubmit}> */}
          {this.renderTextarea("name", "Nombre *")}
          {/* {this.renderInputDate("startDate", "Fecha Inicio")} */}
          {this.renderRadio("kind", "Tipo:", kinds)}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {this.renderDatePicker(
              "startDate",
              "Fecha Inicio *",
              "2020-01-01",
              "2020-12-31",
              false
            )}
            {this.renderDatePicker(
              "endDate",
              "Fecha Fin *",
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
          {this.renderInput("location", "Ubicación *")}
          {this.renderSelect(
            "project_type_id",
            "Tipo proyecto *",
            110,
            "id",
            "name",
            projectTypes
          )}
          {this.renderSelect(
            "research_type_id",
            "Tipo investigación *",
            145,
            "id",
            "name",
            researchTypes
          )}
          {this.renderSelect(
            "coverage_type_id",
            "Cobertura *",
            85,
            "id",
            "name",
            coverageTypes
          )}
          {this.renderSelect(
            "program_id",
            "Programa *",
            85,
            "id",
            "name",
            programs
          )}
          {this.renderMultiSelect(
            "sectors",
            "Sectores Impacto *",
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
          {this.renderTextarea("summary", "Resumen")}
          {this.renderTextarea("background", "Antecedentes")}
          {this.renderTextarea("justification", "Justificación")}
          {this.renderTextarea("current_situation", "Análisis situación actual")}
          {this.renderTextarea("general_objective", "Objetivo general")}
          {this.renderTextarea("specific_objectives", "Objetivos específicos")}
          {this.renderTextarea("sustainability", "Sostenibilidad")}
          {this.renderTextarea("methodology", "Metodología")}
          {this.renderTextarea("expected_results", "Resultados esperados")}
          {this.renderTextarea("transference_results", "Transferencia de resultados")}
          {this.renderTextarea("beneficiaries", "Beneficiarios")}
          {this.renderTextarea("impacts", "Impactos bioéticos y sociales")}
          {this.renderTextarea("aspects", "Aspectos")}
        </React.Fragment>);
      case 2:
        return (<React.Fragment>
          3er Componente
        </React.Fragment>);
      case 3:
        return 'Step 4: Presupuesto';
      default:
        return 'Unknown step';
    }
  }
  schema = Joi.object({
    id: Joi.string().guid(),
    name: Joi.string().label("Nombre").max(500).messages(messages),
    slug: Joi.string().label("Slug").max(60).messages(messages),
    kind: Joi.string().label("Tipo").max(60).messages(messages),
    startDate: Joi.date().label("Fecha Inicio"),
    endDate: Joi.date().label("Fecha Fin"),
    endDateReal: Joi.date().allow("", null).label("Fecha Final Real"),
    year: Joi.number().positive().label("Año").min(2020).messages(messages),
    location: Joi.string().label("Ubicación").max(30).messages(messages),
    project_type_id: Joi.number().integer().less(3).label("Tipo proyecto").messages(messages),
    coverage_type_id: Joi.number().integer().less(7).label("Tipo cobertura").messages(messages),
    research_type_id: Joi.number().integer().less(4).label("Tipo investigación").messages(messages),
    program_id: Joi.number().integer().label("Programa").messages(messages),
    sectors: Joi.array().label("Sectores impacto").min(1).messages(messages),

    summary: Joi.string().label("Resumen").allow('').max(500).messages(messages),
    background: Joi.string().label("Antecedentes").allow('').max(500).messages(messages),
    justification: Joi.string().label("Justificación").allow('').max(500).messages(messages),
    current_situation: Joi.string().label("Análisis situación actual").allow('').max(500).messages(messages),
    general_objective: Joi.string().label("Objetivo General").allow('').max(500).messages(messages),
    specific_objectives: Joi.string().label("Objetivos específicos").allow('').max(500).messages(messages),
    sustainability: Joi.string().label("Sostenibilidad").allow('').max(500).messages(messages),
    methodology: Joi.string().label("Metodología").allow('').max(500).messages(messages),
    expected_results: Joi.string().label("Resultados esperados").allow('').max(500).messages(messages),
    transference_results: Joi.string().label("Transferencia de resultados").allow('').max(500).messages(messages),
    beneficiaries: Joi.string().label("Beneficiarios").allow('').max(500).messages(messages),
    impacts: Joi.string().label("Impactos").allow('').max(500).messages(messages),
    aspects: Joi.string().label("Aspectos bioéticos y sociales").allow('').max(500).messages(messages),
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



  async populateProject() {
    try {
      const projectSlug = this.props.projectSlug; //Pasando por URL id movie
      //const projectSlug = this.props.match.params.slug; //Pasando por URL id movie
      if (projectSlug === "new") return; //Si si
      const { data: project } = await getProject(projectSlug); //Si no.
      this.setState({ data: this.mapToViewModel(project) });
    } catch (ex) {
      console.log(ex);
      this.errorMessage(ex);
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      } else if (ex.response.status === 403)
        this.props.history.replace("/not-authorized");
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
    await this.populateProject();
    if (this._isMounted) this.setState({ isLoading: false });
  }

  mapToViewModel(project) {
    return {
      id: project.id,
      name: project.name,
      slug: project.slug,
      kind: project.kind === null ? '' : project.kind,
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

      summary: project.summary === null ? '' : project.summary,
      background: project.background === null ? '' : project.background,
      justification: project.justification === null ? '' : project.justification,
      current_situation: project.current_situation === null ? '' : project.current_situation,
      general_objective: project.general_objective === null ? '' : project.general_objective,
      specific_objectives: project.specific_objectives === null ? '' : project.specific_objectives,
      sustainability: project.sustainability === null ? '' : project.sustainability,
      methodology: project.methodology === null ? '' : project.methodology,
      expected_results: project.expected_results === null ? '' : project.expected_results,
      transference_results: project.transference_results === null ? '' : project.transference_results,
      beneficiaries: project.beneficiaries === null ? '' : project.beneficiaries,
      impacts: project.impacts === null ? '' : project.impacts,
      aspects: project.aspects === null ? '' : project.aspects,
    };
  }

  handleChangeSlug(slug) {
    const data = { ...this.state.data }
    data.slug = slug
    this.setState({ data })
  }

  doSubmit = async () => {
    try {
      const res = await saveProject(this.state.data);
      this.handleChangeSlug(res.data.slug);
      this.successMessage();
      this.props.populateStatuses();
      this.props.history.push(`/proyecto/${this.state.data.slug}`);
    } catch (ex) {
      console.log(ex);
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

    let disabled = true;
    if (this.validate() === null) disabled = false;

    return (
      <Paper className="paper" elevation={10}>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          className="btn btn-send"
          disabled={disabled}
        >
          <NavigationIcon />
          Enviar
        </Fab>
        <Loading open={this.state.isLoading} />
        <TitleComponent entity={"Proyecto"} />
        <form onSubmit={this.handleSubmit}>
          <div className={classes.root} >
            <Stepper nonLinear activeStep={this.state.activeStep} style={{ width: '50%' }}>
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
      </Paper>
    )
  }

}

export default withSnackbar(ProjectForm);