import React from 'react';


const url = "/api/match";
const xmlhttp = new XMLHttpRequest();
const async = false;
xmlhttp.open("GET", url, async);
xmlhttp.send();

const response=JSON.parse(xmlhttp.responseText);

export default function MatchesPage(props) {
  return {
    state: {
      matches: response.entities
    },
    render: function() {
      const li = (match) => <li>{match.home} vs {match.away} - {match.date}</li>;

      return (
        <div>
          <h1>Upcoming matches</h1>
          <ul>
            {this.state.matches.map(li)}
          </ul>
        </div>
      );
    },

  }
}
