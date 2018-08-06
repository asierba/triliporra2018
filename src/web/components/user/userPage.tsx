import * as React from "react";
import UserProfile from './userProfile';

export default function ProfilePage(props) {
  return <UserProfile userId={props.match.params.id} editingIsEnabled={false}/>
}
