import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import './style.css';

class Nav extends Component {
  state = {
		showLogin: false,
    showSignup: false,
    showMenu: false
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

  handleMenuToggle = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  logOut = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  render() {
    if (this.props.isAuth === true) {
      return (
        <nav>
          <Link to='/' className='brand'>POURSCORE</Link>
          <span className='navbarToggle' onClick={this.handleMenuToggle} >
            <i class="fas fa-bars"></i>
          </span>
          <ul className={this.state.showMenu ? 'mainNav show' : 'mainNav hide'}>
            <li>
              <Link to='/dashboard' className='navLink'>Dashboard</Link>
            </li>
            <li>
              <span className='navLink' onClick={this.logOut}>Log Out</span>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <nav>
        <Link to='/' className='brand'>POURSCORE</Link>
        <span className='navbarToggle' onClick={this.handleMenuToggle} >
          <i class="fas fa-bars"></i>
        </span>
        <ul className={this.state.showMenu ? 'mainNav show' : 'mainNav hide'}>
          <li>
            <span className='navLink' onClick={this.handleLoginModal}>Log in</span>
          </li>
          <li>
            <span className='navLink' onClick={this.handleSignupModal}>Sign Up</span>
          </li>
          </ul>
          <Login
              show={this.state.showLogin}
              hide={this.handleLoginModal.bind(this)}
              updateUser={this.props.updateUser}
            />
          <Signup
            show={this.state.showSignup}
            hide={this.handleSignupModal.bind(this)}
            updateUser={this.props.updateUser}
          />
      </nav>
      )
    }

  }
}

export default Nav;