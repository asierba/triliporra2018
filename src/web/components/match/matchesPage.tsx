import './style.css';
import * as React from 'react';
import axios from 'axios';
import MatchRow from './matchRow';
import * as Day from '../../day';

const filter = hidePastMatches => matches => {
  if(!hidePastMatches)
    return matches;

  return matches.filter(match => Day.isToday(match.date) || !Day.isInThePast(match.date));
}

export default class MatchesPage extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      hidePastMatches: props.hidePastMatches
    };
  }

  componentDidMount() {
    axios.get("/api/match")
      .then(response => response.data.entities)
      .then(filter(this.state.hidePastMatches))
      .then(matches => this.setState({matches}));
  }

  render() {
    const header = this.state.hidePastMatches ? 'Upcoming matches' : 'All matches';

    return (
      <div className="container-fluid">
        <h2>{header}</h2>
        {this.state.matches.map(x =>
          <MatchRow key={x.id} match={x}/>
        )}
      </div>
    );
  }
}
