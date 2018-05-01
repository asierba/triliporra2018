import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Header from './header';
import Routes from './routes';

export default function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes />
      </div>
    </BrowserRouter>);
}
