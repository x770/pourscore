import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class SidebarMenu extends Component {
  render() {
    return (
      <div>
        <div className={this.props.show ? 'sideNav open' : 'sideNav hide'}>
          <span className='closeButton' onClick={this.props.handleSidebar}>&#10005;</span>
          <Link to='/signup' className='navLink'>Sign Up</Link> <br />
          <Link to='/login' className='navLink'>Log In</Link>
        </div>
      </div>
    )
  }
}

export default SidebarMenu;