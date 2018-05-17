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

function addScore(matches) {
  return matches.map(x => Object.assign({score: {}}, x));
}

function showDate(dateAsString) {
  let date = new Date(dateAsString);
  var options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  return date.toLocaleString('en-US', options);
}

export default class InsertMatchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: addScore(getMatches())
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
    const inputStyle = {
      width: "30px"
    }

    const tr = (match) =>
      (<tr key={match.id}>
        <td>{match.home} vs {match.away}</td>
        <td>
          <input type="text" style={inputStyle} value={match.score.home} onChange={this.changeScore.bind(this, match.id, 'home')}/> -
           <input type="text" style={inputStyle} value={match.score.away} onChange={this.changeScore.bind(this, match.id, 'away')}/>
        </td>
        <td>{showDate(match.date)}</td>
        <td><input type="submit" value="Save" className="btn btn-primary" onClick={this.onSave.bind(this, match)}/></td>
      </tr>);

    return (
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Match</th>
          <th scope="col">Result</th>
          <th scope="col">Date</th>
        </tr>
        </thead>
        <tbody>
          {this.state.matches.map(tr)}
        </tbody>
      </table>
    );
  }
}
