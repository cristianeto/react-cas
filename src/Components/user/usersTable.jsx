import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TEXT_LABELS } from "../common/configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography, Tooltip } from "@material-ui/core";
import ButtonAdd from "../common/buttonAdd";
import DeleteIcon from '@material-ui/icons/Delete';

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
    const { datas, onDelete } = this.props;
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
        name: "identification_card",
        label: "Cédula",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/usuario/${tableMeta.rowData[1]}`}
              >
                {value}
              </Link>
            );
          },
        },
      },
      {
        name: "fullname",
        label: "Nombre",
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
        name: "roles",
        label: "Roles",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            let nameRoles = value.map(v =>
              v.name
            )
            return (
              <React.Fragment>
                {nameRoles.join(", ")}
              </React.Fragment>
            );
          },
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
      {
        name: "human_updated_at",
        label: "Última actualización",
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
                <Tooltip title="Eliminar" style={{ cursor: "pointer" }}>
                  <DeleteIcon onClick={() => onDelete(tableMeta.rowData[1])} color={'primary'} />
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
              Lista de usuarios <ButtonAdd entity={"usuario"} />
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

export default UsersTable;
