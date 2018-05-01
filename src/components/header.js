import React from 'react';
import { Link } from "react-router-dom";

export default function Header(props) {
    return (
    <nav>
        <ul className="nav nav-tabs">
          <li><Link to="/">Home</Link></li>
          <li><Link to="matches">Matches</Link></li>
        </ul>
    </nav>);
}