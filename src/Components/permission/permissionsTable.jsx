import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TEXT_LABELS } from "../common/configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography, Tooltip } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

class PermissionsTable extends Component {
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

  render() {
    const { datas } = this.props;
    const columns = [
      {
        name: 'count',
        label: "ID",
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
        name: "name",
        label: "Identificador",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/permiso/${tableMeta.rowData[1]}`}
              >
                {value}
              </Link>
            );
          },
        },
      },
      {
        name: "display_name",
        label: "Nombre",
        options: {
          filter: true,
          sort: true,
        },
      },
      /* {
        name: "guard_name",
        label: "Guard",
        options: {
          filter: true,
          sort: true,
        },
      }, */
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
                    to={`/permiso/${tableMeta.rowData[1]}`}
                  >
                    <EditIcon color={'primary'} />
                  </Link>
                </Tooltip>
              </React.Fragment>
            );
          },
        },
      },
    ];
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      selectableRows: 'none',
      textLabels: TEXT_LABELS,
    };


    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Lista de permisos
            </Typography>
          }
          data={datas}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default PermissionsTable;
