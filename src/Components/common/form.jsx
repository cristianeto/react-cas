import React, { Component } from "react";
// import Joi from "joi-browser";

import Input from "./input";
import MySelect from "./select";
import MyMultiSelect from "./multiSelect";
import Textarea from "./textarea";
import Button from "@material-ui/core/Button";

class Form extends Component {
  state = {
    data: {}
    // errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const { error } = this.schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    //Retornando un error
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.value;
    console.log(data[input.name]);
    this.setState({ data, errors });
    console.log(this.state.data);
  };

  renderButton(label) {
    let validation;
    this.validate() === null ? (validation = false) : (validation = true);

    return (
      // <button disabled={this.validate()} className="btn btn-primary">
      //   {label}
      // </button>

      <Button
        disabled={validation}
        type="submit"
        size="medium"
        variant="contained"
        color="primary"
      >
        {label}
      </Button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderTextarea(name, label) {
    const { data, errors } = this.state;

    return (
      <Textarea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelect(name, label, property, options) {
    const { data, errors } = this.state;

    return (
      <MySelect
        name={name}
        value={data[name]}
        label={label}
        property={property}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderMultiSelect(name, label, property, options) {
    const { data, errors } = this.state;

    return (
      <MyMultiSelect
        name={[name]}
        value={[data[name]]}
        label={label}
        property={property}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
