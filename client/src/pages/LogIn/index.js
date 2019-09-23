import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Hero, Nav, WelcomeCard } from '../../components';

class LogIn extends Component {

  render() {
    return (
      <React.Fragment>
        <Nav />
        <h1 className='center'>Log In</h1>
      </React.Fragment>
    )
  }
}

export default LogIn;