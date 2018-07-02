import React from 'react';
import TeamFlag from '../match/teamFlag';

export default function Group(props) {
  const name = props.name;
  const teams = props.teams;

  return <div>
    <h4>Group {name}</h4>
    <table className="table">
      <thead>
      <tr>
        <th scope="col" style={{width: '50%'}}>Team</th>
        <th scope="col">MP</th>
        <th scope="col">W</th>
        <th scope="col">L</th>
        <th scope="col">D</th>
        <th scope="col">GS</th>
        <th scope="col">GA</th>
        <th scope="col">GD</th>
        <th scope="col">Pts</th>
      </tr>
      </thead>
      <tbody>
      {teams.map(team =>
        <tr key={team.name}>
          <td><TeamFlag name={team.name} small={true}/> {team.name}</td>
          <td>{team.matchesPlayed}</td>
          <td>{team.wins}</td>
          <td>{team.loses}</td>
          <td>{team.draws}</td>
          <td>{team.goalsScored}</td>
          <td>{team.goalsAgainst}</td>
          <td>{team.goalDifference}</td>
          <td>{team.points}</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
}
