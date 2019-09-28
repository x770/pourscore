import React, { Component } from 'react';
import { withContext } from '../../context/appContext';
import './style.css';
import { Link } from 'react-router-dom';
import { LoginForm, Nav } from '../../components';

class LogIn extends Component {

  render() {
    return (
      <React.Fragment>
        <Nav />
        <div className='formContainer'>
          <h1 className='center'>Log In</h1>
          <LoginForm />
          <p className='center md-text'>Don't have an account? <Link to='/signup'>Sign Up.</Link></p>
        </div>
      </React.Fragment>
    )
  }
}

export default withContext(LogIn);