import React from 'react';
import TeamFlag from './teamFlag';
import axios from 'axios';
import * as Day from '../../day';

export default class MatchRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      match : props.match,
      displayPrediction : props.displayPrediction,
      userId: props.userId,
      editingIsEnabled : props.editingIsEnabled
    };
  }

  changesAreAllowed() {
    return this.state.editingIsEnabled && !Day.isInThePast(this.state.match.date);
  }

  onChange(event) {
    const match = this.state.match;

    if (!this.changesAreAllowed()) return;

    const value = event.target.value;
    match.prediction = value;

    this.setState( { match :match });

    const prediction = value;
    const userId = this.state.userId;
    axios.patch(`/api/user/${userId}/match/${match.id}`, { prediction})
  }

  displayPrediction() {
    const match = this.state.match;

    if (!this.state.displayPrediction)
      return;

    return <div className="col">
      <select data-id="prediction" onChange={this.onChange.bind(this)}
              value={match.prediction} disabled={!this.changesAreAllowed()}>
        <option> -- choose result --</option>
        <option value="home">{match.home}</option>
        <option value="draw">draw</option>
        <option value="away">{match.away}</option>
      </select> {showPredictionResult(match)}
    </div>;
  }

  showScore() {
    const printResult = score => `${score.home}-${score.away}`;
    
    const score = this.state.match.score;
    if (!score) {
      return "vs";
    }

    if (!score.penalties) {
      return printResult(score);
    }

    return `${printResult(score)} (${printResult(score.penalties)})`;
  }

  showDate() {
    const dateAsString = this.state.match.date;
    const date = new Date(dateAsString);
    var options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return date.toLocaleString('en-US', options);
  }

  render() {
    const match = this.state.match;

    return (
      <div className={"row align-items-center rounded match-row " +
      (Day.isToday(match.date) ? "match-today" : "")}>
        <div className="col">
          <span className="float-right"><span data-id="home">{match.home}</span> <TeamFlag name={match.home}/></span>
        </div>
        <div className="col-1">
          <span data-id="score">{this.showScore()}</span>
        </div>
        <div className="col">
          <TeamFlag name={match.away}/> <span data-id="away">{match.away}</span>
        </div>
        <div className="col">
          {this.showDate()}
        </div>
        <div className="col">
          <span className="float-right stage" data-id="stage">{match.stage}</span>
        </div>
        { this.displayPrediction()}
      </div>
    );
  }
}
function showPredictionResult(match) {
  switch (match.result) {
    case 'guessed': return <i className="fas guessed-prediction" data-id="prediction-result"></i>;
    case 'missed': return <i className="fas missed-prediction" data-id="prediction-result"></i>;
    default: return <span data-id="prediction-result"></span>;

  }
}
