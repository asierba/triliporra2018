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
      .then(users => users.sort((a, b) => b.points - a.points))
      .then(users => this.setState({users}));
  }
  render() {
    return (
      <div className="container-fluid">
        <h2>Classification</h2>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Points</th>
          </tr>
          </thead>
          <tbody>
          {this.state.users.map((user,index) =>
            <tr key={user.id}>
              <th>{index+1}</th>
              <td><NavLink  to={`/user-${user.id}`}>User {index+1}</NavLink>
              </td>
              <td>
              {user.points}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}
