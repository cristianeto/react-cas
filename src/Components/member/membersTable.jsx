import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TEXT_LABELS } from "../common/configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { LinearProgress, Typography } from "@material-ui/core";
import Active from "../common/active";
import ButtonAdd from "../common/buttonAdd";

class MembersTable extends Component {
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

  getStatus = (value) => {
    if (value === 1) {
      return "Activo";
    }
  };
  render() {
    const { datas, onLoading } = this.props
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
        name: "fullname",
        label: "Nombre",
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
        name: "pivot.created_at",
        label: "Miembro desde",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dependency.name_dependency",
        label: "Facultad",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "active_group",
        label: "Estado",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <Active
                actived={value}
                onClick={() => this.props.onActive(tableMeta.rowData[0])}
              />
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
      // selectableRows:'none',
      textLabels: TEXT_LABELS,
      onRowsDelete: (rowsDeleted) => {
        const items = datas; //lista de todos los proyectos
        const itemsToDelete = rowsDeleted.data.map((item) => items[item.dataIndex]); //Array de todos los proyectos a borrar.
        this.props.onDelete(itemsToDelete);
      },
    };


    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Lista de grupos de investigación <ButtonAdd entity={"grupo"} />
              {onLoading && <LinearProgress color="secondary" />}
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

export default MembersTable;
