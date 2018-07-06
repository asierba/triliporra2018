import React from 'react';
import Auth from '../../Auth';
import { Redirect } from 'react-router';
import UserProfile from './userProfile';

const auth = new Auth();

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: auth.isAuthenticated(),
      userId: undefined,
    };
  }

  async componentWillMount() {
    const isAuthenticated = this.state.isAuthenticated;
    if (isAuthenticated) {
      let userId = await auth.getUserId();
      this.setState({
        isAuthenticated: isAuthenticated,
        userId
      });
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    if (!this.state.userId) {
      return <div>loading user data..</div>;
    }

    return <UserProfile userId={this.state.userId} editingIsEnabled={true}/>;
  }
}
