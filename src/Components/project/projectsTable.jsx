import React, {Component} from "react";
import {Link} from "react-router-dom";
import {TEXT_LABELS} from "../../configTable";
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {LinearProgress, Typography} from "@material-ui/core";
import ButtonAdd from "../common/buttonAdd";

class ProjectsTable extends Component {
  getMuiTheme = () =>
      createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {},
          },
          MuiIconButton: {
            sizeSmall: {
              // Adjust spacing to reach minimal touch target hitbox
              marginLeft: 4,
              marginRight: 4,
              padding: 12,
            },
          },
        },
        props: {
          MuiTable: {
            size: "small",
          },
        },
      });

  /* handleDelete(rowsIndex) {
    rowsIndex.map((r) => {
      return console.log(this.props.datas[0]);
    });
  } */

  render() {
    const columns = [
      {
        name: "id_project",
        label: "id",
        options: {
          filter: false,
          display: "excluded",
        },
      },
      {
        name: "name_project",
        label: "Nombre",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
                <Link
                    style={{textDecoration: "none"}}
                    to={`/proyecto/${tableMeta.rowData[0]}`}
                >
                  {value}
                </Link>
            );
          },
        },
      },
      {
        name: "startDate_project",
        label: "Fecha Inicio",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "endDate_project",
        label: "Fecha Final",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "year_project",
        label: "Año",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "program.name_program",
        label: "Programa",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "research_type.name_researchType",
        label: "Tipo",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "coverage_type.name_coverageType",
        label: "Cobertura",
        options: {
          filter: true,
          sort: true,
        },
      },
    ];
    const options_config = {
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      textLabels: TEXT_LABELS,
      //selectableRows: "single",
      onRowsDelete: (rowsDeleted) => {
        const data = this.props.datas; //lista de todos los proyectos
        const projectsToDelete = rowsDeleted.data.map((d) => data[d.dataIndex]); //Array de todos los proyectos a borrar.
        this.props.onDelete(projectsToDelete);
      },
    };

    const data = this.props.datas;
    const isLoading = this.props.onLoading;
    const options = options_config;

    return (
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
              title={
                <Typography variant="h6">
                  Lista de proyectos <ButtonAdd entity={"proyecto"}/>
                  {isLoading && <LinearProgress color="secondary"/>}
                </Typography>
              }
              data={data}
              columns={columns}
              options={options}
              responsive={"scrollFullHeight"}
          />
        </MuiThemeProvider>
    );
  }
}

export default ProjectsTable;
