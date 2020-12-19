import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './SeleccionAV';
import Libros from './LibrosV';
import Procedimiento from './SeleccionAD';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Libros />
    <Procedimiento/>
  </React.StrictMode>,
  document.getElementById('root')
);

