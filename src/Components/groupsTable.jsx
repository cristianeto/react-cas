import React, { Component } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { LinearProgress, Typography, Chip } from "@material-ui/core";

class GroupsTable extends Component {
  state = {};
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {}
        },
        MuiIconButton: {
          sizeSmall: {
            // Adjust spacing to reach minimal touch target hitbox
            marginLeft: 4,
            marginRight: 4,
            padding: 12
          }
        }
      },
      props: {
        MuiTable: {
          size: "small"
        }
      }
    });

  getStatus = value => {
    if (value === 1) {
      return "Activo";
    }
  };
  render() {
    const columns = [
      {
        name: "id_group",
        label: "id",
        options: {
          filter: false,
          display: "excluded"
        }
      },
      {
        name: "code_group",
        label: "Código",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "name_group",
        label: "Nombre",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/grupo/${tableMeta.rowData[0]}`}
              >
                {value}
              </Link>
            );
          }
        }
      },
      {
        name: "acronym_group",
        label: "Siglas",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "dependency.name_dependency",
        label: "Facultad",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "active_group",
        label: "Estado",
        options: {
          filter: true,
          sort: true,
          customBodyRender: value => {
            return (
              <Chip
                label={value === 1 ? "Activo" : "Inactivo"}
                color={value === 1 ? "primary" : "secondary"}
              ></Chip>
            );
          }
        }
      }
    ];

    const data = this.props.datas;
    const isLoading = this.props.onLoading;
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      textLabels: {
        body: {
          noMatch: "Lo sentimos, no se han encontrado registros",
          toolTip: "Ordenar",
          columnHeaderTooltip: column => `Ordenar por ${column.label}`
        },
        pagination: {
          next: "Página siguiente",
          previous: "Página anterior",
          rowsPerPage: "Filas por página:",
          displayRows: "de"
        },
        toolbar: {
          search: "Buscar",
          downloadCsv: "Descargar CSV",
          print: "Imprimir",
          viewColumns: "Ver Columnas",
          filterTable: "Filtrar Tabla"
        },
        filter: {
          all: "Todo",
          title: "FILTRADO",
          reset: "RESETEAR"
        },
        viewColumns: {
          title: "Mostrar Columnas",
          titleAria: "Mostrar/Ocultar Table Columns"
        },
        selectedRows: {
          text: "fila(s) seleccionada(s)",
          delete: "Borrar",
          deleteAria: "Delete Selected Rows"
        }
      }
    };

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Lista de grupos de investigación
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

export default GroupsTable;
