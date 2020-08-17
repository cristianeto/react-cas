import React, { Component } from "react";
import ProjectForm from "./projectForm";

class Project extends Component {
  state = {};

  render() {
    return (

      <ProjectForm
        projectId={this.props.match.params.id}
        history={this.props.history}
      />
    );
  }
}

export default Project;
