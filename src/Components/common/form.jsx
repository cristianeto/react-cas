import React, { Component } from "react";
// import Joi from "joi-browser";

import Input from "./input";
import MySelect from "./select";
import MyMultiSelect from "./multiSelect";
import Textarea from "./textarea";
import Button from "@material-ui/core/Button";

class Form extends Component {
  state = {
    data: {},
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

  handleSubmit = (e) => {
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
    this.setState({ data, errors });
  };

  handleChangeMultiple = ({ target: input }) => {
    const valueArray = input.value;
    const data = { ...this.state.data };
    let entities = this.cloningArray(input.name);
    let newArray = [];
    entities.forEach((entity) => {
      valueArray.forEach((val) => {
        if (entity[input.name] === val) newArray.push(entity);
      });
    });
    data[input.name] = newArray;
    this.setState({ data });
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
        margin="normal"
      >
        {label}
      </Button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        required={false}
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInputDate(name, label, type = "date") {
    const { data, errors } = this.state;

    return (
      <Input
        required={false}
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
  renderSelect(name, label, labelWidth, property, options) {
    const { data, errors } = this.state;

    return (
      <MySelect
        name={name}
        value={data[name]}
        label={label}
        labelWidth={labelWidth}
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
        name={name}
        //value={data[name]}
        label={label}
        property={property}
        optionsSelected={data[name]}
        options={options}
        onChange={this.handleChangeMultiple}
        error={errors[name]}
      />
    );
  }

  /* renderPanel(id, property, title) {
    const { data } = this.state;
    return <Panel id={id} property={property} title={title} data={data[id]} />;
  } */
}

export default Form;
