import React from 'react';
import Auth from '../../Auth';
import { Redirect } from 'react-router';
import MatchRow from '../match/matchRow';
import axios from "axios/index";

function scrollToToday() {
  function findPosition(element) {
    var curtop = 0;
    if (element.offsetParent) {
      do {
        curtop += element.offsetTop;
      } while (element = element.offsetParent);
      return [curtop];
    }
  }

  const todayMatch = document.getElementsByClassName("match-today")[0];
  if (todayMatch) {
    window.scroll(0,findPosition(todayMatch));
  }
}

function getScoreResult(score) {
  if (score.home > score.away) {
    return "home";
  }
  if (score.home < score.away) {
    return "away";
  }
  return "draw";
}

function countGuessedMatches(matches) {
  return matches.reduce((acc, match) => {
    if (match.score === undefined || match.prediction === undefined)
      return acc;

    if (getScoreResult(match.score) === match.prediction)
      return acc + 1;

    return acc;
  }, 0);
}

function countMissedMatches(matches) {
  return matches.reduce((acc, match) => {
    if (match.score === undefined || match.prediction === undefined)
      return acc;

    if (getScoreResult(match.score) !== match.prediction)
      return acc + 1;

    return acc;
  }, 0);
}

export default class ProfilePage extends React.Component {
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
          <button type="button" className="float-right btn btn-secondary today-button" onClick={scrollToToday}>go to today</button>
          <h2>Predictions</h2>
          <div>
            <span data-id="num-guessed">{countGuessedMatches(this.state.matches)}</span> <i className="fas guessed-prediction"></i> <span data-id="num-missed">{countMissedMatches(this.state.matches)}</span> <i className="fas missed-prediction"></i>
          </div>

          {this.state.matches.map(x =>
            <MatchRow key={x.id}
                      match={x}
                      editingIsEnabled={true}
                      displayPrediction={true}
                      userId={this.state.userId}/>
          )}
        </div>
      </div>
    );
  }
}
