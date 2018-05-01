import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as BrowserRouter, Router, Route, Link } from "react-router-dom";

function HomePage(props) {
  return <h1>This is the home page</h1>;
}
function MatchesPage(props) {
  return <h1>List of matches here</h1>;
}

const App = () => (
  <div>
    <nav>
      <ul className="nav nav-tabs">
        <li><Link to="/">Home</Link></li>
        <li><Link to="matches">Matches</Link></li>
      </ul>
    </nav>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/matches" component={MatchesPage}/>
    </div>
  </div>
);

ReactDOM.render(
    (<BrowserRouter>
    <App/>
    </BrowserRouter>),
    document.getElementById('root')
  );

