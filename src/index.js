import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppSnackbar from './Components/AppSnackbar';

ReactDOM.render(
  <AppSnackbar>
    <BrowserRouter basename='/sgi-idi'>
      <App />
    </BrowserRouter>
  </AppSnackbar>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
