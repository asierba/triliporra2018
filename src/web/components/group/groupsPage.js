import React from 'react';
import axios from "axios";
import Group from './group';

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
        <Group name={group.name} teams={group.teams} key={group.name}/>
      )}
    </div>)
  }
}
