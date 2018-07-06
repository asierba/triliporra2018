import React from "react";
import axios from "axios/index";
import MatchRow from '../match/matchRow';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      userId: props.userId,
      editingIsEnabled: props.editingIsEnabled,
    }
  }

  componentWillMount() {
    const userId = this.state.userId;
    axios.get(`/api/user/${userId}`)
      .then(response => response.data.properties.matches)
      .then(matches => this.setState({matches}));
  }

  countGuessedMatches() {
    return this.state.matches.reduce((acc, match) => {
      if (match.score === undefined || match.prediction === undefined)
        return acc;

      if (this.getScoreResult(match.score) === match.prediction)
        return acc + 1;

      return acc;
    }, 0);
  }

  countMissedMatches() {
    return this.state.matches.reduce((acc, match) => {
      if (match.score === undefined || match.prediction === undefined)
        return acc;

      if (this.getScoreResult(match.score) !== match.prediction)
        return acc + 1;

      return acc;
    }, 0);
  }

  getScoreResult(score) {
    if (score.home > score.away) {
      return "home";
    }
    if (score.home < score.away) {
      return "away";
    }
    return "draw";
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <button type="button" className="float-right btn btn-secondary today-button" onClick={scrollToToday}>go to today</button>
          <h2>Predictions</h2>
          <div>
            <span data-id="num-guessed">{this.countGuessedMatches()}</span> <i className="fas guessed-prediction"></i> <span data-id="num-missed">{this.countMissedMatches()}</span> <i className="fas missed-prediction"></i>
          </div>

          {this.state.matches.map(x =>
            <MatchRow key={x.id}
                      match={x}
                      editingIsEnabled={this.state.editingIsEnabled}
                      displayPrediction={true}
                      userId={this.state.userId}/>
          )}
        </div>
      </div>
    );
  }
}

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
