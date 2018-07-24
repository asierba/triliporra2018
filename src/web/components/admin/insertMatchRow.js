import axios from "axios/index";
import React from "react";

function showDate(dateAsString) {
  const date = new Date(dateAsString);
  var options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  return date.toLocaleString('en-US', options);
}

function onSave(match) {
  axios.patch(`/api/match/${match.id}`, {
    score : match.score
  });
}

export default class InsertMatchRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { match : props.match }
  }

  changeScore(type, event) {
    const value = event.target.value;

    const match = this.state.match;

    if (type === 'penalties-home') {
      if (!match.score.penalties) match.score.penalties = {};
      match.score.penalties['home'] = value;

    } else if (type === 'penalties-away') {
      if (!match.score.penalties) match.score.penalties = {};
      match.score.penalties['away'] = value;
    }
    else {
      match.score[type] = value;
    }


    this.setState( { match :match });
  }

  render() {
    const inputStyle = {
      width: "30px"
    };

    const penaltiesHome = this.state.match.score.penalties ? this.state.match.score.penalties.home : undefined;
    const penaltiesAway = this.state.match.score.penalties ? this.state.match.score.penalties.away : undefined;
    return (
      <tr key={this.state.match.id}>
        <td>
          <span data-id="home">{this.state.match.home}</span> vs <span data-id="away">{this.state.match.away}</span>
        </td>
        <td>
          <input type="text" data-id="score-home" style={inputStyle} value={this.state.match.score.home}
                 onChange={this.changeScore.bind(this, 'home')}/> -
          <input type="text" data-id="score-away" style={inputStyle} value={this.state.match.score.away}
                 onChange={this.changeScore.bind(this, 'away')}/>

          <input type="text" data-id="penalties-home" style={inputStyle} value={penaltiesHome}
                 onChange={this.changeScore.bind(this, 'penalties-home')}/> -
          <input type="text" data-id="penalties-away" style={inputStyle} value={penaltiesAway}
                 onChange={this.changeScore.bind(this, 'penalties-away')}/>
        </td>
        <td>{showDate(this.state.match.date)}</td>
        <td><input type="submit" data-id="save-match" value="Save" className="btn btn-primary"
                   onClick={onSave.bind(this, this.state.match)}/></td>
      </tr>);
  }
}
