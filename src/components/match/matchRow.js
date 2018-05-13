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
  return (<div className="col-md-12">
    <div className="sportsmagazine-fixture-wrap">
      <div className="sportsmagazine-teams-match">
        <div className="sportsmagazine-first-team">
          <TeamFlag name={match.home}/>
          <div className="sportsmagazine-first-team-info">
            <h6>{match.home}</h6>
          </div>
        </div>
        <div className="sportsmagazine-match-view">
          <h5 class="stage">{match.stage}</h5>
          <span>{showScore(match.score)}</span>
        </div>
        <div className="sportsmagazine-second-team">
          <TeamFlag name={match.away}/>
          <div className="sportsmagazine-second-team-info">
            <h6>{match.away}</h6>
          </div>
        </div>
      </div>
      <div className="sportsmagazine-buy-ticket">
        <div className="sportsmagazine-buy-ticket-text">
          <h5>{showDate(match.date)}</h5>
        </div>
      </div>
    </div>
  </div>);
}
