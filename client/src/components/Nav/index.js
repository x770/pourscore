import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Nav() {
  return (
    <nav>
      This is the Navbar.
      <Link to='/'>Welcome</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/login'>Login</Link>
      <Link to='signup'>Sign Up</Link>
    </nav>
  )
}

export default Nav;