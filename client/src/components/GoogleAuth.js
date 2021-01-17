import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    // FYI: Google API keeps me signed-in until I sign out.
    // gapi is available on window
    window.gapi.load("client:auth2", () => {
      // Go go https://console.developers.google.com/apis/credentials?project=lyrical-ward-249417 to create new project
      // and generate new clientId
      // https://developers.google.com/identity/sign-in/web/reference#authentication
      window.gapi.client
        .init({
          clientId:
            "136748314444-650gfmvcevjqsgd8n8rql2jt42ik0j7k.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          // This line will allow us to wait and change text in header when user sign's in and out
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    // call Action creators anytime auth changes
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

// this is called after reducer
const mapStateToProps = state => {
  // console.log(`googleauth - state=${JSON.stringify(state)}`);
  // state={"auth":{"isSignedIn":true,"userId":"100709912720081473122"}}
  // changing state triggers the render() method
  // 'auth' is declared in '../reducers/index.js
  return { isSignedIn: state.auth.isSignedIn };
};

// The connect() function connects a React component to a Redux store.
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
