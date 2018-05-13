import React from 'react';
import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
    return (
      
      <header id="sportsmagazine-header" className="sportsmagazine-header-one">
        <div className="sportsmagazine-topstrip">
          <div className="container">
            <div className="row">
              <aside className="col-md-4">
                <ul className="sportsmagazine-social-network">
                  <li><a href="#" className="sportsmagazine-colorhover fa fa-facebook-official" /></li>
                  <li><a href="#" className="sportsmagazine-colorhover fa fa-twitter-square" /></li>
                  <li><a href="#" className="sportsmagazine-colorhover fa fa-linkedin-square" /></li>
                  <li><a href="#" className="sportsmagazine-colorhover fa fa-google-plus-square" /></li>
                </ul>
              </aside>
              <aside className="col-md-8">
                <ul className="sportsmagazine-user-section">
                  <li><i className="fa fa-user" /> <a href="#">Login</a></li>
                  <li><i className="fa fa-sign-in" /> <a href="#">Sign Up</a></li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
        <div className="sportsmagazine-main-header">
          <div className="container">
            <div className="row">
              <aside className="col-md-2">
                <Link to="/" className="sportsmagazine-logo"><img src="images/logo-3.png" alt="logo" /></Link>
              </aside>
              <div className="col-md-10">
                <div className="sportsmagazine-right-section">
                  <nav className="navbar navbar-default">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="true">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li>
                          <NavLink exact={true} activeClassName="active" to="/">Home</NavLink>
                        </li>
                        <li className="sportsmagazine-megamenu-li">
                          <NavLink activeClassName="active" to="/matches">Matches</NavLink>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
};

