import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Routes from "./Routes";
import Header from "./components/Header/Header";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
