import React, { Component } from "react";
import Input from "./input";
import MySelect from "./select";
import MyMultiSelect from "./multiSelect";
import Textarea from "./textarea";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import InputDate from "./inputDate";
// import { messages } from "./es_ES.js";
import Radios from '../common/radio';

class Form extends Component {
  state = {
    data: {},
    errors: {},
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

  handleChangeMultiple = (event, values, nameInput) => {
    const input = { name: nameInput, value: values };
    const valueArray = values;
    const data = { ...this.state.data };
    data[nameInput] = valueArray;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };

  handleChangeDate = (date, input) => {
    const jsonDate = { name: input, value: date };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(jsonDate);
    if (errorMessage) errors[input] = errorMessage;
    else delete errors[input];

    const data = { ...this.state.data };
    const formatDate = this.formatDate(new Date(date));
    console.log("formatDate: " + formatDate);
    data[input] = formatDate; //this.formatDate(new Date(date));
    console.log("data[" + input + "]" + data[input]);
    this.setState({ data, errors });
  };

  formatDate(date) {
    try {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    } catch (error) {
      return null;
    }
  }

  renderButton(label) {
    // let validation;
    // this.validate() === null ? (validation = false) : (validation = true);
    return (
      <Button
        disabled={false}
        type="submit"
        size="medium"
        variant="contained"
        color="primary"
        margin="normal"
        startIcon={<SaveIcon />}
        className="btn btn-guardar"
      >
        {label}
      </Button>
    );
  }

  renderInput(name, label, type = "text", disabled = false) {
    const { data, errors } = this.state;

    return (
      <Input
        required={false}
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        disabled={disabled}
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

  renderSelect(name, label, labelWidth, property1, property2, options) {
    const { data, errors } = this.state;

    return (
      <MySelect
        name={name}
        value={data[name]}
        label={label}
        labelWidth={labelWidth}
        property1={property1}
        property2={property2}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderRadio(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Radios
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  renderMultiSelect(name, label, property1, property2, options) {
    const { data, errors } = this.state;
    return (
      <MyMultiSelect
        name={name}
        value={data[name]}
        label={label}
        property1={property1}
        property2={property2}
        optionsSelected={data[name]}
        options={options}
        onChange={this.handleChangeMultiple}
        error={errors[name]}
      />
    );
  }

  renderDatePicker(name, label, minDate, maxDate, disabled) {
    const { data, errors } = this.state;

    return (
      <InputDate
        required={false}
        //type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChangeDate}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        error={errors[name]}
      />
    );
  }

  successMessage() {
    this.props.enqueueSnackbar(`Registro guardado correctamente!`, {
      variant: 'success'
    });
  }

  errorMessage(ex) {
    console.error("Error Message: ", ex)
    this.props.enqueueSnackbar(`${ex.response.data.message}`, {
      variant: "error"
    });
  }
}

export default Form;
