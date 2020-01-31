import React, { Component } from "react";
import axios from "axios";
import Breadcrumb from "./breadcum";

import { Container, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

class GroupForm extends Component {
  state = {
    data: {
      acronym_group: "",
      active_group: "1",
      code_group: "",
      created_at: "",
      id_dependency: "",
      id_group: "",
      id_groupType: "",
      id_researchCenter: "",
      mission_group: "",
      name_group: "",
      updated_at: "",
      vision_group: ""
    },
    dependencies: []
    // errors: {}
  };

  handleChange = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    // console.log(data);
    this.setState({ data });
  };

  handleSChange = e => {
    console.log("evento select: ", e.target.value);
  };

  async componentDidMount() {
    const res = await axios.get(
      `http://localhost/proyectosinvestigacion/public/api/dependency`
    );
    const dependencies = res.data;
    this.setState({ dependencies });
    console.log("dependencias", dependencies);

    const groupId = this.props.match.params.id;
    if (groupId === "new") return;

    console.log("grupoId: ", groupId);
    //Si no.

    const res2 = await axios.get(
      `http://localhost/proyectosinvestigacion/public/api/group/${groupId}`
    );
    const group = res2.data;
    console.log("grupo: ", group);
    if (!group) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(group) });
  }

  mapToViewModel(group) {
    return {
      acronym_group: group.acronym_group,
      active_group: group.active_group,
      code_group: group.code_group,
      created_at: group.created_at,
      id_dependency: group.id_dependency,
      id_group: group.id_group,
      id_groupType: group.id_groupType,
      id_researchCenter: group.id_researchCenter,
      mission_group: group.mission_group,
      name_group: group.name_group,
      updated_at: group.updated_at,
      vision_group: group.vision_group
    };
  }

  render() {
    const { data } = this.state;
    const listBreadcrumbs = [
      {
        path: "grupos-investigación",
        label: "Grupos Investigación"
      }
    ];
    return (
      <Container maxWidth="xl">
        <Breadcrumb onListBreadcrumbs={listBreadcrumbs} lastLabel={"Grupo"} />
        <h1>
          Grupo: <small>{data.acronym_group}</small>
        </h1>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <TextField
              required
              id="code_group"
              name="code_group"
              label="Código"
              value={data.code_group}
              style={{ marginRight: "1em" }}
              margin="normal"
              onChange={this.handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              required
              id="acronym_group"
              name="acronym_group"
              label="Siglas"
              value={data.acronym_group}
              style={{ marginRight: "1em" }}
              margin="normal"
              onChange={this.handleChange}
              variant="outlined"
              size="small"
            />
          </div>
          <TextField
            required
            id="name_group"
            name="name_group"
            label="Nombre"
            value={data.name_group}
            placeholder="Ingrese el nombre del grupo"
            helperText="EN MAYÚSUCULAS"
            fullWidth
            margin="normal"
            onChange={this.handleChange}
            variant="outlined"
            size="small"
          />
          <TextField
            id="mission_group"
            label="Misión"
            name="mission_group"
            multiline
            rowsMax="4"
            value={data.mission_group}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            variant="outlined"
            required
            size="small"
          />
          <TextField
            id="vision_group"
            label="Visión"
            name="vision_group"
            multiline
            rowsMax="4"
            value={data.vision_group}
            style={{ marginTop: "1em", width: "100%" }}
            onChange={this.handleChange}
            variant="outlined"
            required
            size="small"
          />
          <FormControl
            required
            variant="outlined"
            style={{ marginTop: "2em", marginRight: "1em", width: "50%" }}
            size="small"
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Facultad
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="id_dependency"
              name="id_dependency"
              value={data.id_dependency}
              onChange={this.handleChange}
              labelWidth={75}
            >
              <MenuItem value="">
                <em>Seleccione una dependencia</em>
              </MenuItem>
              {this.state.dependencies.map(dependency => (
                <MenuItem
                  value={dependency.id_dependency}
                  key={dependency.id_dependency}
                >
                  {dependency.name_dependency}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Requerida</FormHelperText>
          </FormControl>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            style={{ marginTop: "1em", display: "flex", flexWrap: "wrap" }}
          >
            Guardar
          </Button>
        </form>
      </Container>
    );
  }
}

export default GroupForm;
