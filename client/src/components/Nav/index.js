import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { SidebarMenu } from '../index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Nav extends Component {

  state = {
    showSidebar: false
  }

  handleSidebar = () => {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  render() {
    return (
      <nav>
        <div className='navContent'>
          <Link to='/' className='brand'>POURSCORE</Link>
          <FontAwesomeIcon icon='bars' className='sidebarToggle navLink' onClick={this.handleSidebar} />
          <div className='mainNav'>
            <Link to='/signup' className='navLink'>Sign Up</Link>
            <Link to='/login' className='navLink'>Log In</Link>
          </div>
        </div>
        <SidebarMenu show={this.state.showSidebar} handleSidebar={this.handleSidebar.bind(this)} />
      </nav>
    )
  }
}

export default Nav;