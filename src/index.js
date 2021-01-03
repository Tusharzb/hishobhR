import React from 'react'
import ReactDom from 'react-dom';
import App from './App'
import '../public/css/materialize.min.css';
import './index.style.scss';
import '../public/js/bin/materialize.min.js';
// import "../public/js/bin/materialize";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineForms } from 'react-redux-form';

const filter = {};

const store = createStore(combineForms({
    filter,
}));

ReactDom.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))