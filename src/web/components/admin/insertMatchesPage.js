import React from 'react';
import axios from 'axios';
import InsertMatchRow from './insertMatchRow';

function withScore(matches) {
  const addEmptyScoreIfNotPresent = match => Object.assign({score: {}}, match);
  return matches.map(addEmptyScoreIfNotPresent);
}

export default class InsertMatchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    axios.get("/api/match")
      .then(response => response.data.entities)
      .then(withScore)
      .then(matches => this.setState({matches}));
  }

  render() {
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
          {this.state.matches.map(match =>
            <InsertMatchRow key={match.id} match={match}/>)}
        </tbody>
      </table>
    );
  }
}
