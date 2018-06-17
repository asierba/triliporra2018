import React from 'react';
import TeamFlag from './teamFlag';

function showScore(score) {
  if (score) {
    return `${score.home}-${score.away}`;
  }
  return "vs";
}

function showDate(dateAsString) {
  const date = new Date(dateAsString);
  var options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  return date.toLocaleString('en-US', options);
}

function isToday(dateAsString) {
  const date = new Date(dateAsString);
  const now = new Date();

  return date.setHours(0,0,0,0) == now.setHours(0,0,0,0);
}

export default function MatchRow(props) {
  const match = props.match;

  return (
    <div className={"row align-items-center rounded match-row " +
      (isToday(match.date) ? "match-today":"")} >
      <div className="col">
        <span className="float-right"><span data-id="home">{match.home}</span> <TeamFlag name={match.home}/></span>
      </div>
      <div className="col-1 score">
        <span data-id="score">{showScore(match.score)}</span>
      </div>
      <div className="col">
        <TeamFlag name={match.away}/> <span data-id="away">{match.away}</span>
      </div>
      <div className="col">
        {showDate(match.date)}
      </div>
      <div className="col">
        <span className="float-right stage" data-id="stage">{match.stage}</span>
      </div>
    </div>
  );
}
