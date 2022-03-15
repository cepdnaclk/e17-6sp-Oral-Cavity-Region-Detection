import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// Styles
import {GlobalStyle} from './GlobalStyle';

import {AuthProvider} from './context/AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
      <Route path ="/*" element={ <App />}/>
      </Routes>
      <GlobalStyle/>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

