import React, { Component } from "react";
import Breadcrumb from "../common/breadcum";
import ProjectForm from "./projectForm";
import { Container, Paper, Grid } from "@material-ui/core";

class Project extends Component {
  state = {};

  render() {
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/proyectos",
        label: "Proyectos",
      },
    ];

    const classes = {
      paper: {
        padding: "2em",
        color: "secondary",
      },
    };
    return (
      <Container maxWidth="lg">
        <Breadcrumb
          onListBreadcrumbs={listBreadcrumbs}
          lastLabel={"Proyecto"}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={8}>
            <Paper style={classes.paper}>
              <ProjectForm
                projectId={this.props.match.params.id}
                history={this.props.history}
              />
            </Paper>
          </Grid>
          <Grid container item xs={12} sm={5} md={4} spacing={3}>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}>
                {/* <Panel
                  id="id_researchLine"
                  property="name_researchLine"
                  title="Líneas de Investigación"
                  data={this.state.data["id_researchLine"]}
                /> */}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}>
                {/* <Panel
                  id="id_program"
                  property="name_program"
                  title="Programas"
                  data={this.state.data["id_program"]}
                /> */}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper style={classes.paper}></Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Project;
