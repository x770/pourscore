import React, { Component } from 'react';
import { withContext } from '../../context/appContext.js';
import { Nav } from '../../components';
import './style.css';

class LoggedOut extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <h1>You've successfully logged out.</h1>
      </React.Fragment>
    )
  }
}

export default withContext(LoggedOut);