import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import reducers from './reducers'

// Thunk on siis middleWare, jolla saadaan aikaiseksi asynkroniset kutsut actioneissa
// Normaalisti actionin tulee olla PlainJs objekti, jolla ominaisuus type ja/tai payload(payload on siis
//vapaaehtoinen, type pakollinen). Actionit eivat voi olla funktioita ilman middleWarea(talla kertaa Thunk)
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
