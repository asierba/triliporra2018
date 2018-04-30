import bar from './bar';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';

const text = bar();

ReactDOM.render(
    <h1>{text}</h1>,
    document.getElementById('root')
  );