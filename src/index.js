import React from 'react'
import ReactDom from 'react-dom';
import App from './App'
import '../public/css/materialize.min.css';
import './index.style.scss';
import '../public/js/bin/materialize.min.js';
// import "../public/js/bin/materialize";

ReactDom.render(<App />, document.getElementById('root'))