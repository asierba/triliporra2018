import React from 'react';
import TeamFlag from './teamFlag';

function showScore(score) {
  if (score) {
    return `${score.home}-${score.away}`;
  }
  return "vs";
}

function showDate(dateAsString) {
  let date = new Date(dateAsString);
  var options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  return date.toLocaleString('en-US', options);
}

export default function MatchRow(props) {
  const match = props.match;

  return (
    <div className="row align-items-center rounded match-row">
      <div className="col">
        <span className="float-right">{match.home} <TeamFlag name={match.home}/></span>
      </div>
      <div className="col-1 score">
        <span data-id="score">{showScore(match.score)}</span>
      </div>
      <div className="col">
        <TeamFlag name={match.away}/> {match.away}
      </div>
      <div className="col">
        {showDate(match.date)}
      </div>
      <div className="col">
        <span className="float-right stage">{match.stage}</span>
      </div>
    </div>
  );
}
