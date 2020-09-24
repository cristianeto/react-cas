import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TEXT_LABELS } from "../common/configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ButtonAdd from "../common/buttonAdd";
import { Typography, Tooltip } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
        name: 'count',
        label: "#",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1
        },
      },
      {
        name: "id",
        label: "id",
        options: {
          filter: false,
          display: "excluded",
        },
      },
      {
        name: "acronym",
        label: "Siglas",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name",
        label: "Nombre",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/dependencia/${tableMeta.rowData[1]}`}
              >
                {value}
              </Link>
            );
          },
        },
      },
      {
        name: "email",
        label: "Correo",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dependency_type.name",
        label: "Tipo",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "",
        label: "Acciones",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <React.Fragment>
                <Tooltip title="Editar" style={{ cursor: "pointer" }}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/dependencia/${tableMeta.rowData[1]}`}
                  >
                    <EditIcon color={'primary'} />
                  </Link>
                </Tooltip>
                {tableMeta.rowData[1] !== 1 &&
                  <Tooltip title="Eliminar" style={{ cursor: "pointer" }}>
                    <DeleteIcon onClick={() => this.props.onDelete(tableMeta.rowData[1])} color={'primary'} />
                  </Tooltip>
                }
              </React.Fragment>
            );
          },
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
    const options = options_config;

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Lista de dependencias <ButtonAdd entity={"dependencia"} />
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
