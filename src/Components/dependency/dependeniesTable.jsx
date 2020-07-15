import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TEXT_LABELS } from "../common/configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { LinearProgress, Typography } from "@material-ui/core";
import ButtonAdd from "../common/buttonAdd";

class DependenciesTable extends Component {
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

  //   getStatus = (value) => {
  //     if (value === 1) {
  //       return "Activo";
  //     }
  //   };
  render() {
    const columns = [
      {
        name: "id_dependency",
        label: "id",
        options: {
          filter: false,
          display: "excluded",
        },
      },
      {
        name: "acronym_dependency",
        label: "Siglas",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name_dependency",
        label: "Nombre",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/dependencia/${tableMeta.rowData[0]}`}
              >
                {value}
              </Link>
            );
          },
        },
      },
      {
        name: "email_dependency",
        label: "Correo",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dependency_type.name_dependencyType",
        label: "Tipo",
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
    };

    const data = this.props.datas;
    const isLoading = this.props.onLoading;
    const options = options_config;

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Lista de dependencias <ButtonAdd entity={"dependencia"} />
              {isLoading && <LinearProgress color="secondary" />}
            </Typography>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default DependenciesTable;
