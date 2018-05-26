import './style.css';
import React from 'react';
import MatchRow from './matchRow';

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

  render() {
    return (
      <div className="container-fluid">
        <h2>Upcoming matches</h2>
        {this.state.matches.map(x =>
          <MatchRow key={x.id} match={x}/>
        )}
      </div>
    );
  }
}
