import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "./AddProjectForm";
import { TEXT_LABELS } from "../common/configTable";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { LinearProgress, Typography } from "@material-ui/core";
import { Button, Tooltip } from "@material-ui/core";
import { Add as AddIcon, People as PeopleIcon } from '@material-ui/icons';

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
    const { datas, onLoading } = this.props;
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
                to={`/proyecto/${tableMeta.rowData[0]}`}
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
          sort: true,
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
          customBodyRender: (value, tableMeta) => {
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
              <Tooltip title={`${tableMeta.rowData[1]}`} style={{ cursor: "pointer" }}>
                <span
                >
                  {`${value}`}
                </span>
              </Tooltip>
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
              <Link
                style={{ textDecoration: "none" }}
                to={`/proyecto/${tableMeta.rowData[0]}/miembros`}
              >
                <Tooltip title="Miembros" style={{ cursor: "pointer" }}>
                  <PeopleIcon />
                </Tooltip>
              </Link>
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
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage: 20,
      rowsPerPageOptions: [5, 10, 20],
      textLabels: TEXT_LABELS,
      //selectableRows: "single",
      onRowsDelete: (rowsDeleted) => {
        const items = datas; //lista de todos los proyectos
        const itemsToDelete = rowsDeleted.data.map(
          (item) => items[item.dataIndex]
        ); //Array de todos los proyectos a borrar.
        this.props.onDelete(itemsToDelete);
      },
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
              <br></br>
              {onLoading && <LinearProgress color="secondary" />}
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
