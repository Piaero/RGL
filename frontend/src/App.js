import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

import { Header } from "./components/Header/Header.js";
import { Divisions } from "./components/Division/Divisions.js";
import { NextRace } from "./components/NextRace/NextRace.js";
import { MenuWithPagesRouter } from "./components/Menu/MenuWithPagesRouter.js";

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
              <MenuWithPagesRouter />
            </Route>
            <Route path="/F2-2020">
              <MenuWithPagesRouter />
            </Route>
            <Route path="/GT3-ACC">
              <MenuWithPagesRouter />
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
