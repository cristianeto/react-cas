import React, { Component } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

class UsersTable extends Component {
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
                {value} {tableMeta.rowData[2]}
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
      }
    ];

    const data = this.props.datas;

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20]
    };

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={"Lista de grupos de investigación"}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default UsersTable;
