import React, { Component } from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
  Redirect
} from "react-router-dom";



import './App.css';

import { Header } from './components/Header/Header.js';
import { Division } from './components/Division/Division.js';
import { NextRace } from './components/NextRace/NextRace.js';
import { Menu } from './components/Menu/Menu.js';


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
);

const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
);


const F12020 = () => (
  <div>
    <h2>F12020</h2>
  </div>
);

const F22020 = () => (
  <div>
    <h2>F22020</h2>
  </div>
);

const ACC = () => (
  <div>
    <h2>ACC</h2>
  </div>
);




class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };


  render() {
    return (
      <div className="App">
        <Router>




          <Header />
          <Division />
          <NextRace />
          {/* <Menu /> */}

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