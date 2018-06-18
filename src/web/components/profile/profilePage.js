import React from 'react';
import Auth from '../../Auth';
import { Redirect } from 'react-router';
import MatchRow from '../match/matchRow';
import axios from "axios/index";

export default class MatchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: new Auth().isAuthenticated(),
      userId: undefined,
      matches: []
    };
  }

  componentWillMount() {
    const isAuthenticated = this.state.isAuthenticated;

    if (isAuthenticated) {
      new Auth().getUserId().then(userId => {
        this.setState({
          isAuthenticated: isAuthenticated,
          userId
        });

        axios.get(`/api/user/${userId}`)
          .then(response => response.data.properties.matches)
          .then(matches => this.setState({matches}));
      });
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    return (
      <div>
        <div className="container-fluid">
          <h2>Predictions</h2>
          {this.state.matches.map(x =>
            <MatchRow key={x.id} match={x}/>
          )}
        </div>
      </div>
    );
  }
}
