import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css";

// import '@testing-library/jest-dom';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
