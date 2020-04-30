import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
class Project extends Component {
  state = {};
  render() {
    const {
      handleSubmit,
      programs,
      researchTypes,
      projectTypes,
      coverageTypes,
      renderTextarea,
      renderDatePicker,
      renderInput,
      renderSelect,
      renderButton,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {renderTextarea("name_project", "Nombre")}
        {/* {this.renderInputDate("startDate_project", "Fecha Inicio")} */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {renderDatePicker(
            "startDate_project",
            "Fecha Inicio",
            "2020-01-01",
            "2020-12-31",
            false
          )}
          {renderDatePicker(
            "endDate_project",
            "Fecha Fin",
            "2020-02-01",
            "2020-12-31",
            false
          )}
          {renderDatePicker(
            "endDateReal_project",
            "Fecha fin real",
            "2020-02-01",
            "2020-12-31",
            true
          )}
        </MuiPickersUtilsProvider>
        {renderInput("year_project", "Año")}
        {renderInput("location_project", "Ubicación")}
        {renderSelect("id_program", "Programa", 85, "name_program", programs)}
        {renderSelect(
          "id_researchType",
          "Tipo investigación",
          145,
          "name_researchType",
          researchTypes
        )}
        {renderSelect(
          "id_projectType",
          "Tipo proyecto",
          110,
          "name_projectType",
          projectTypes
        )}
        {renderSelect(
          "id_coverageType",
          "Cobertura",
          85,
          "name_coverageType",
          coverageTypes
        )}
        {renderButton("Guardar")}
      </form>
    );
  }
}

export default Project;
