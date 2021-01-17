import React from "react";
// Field is a React Component, reduxForm is a function like connect from react-redux library
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      // assign all values from formProps.input to <input/>
      // <input {...input} />
      // above line is same as three lines below
      // <input
      //   onChange={formProps.input.onChange}
      //   value={formProps.input.value}
      // />
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    // invoke caller's callback!
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      // redux-form's handleSubmit is going to call onSubmit
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    // this message is sent to component={this.renderInput} in <input>
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

// Note reduxForm wraps the StreamForm
export default reduxForm({ form: "streamForm", validate: validate })(
  StreamForm
);
