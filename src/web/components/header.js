import React from 'react';
import { Link, NavLink } from "react-router-dom";
import Login from './login/login';
import Auth from "../Auth";

function userIsAuthenticated() {
  return new Auth().isAuthenticated();
}

export default function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img src="images/logo.png" width="160" height="53" alt="logo triliporra"/>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact={true} activeClassName="active" className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/matches">Matches</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/groups">Groups</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/users">Users</NavLink>
          </li>
          <li className={ "nav-item " + (userIsAuthenticated() ? '' : 'hidden') }>
            <NavLink activeClassName="active" className="nav-link" to="/profile">Profile</NavLink>
          </li>
        </ul>
      </div>
      <Login></Login>
    </nav>
  );
};

