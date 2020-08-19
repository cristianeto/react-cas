import React, { Component } from "react";
import ProjectForm from "./projectForm";

class Project extends Component {
  state = {};

  render() {
    return (

      <ProjectForm
        projectSlug={this.props.match.params.slug}
        history={this.props.history}
      />
    );
  }
}

export default Project;
