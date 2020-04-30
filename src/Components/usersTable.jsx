import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TEXT_LABELS } from "../configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { LinearProgress, Typography } from "@material-ui/core";
import ButtonAdd from "./common/buttonAdd";

class UsersTable extends Component {
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
        name: "id",
        label: "id",
        options: {
          filter: false,
          display: "excluded",
        },
      },
      {
        name: "indentification_card",
        label: "C.I.",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/usuario/${tableMeta.rowData[0]}`}
              >
                {value}
              </Link>
            );
          },
        },
      },
      {
        name: "name",
        label: "Nombre",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "lastname",
        label: "Apellido",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email",
        label: "Correo electrónico",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "created_at",
        label: "Fecha creación",
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
      onRowsDelete: (rowsDeleted) => {
        const data = this.props.datas; //lista
        const usersToDelete = rowsDeleted.data.map((d) => data[d.dataIndex]); //Array de todos
        this.props.onDelete(usersToDelete);
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
              Lista de usuarios <ButtonAdd entity={"usuario"} />
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

export default UsersTable;
