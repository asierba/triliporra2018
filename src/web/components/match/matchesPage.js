import './style.css';
import React from 'react';
import axios from 'axios';
import MatchRow from './matchRow';

export default class MatchesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    axios.get("/api/match")
      .then(response => response.data.entities)
      .then(matches => this.setState({matches}));
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
