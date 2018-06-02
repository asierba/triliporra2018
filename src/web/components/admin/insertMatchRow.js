import axios from "axios/index";
import React from "react";

function showDate(dateAsString) {
  const date = new Date(dateAsString);
  var options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  return date.toLocaleString('en-US', options);
}

function onSave(match) {
  axios.patch(`/api/match/${match.id}`, {
    score : {
      home: match.score.home,
      away: match.score.away
    }
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
    match.score[type] = value;

    this.setState( { match :match });
  }

  render() {
    const inputStyle = {
      width: "30px"
    };
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
        </td>
        <td>{showDate(this.state.match.date)}</td>
        <td><input type="submit" data-id="save-match" value="Save" className="btn btn-primary"
                   onClick={onSave.bind(this, this.state.match)}/></td>
      </tr>);
  }
}
