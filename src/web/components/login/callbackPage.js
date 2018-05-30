import React from 'react';
import Auth from './Auth';
import {withRouter} from "react-router";

class CallbackPage extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
  }

  componentWillMount() {
    this.auth.handleAuthentication().then(() => {
      this.props.history.replace('/');
    });
  }

  render() {
    return (
      <div>Logging in progress ..</div>
    )
  }
}

export default withRouter(CallbackPage);

