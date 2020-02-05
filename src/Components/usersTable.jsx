import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

class UsersTable extends Component {
  state = {};

  render() {
    const columns = [
      {
        name: "id_person",
        label: "cedula",
        options: {
          filter: false,
          display: "excluded"
        }
      },
      {
        name: "names_person",
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
                {value} {tableMeta.rowData[2]}
              </Link>
            );
          }
        }
      },
      {
        name: "lastnames_person",
        label: "Apellido",
        options: {
          display: "excluded",
          filter: true,
          sort: true
        }
      },
      {
        name: "email",
        label: "Correo",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "state",
        label: "State",
        options: {
          filter: true,
          sort: true
        }
      }
    ];

    const data = this.props.datas;

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

    return (
      <MUIDataTable
        title={"Lista de usuarios"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default UsersTable;
