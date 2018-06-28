import React from 'react';
import axios from "axios/index";
import TeamFlag from '../match/teamFlag';

export default class Routes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groups : []
    }
  }

  componentDidMount() {
    axios.get("/api/group")
      .then(response => response.data.entities)
      .then(groups => this.setState({groups}));
  }

  render() {
    return (
      <div className="container-fluid">
      {this.state.groups.map(group =>
        <div key={group.name}>
        <h4>Group {group.name}</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{width: '50%'}}>Team</th>
              <th scope="col">MP</th>
              <th scope="col">W</th>
              <th scope="col">L</th>
              <th scope="col">D</th>
              <th scope="col">Pts</th>
            </tr>
          </thead>
          <tbody>
          {group.teams.map(team =>
            <tr key={team.name}>
              <td><TeamFlag name={team.name} small={true} /> {team.name}</td>
              <td>{team.matchesPlayed}</td>
              <td>{team.wins}</td>
              <td>{team.loses}</td>
              <td>{team.draws}</td>
              <td>{team.points}</td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
        )}
    </div>)
  }
}
