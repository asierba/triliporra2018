import React from 'react';
import { Route } from "react-router-dom";
import HomePage from './home/homePage';
import MatchesPage from './match/matchesPage';
import InsertMatchesPage from './admin/insertMatchesPage';
import ProfilePage from './profile/profilePage';
import GroupsPage from './group/groupsPage';
import CallbackPage from './login/callbackPage';


export default function Routes(props) {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/matches" component={MatchesPage} />
      <Route path="/admin" component={InsertMatchesPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/groups" component={GroupsPage} />
      <Route path="/callback" component={CallbackPage} />
    </div>);
}
