import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Nav extends Component {
  render() {
    if (this.props.isAuth === true) {
      return (
        <nav>
          <span className='brand'>POURSCORE</span>
          <span className='linksGroup'>
            <Link to='/dashboard' className='navLink'>Dashboard</Link>
            <span className='navLink'>Log Out</span>
          </span>
        </nav>
      )
    } else {
      return (
        <nav>
        <span className='brand'>POURSCORE</span>
        <span className='linksGroup'>
          <Link to='/' className='navLink'>Welcome</Link>
          <Link to='/login' className='navLink'>Log in</Link>
          <Link to='/signup' className='navLink'>Sign Up</Link>
          <span className='navLink'>Log Out</span>
        </span>
      </nav>
      )
    }

  }
}

export default Nav;