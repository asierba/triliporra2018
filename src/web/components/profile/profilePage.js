import React from 'react';
import Auth from '../../Auth';
import { Redirect } from 'react-router';

export default class MatchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: new Auth().isAuthenticated(),
      userId: undefined
    };
  }

  componentWillMount() {
    const isAuthenticated = this.state.isAuthenticated;

    if (isAuthenticated) {
      new Auth().getUserId().then(userId => {
        this.setState({
          isAuthenticated: isAuthenticated,
          userId
        })
      });
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    return (
      <div>
        <span data-id="user-id">{this.state.userId}</span>
      </div>
    );
  }
}
