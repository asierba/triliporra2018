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
    <div class="row align-items-center rounded match-row">
      <div class="col">
        <span class="float-right">{match.home} <TeamFlag name={match.home}/></span>
      </div>
      <div class="col-1 score">
        <span>{showScore(match.score)}</span>
      </div>
      <div class="col">
        <TeamFlag name={match.away}/> {match.away}
      </div>
      <div class="col">
        {showDate(match.date)}
      </div>
      <div class="col">
        <span class="float-right stage">{match.stage}</span>
      </div>
    </div>
  );
}
