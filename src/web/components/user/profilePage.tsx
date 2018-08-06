import * as React from 'react';
import Auth from '../../Auth';
import { Redirect } from 'react-router';
import UserProfile from './userProfile';

export default class ProfilePage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: new Auth().isAuthenticated(),
      userId: undefined,
    };
  }

  async componentWillMount() {
    const isAuthenticated = this.state.isAuthenticated;
    if (isAuthenticated) {
      let userId = await new Auth().getUserId();
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
