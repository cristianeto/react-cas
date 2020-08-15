import React from "react";
import { withSnackbar } from "notistack";
import Form from "../common/form";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { LinearProgress } from "@material-ui/core";
class ProjectFormGeneral extends Form {
  constructor(props) {
    super(props)
    this.state = props.state
  }
  render() {
    console.info('State General: ', this.state);
    return (
      <React.Fragment>
        {this.props.state.isLoading && <LinearProgress color="secondary" />}
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
          this.props.state.projectTypes
        )}
        {this.renderSelect(
          "research_type_id",
          "Tipo investigación",
          145,
          "id",
          "name",
          this.props.state.researchTypes
        )}
        {this.renderSelect(
          "coverage_type_id",
          "Cobertura",
          85,
          "id",
          "name",
          this.props.state.coverageTypes
        )}
        {this.renderSelect(
          "program_id",
          "Programa",
          85,
          "id",
          "name",
          this.props.state.programs
        )}
        {this.renderButton("Guardar")}
        {/* </form> */}
      </React.Fragment>
    );
  }
}

export default withSnackbar(ProjectFormGeneral);
