import React from 'react';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// const container = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
