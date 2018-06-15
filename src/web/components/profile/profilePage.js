import React from 'react';
import Auth from '../../Auth';
import { Redirect } from 'react-router';

export default class MatchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: new Auth().isAuthenticated()
    };
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    return (
      <div data-id="profile-page"></div>
    );
  }
}
