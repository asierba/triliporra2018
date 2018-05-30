import React from 'react';
import Auth from "./Auth";
import { withRouter } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
  }

  render() {
    let action, text;
    if (this.auth.isAuthenticated()) {
      action = () => {
        this.auth.logout();
        this.props.history.push('/');
      };
      text = 'logout';
    }
    else {
      action = () => {
        this.auth.login();
      }
      text = 'login';

    }

    return (
      <button type="button" className="btn btn-light" onClick={action}>
        {text}
      </button>
    )
  }


}

export default withRouter(Login);
