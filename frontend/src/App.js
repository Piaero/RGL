import React, { Component } from 'react';
import './App.css';

import { Header } from './components/Header/Header.js';

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
      </div>
    );
  }
}

export default App;