import React from "react";
import axios from "axios/index";
import { NavLink } from "react-router-dom";

export default class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("/api/user")
      .then(response => response.data.entities)
      .then(users => this.setState({users}));
  }
  render() {
    return (
      <div className="container-fluid">
        <h2>All users</h2>
        <ul>
        {this.state.users.map((user,index) =>
          <li key={user.id}>
            <NavLink activeClassName="active" className="nav-link" to={`/user-${user.id}`}>User {index+1}</NavLink>
            </li>
        )}
        </ul>
      </div>
    );
  }
}
