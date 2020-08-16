import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.style.scss";
import Routes from "./Routes";
import Header from "./components/Header/Header";


class App extends React.Component {
  render() {
    return (
      <div >
        <BrowserRouter basename="/hishobhR">
          <Header />
          <div className="container"> 
            <Routes />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
