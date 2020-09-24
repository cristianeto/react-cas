import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "./AddProjectForm";
import { TEXT_LABELS } from "../common/configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography, Button, Tooltip } from "@material-ui/core";
import { Add as AddIcon, People as PeopleIcon } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

class ProjectsTable extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
        name: "slug",
        label: "slug",
        options: {
          filter: false,
          display: "excluded",
        },
      },
      {
        name: "updated_at",
        label: "Fecha Actualización",
        options: {
          filter: false,
          display: "excluded",
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
                to={`/proyecto/${tableMeta.rowData[2]}`}
              >
                {value}
              </Link>
            );
          },
        },
      },
      {
        name: "startDate",
        label: "Fecha Inicio",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "endDate",
        label: "Fecha Final",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "year",
        label: "Año",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "program.name",
        label: "Programa",
        options: {
          filter: true,
          display: 'excluded',
        },
      },
      {
        name: "research_type.name",
        label: "Tipo",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "coverage_type.name",
        label: "Cobertura",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "users",
        label: "Miembros",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            let fullnames = value.map(v =>
              v.fullname
            )
            return (
              <React.Fragment>
                {fullnames.join(", ")}
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "human_updated_at",
        label: "Última Actualización",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <React.Fragment>
                <Tooltip title={`${tableMeta.rowData[3]}`} style={{ cursor: "pointer" }}>
                  <span
                  >
                    {`${value}`}
                  </span>
                </Tooltip>
              </React.Fragment>

            );
          },
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
                <Link
                  style={{ textDecoration: "none", color: '#fff' }}
                  to={`/proyecto/${tableMeta.rowData[2]}/miembros`}
                >
                  <Tooltip title="Miembros" style={{ cursor: "pointer" }}>
                    <PeopleIcon color={'primary'} />
                  </Tooltip>
                </Link>
                <Tooltip title="Eliminar" style={{ cursor: "pointer" }}>
                  <DeleteIcon onClick={() => onDelete(tableMeta.rowData[2])} color={'primary'} />
                </Tooltip>
              </React.Fragment>
            );
          },
        },
      },
    ];
    const options = {
      /* search: false,
      print: false,
      download: false,
      filter: false,
      viewColumns: false, */
      enableNestedDataAccess: [],
      sort: true,
      searchPlaceholder: 'Buscar',
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 20,
      rowsPerPageOptions: [5, 10, 20],
      selectableRows: 'none',
      textLabels: TEXT_LABELS,
      //selectableRows: "single",
      /* onRowsDelete: (rowsDeleted) => {
        const items = datas; //lista de todos los proyectos
        const itemsToDelete = rowsDeleted.data.map(
          (item) => items[item.dataIndex]
        ); //Array de todos los proyectos a borrar.
        this.props.onDelete(itemsToDelete);
      }, */
    };
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Lista de proyectos
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
                startIcon={<AddIcon />}
              >
                Nuevo proyecto
              </Button>
            </Typography>
          }
          data={datas}
          columns={columns}
          options={options}
          responsive={"scrollFullHeight"}
        />
        <AddProjectForm open={this.state.open} onClose={this.handleClose} history={this.props.history} />
      </MuiThemeProvider>
    );
  }
}

export default ProjectsTable;
