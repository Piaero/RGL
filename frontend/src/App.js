import React, { Component } from 'react';
import './App.css';

import { Header } from './components/Header/Header.js';
import { Division } from './components/Division/Division.js';
import { NextRace } from './components/NextRace/NextRace.js';
import { Menu } from './components/Menu/Menu.js';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };


  render() {
    return (
      <div className="App">
        <Header />
        <Division />
        <NextRace />
        <Menu />
      </div>
    );
  }
}

export default App;