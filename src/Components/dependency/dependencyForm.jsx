import React from "react";
import Joi from "@hapi/joi";
import { withSnackbar } from "notistack";
import Breadcrumb from "../common/breadcum";
import Form from "../common/form";
import { getDependencyTypes } from "../../services/dependencyTypeService";
import {
  getDependency,
  saveDependency,
} from "../../services/dependencyService";
import { Container, Paper, Grid } from "@material-ui/core";
import TitleForm from "../common/titleForm";
class DependencyForm extends Form {
  state = {
    data: {
      name: "",
      acronym: "",
      contact: "",
      city: "",
      email: "",
      web: "",
      phone: "",
      participation_type: "",
      dependency_type_id: "",
    },
    dependencyTypes: [],

    errors: {},
    isLoading: false,
  };

  schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().label("Nombre").max(500),
    acronym: Joi.string().alphanum().label("Sigla").max(10),
    contact: Joi.string().allow("", null).label("Contacto").max(150),
    city: Joi.string().allow("", null).label("Ciudad").max(100),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "espoch", "edu", "ec"] },
      })
      .label("Correo")
      .max(100),
    web: Joi.string().allow("", null).uri().label("Web").max(100),
    phone: Joi.string()
      .allow("", null)
      .label("Teléfono")
      .min(7)
      .max(20),
    participation_type: Joi.string()
      .allow("", null)
      .label("Tipo participación")
      .max(500),
    dependency_type_id: Joi.number().integer().label("Tipo dependencia"),
  });

  async populateDependencyTypes() {
    const { data: dependencyTypes } = await getDependencyTypes();
    this.setState({ dependencyTypes });
  }
  async populateDependency() {
    try {
      const dependencyId = this.props.match.params.id; //Pasando por URL id movie
      if (dependencyId === "new") return; //Si si
      const { data: dependency } = await getDependency(dependencyId); //Si no.
      this.setState({ data: this.mapToViewModel(dependency) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.enqueueSnackbar(ex.response.data.message, {
          variant: "error",
        });
      }
      this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.populateDependencyTypes();
    await this.populateDependency();
    this.setState({ isLoading: false });
  }

  mapToViewModel(dependency) {
    return {
      id: dependency.id,
      name: dependency.name,
      acronym: dependency.acronym,
      contact: dependency.contact,
      city: dependency.city,
      email: dependency.email,
      web: dependency.web,
      phone: dependency.phone,
      participation_type: dependency.participation_type,
      dependency_type_id: dependency.dependency_type_id,
    };
  }
  doSubmit = async () => {
    try {
      await saveDependency(this.state.data);
      this.props.enqueueSnackbar(`Registro guardado correctamente!`, {
        variant: "success",
      });
      this.props.history.push("/dependencias");
    } catch (ex) {
      this.props.enqueueSnackbar(`${ex.response.data.message}`, {
        variant: "error",
      });
    }
  };

  render() {
    const { isLoading, dependencyTypes } = this.state;
    const listBreadcrumbs = [
      {
        path: "/",
        label: "Inicio",
      },
      {
        path: "/dependencias",
        label: "Dependencias",
      },
    ];

    return (
      <Container maxWidth="lg">
        <Breadcrumb
          onListBreadcrumbs={listBreadcrumbs}
          lastLabel={"Dependencia"}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={8}>
            <Paper className="paper">
              <TitleForm entity={"Dependencia"} isLoading={isLoading} />
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Nombre")}
                {this.renderInput("acronym", "Sigla")}
                {this.renderInput("contact", "Contacto")}
                {this.renderInput("city", "Ciudad")}
                {this.renderInput("email", "Correo")}
                {this.renderInput("web", "Sitio web")}
                {this.renderInput("phone", "Teléfono")}
                {this.renderTextarea(
                  "participation_type",
                  "Tipo participación"
                )}
                {this.renderSelect(
                  "dependency_type_id",
                  "Tipo de dependencia",
                  160,
                  "id",
                  "name",
                  dependencyTypes
                )}

                {this.renderButton("Guardar")}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withSnackbar(DependencyForm);
