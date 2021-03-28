import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';

import { Header } from './components/Header/Header.js';
import { Divisions } from './components/Divisions/Divisions.js';
import { NextRace } from './components/NextRace/NextRace.js';
import { MenuWithPagesRouter } from './components/Menu/MenuWithPagesRouter.js';
import { NotFound } from './components/Pages/NotFound/NotFound';
import { DivisionsAPI } from './components/Divisions/DivisionsAPI.js';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    DivisionsAPI.getDivisions().then((divisions) => {
      this.setState({ divisions: divisions });
    });
  }

  render() {
    if (!this.state.divisions) {
      return <div className='App'>Ładowanie...</div>;
    }
    return (
      <div className='App'>
        <Router>
          <Header />
          <Divisions divisions={this.state.divisions} />
          <NextRace />

          <Switch>
            {this.state.divisions.map((division, index) => {
              return (
                <Route path={division.path} key={index}>
                  <MenuWithPagesRouter />
                </Route>
              );
            })}
            <Route exact path='/'>
              <Redirect to={`${this.state.divisions[0].path}/news`} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
