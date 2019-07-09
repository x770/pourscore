import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Container from '../Container';
import Login from '../../pages/Login';
import './style.css';

class Nav extends Component {
  state = {
		showLogin: false,
		showSignup: false
	}

	handleLoginModal = () => {
		if (this.state.showLogin === false) {
			this.setState({ showLogin: true })
		} else {
			this.setState({ showLogin: false })
		}
  }
  
  handleSignupModal = () => {
		if (this.state.showSignup === false) {
			this.setState({ showSignup: true })
		} else {
			this.setState({ showSignup: false })
		}
  }

  logOut = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  render() {
    if (this.props.isAuth === true) {
      return (
        <nav>
          <Container>
          <span className='brand'>POURSCORE</span>
          <span className='linksGroup'>
            <Link to='/dashboard' className='navLink'>Dashboard</Link>
            <span
              className='navLink'
              onClick={this.logOut}
            >
              Log Out
            </span>
          </span>
          </Container>
        </nav>
      )
    } else {
      return (
        <nav>
          <Container>
        <Link to='/' className='brand'><span >POURSCORE</span></Link>
        <span className='linksGroup'>
          <Link to='/' className='navLink'>Welcome</Link>
          <span className='navLink' onClick={this.handleLoginModal}>Log in</span>
          <Link to='/signup' className='navLink'>Sign Up</Link>
        </span>
          <Login
            show={this.state.showLogin}
            hide={this.handleLoginModal.bind(this)}
            updateUser={this.props.updateUser}
            />
            </Container>
        </nav>
      )
    }

  }
}

export default Nav;