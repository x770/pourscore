import React, { Component } from 'react';
import './style.css';
import { Link, Redirect } from 'react-router-dom';
import { Container, Nav, SignUpForm } from '../../components';

class SignUp extends Component {

  render() {
    return (
      <React.Fragment>
        <Nav />
        <div className='formContainer'>
          <h1 className='center'>Sign Up</h1>
          <p>To get started with Pourscore, you'll need to create an account. All we require is a username and password, so be sure to not forget either.</p>
          <p>Already have an account? <Link to='/login'>Log In.</Link></p>
          <SignUpForm />
        </div>
      </React.Fragment>
    )
  }
}

export default SignUp;