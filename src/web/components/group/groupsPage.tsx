import * as React from "react"
import axios from "axios";
import GroupComponent from './groupComponent';
import {Group} from "./group";

class State {
  groups: Group[];
}

export default class Routes extends React.Component<any, State>  {
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
        <GroupComponent name={group.name} teams={group.teams} key={group.name}/>
      )}
    </div>)
  }
}
