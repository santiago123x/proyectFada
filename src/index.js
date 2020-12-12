import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Libros from './Libros';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Libros />
  </React.StrictMode>,
  document.getElementById('root')
);

