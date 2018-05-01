import React from 'react';
import { Route } from "react-router-dom";
import HomePage from './home/homePage';
import MatchesPage from './match/matchListPage';

export default function Routes(props) {
    return (
    <div>
        <Route exact path="/" component={HomePage}/>
        <Route path="/matches" component={MatchesPage}/>
    </div>);
}