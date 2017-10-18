import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './routes/MainPage';
import './Root.css';

class Root extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={MainPage} />
      </div>
    );
  }
}

export default Root;
