import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Nav extends Component {
  state = {
		showLogin: false,
    showSignup: false,
    showMenu: false,
    showLists: false
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
          <span className='listsToggle' onClick={this.props.handleListsToggle}>
            &#9776;
          </span>
          <Link to='/' className='brand'>POURSCORE</Link>
          <span className='navbarToggle' onClick={this.handleMenuToggle} >
            <i className="fas fa-cog"></i>
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
            <i className="fas fa-bars"></i>
          </span>
          <ul className={this.state.showMenu ? 'mainNav show' : 'mainNav hide'}>
            <li>
              <span className='navLink' onClick={this.props.handleLoginModal}>Log in</span>
            </li>
            <li>
              <span className='navLink' onClick={this.props.handleSignupModal}>Sign Up</span>
            </li>
          </ul>
        </nav>
      )
    }

  }
}

export default Nav;