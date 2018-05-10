import React from 'react';

function getMatches() {
  const url = "/api/match";
  const xmlHttp = new XMLHttpRequest();
  const async = false;
  xmlHttp.open("GET", url, async);
  xmlHttp.send();

  const response = JSON.parse(xmlHttp.responseText);
  return response.entities;
}

export default class MatchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: getMatches()
    };
  }

  changeScore(matchId, type, event) {
    const value = event.target.value;

    const matches = this.state.matches.map(match => {
      if (match.id === matchId) {
        match.score[type] = value;
      }
      return match;
    })


    this.setState({matches});
  }

  onSave(match) {
    const url = `/api/match/${match.id}`;
    const xmlHttp = new XMLHttpRequest();
    const async = true;
    xmlHttp.open("PATCH", url, async);
    xmlHttp.setRequestHeader("Content-type", "application/json");
    let matchDATA = {
      score : {
        home: match.score.home,
        away: match.score.away
      }
    };
    xmlHttp.send(JSON.stringify(matchDATA));
  }

  render() {
    const li = (match) =>
      (<li>
        {match.date} | <span class="home">{match.home}</span>
        <input type="text" value={match.score.home} onChange={this.changeScore.bind(this, match.id, 'home')} /> -
        <input type="text" value={match.score.away} onChange={this.changeScore.bind(this, match.id, 'away')}  />
        <span class="away">{match.away}</span>
        <input type="submit" value="Save" className="btn btn-default" onClick={this.onSave.bind(this, match)} />
      </li>);

    return (
      <div id="matches">
        <h1>Upcoming matches</h1>
        <ul>
          {this.state.matches.map(li)}
        </ul>
      </div>
    );
  }
}
