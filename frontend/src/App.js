import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";

import "./App.css";

import { Header } from "./components/Header/Header.js";
import { Divisions } from "./components/Division/Divisions.js";
import { NextRace } from "./components/NextRace/NextRace.js";
import { Menu } from "./components/Menu/Menu.js";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Divisions />
          <NextRace />

          <Switch>
            <Route path="/F1-2020">
              <Menu />
            </Route>
            <Route path="/F2-2020">
              <Menu />
            </Route>
            <Route path="/GT3-ACC">
              <Menu />
            </Route>
            <Route exact path="/">
              <Redirect to="/F1-2020" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
