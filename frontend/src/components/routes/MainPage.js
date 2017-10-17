import React, { Component } from 'react';

class MainPage extends Component {
  render() {
    return (
      <div>
        <b>My awesome stack:</b>
        <ul>
          <li>react</li>
          <li>redux</li>
          <li>react-router + react-router-redux</li>
          <li>reselect</li>
          <li>redux-saga</li>
          <li>redux-form</li>
          <li>and axios</li>
        </ul>
      </div>
    );
  }
}

MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
