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
    <div id="matches">
      <h2 className="col-md-12">Upcoming matches</h2>
      <div className="col-md-12">
        <div className="sportsmagazine-fixture sportsmagazine-fixture-list">
          <ul className="row">
            {this.state.matches.map(x =>
              <MatchRow match={x}/>
            )}
          </ul>
        </div>
      </div>
    </div>
    );
  }
}
