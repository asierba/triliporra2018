import React from 'react';
import Auth from '../../Auth';
import { Redirect } from 'react-router';
import MatchRow from '../match/matchRow';
import axios from "axios/index";

function getScoreResult(score) {
  if(score === undefined)
    return "---";

  if(score.home > score.away) {
    return "home";
  }
  if(score.home < score.away) {
    return "away";
  }
  return "draw";
}

function getGuessed(matches) {
  return matches.reduce((acc, match) => {
    if (getScoreResult(match.score) === match.prediction)
      return acc + 1;

    return acc;
  }, 0);
}

function getMissed(matches) {
  return matches.reduce((acc, match) => {
    if (getScoreResult(match.score) !== match.prediction
      && match.prediction !== undefined
      && getScoreResult(match.score) !== "---")
      return acc + 1;

    return acc;
  }, 0);
}

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

          <div>
            <span data-id="num-guessed">{getGuessed(this.state.matches)}</span> <i className="fas guessed-prediction"></i> <span data-id="num-missed">{getMissed(this.state.matches)}</span> <i className="fas missed-prediction"></i>
          </div>

          {this.state.matches.map(x =>
            <MatchRow key={x.id} match={x} enablePrediction={true} userId={this.state.userId}/>
          )}


        </div>


      </div>
    );
  }
}
