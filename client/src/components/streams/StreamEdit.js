import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    // console.log(this.props);
    // don't get stream from redux store but make API call
    // again by calling the Action Creator
    // calling fetchStream requires connect and mapStateToPropsMethod
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    // initialValues is used to inject values into StreamForm
    // only send title and description, exclude id and userid
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// get stream from redux store and set it into the component props object
// state is from redux-store
// ownProps is same as props that component has
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

// connect component to Action Creator
export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
