import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Libros from './Libros';
import Procedimiento from './SeleccionA';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Libros />
    <Procedimiento/>
  </React.StrictMode>,
  document.getElementById('root')
);

