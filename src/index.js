import React from 'react'
import ReactDom from 'react-dom';
import App from './App'
import '../public/sass/materialize.scss';
import "../public/js/bin/materialize";

M.AutoInit();
ReactDom.render(<App />, document.getElementById('root'))