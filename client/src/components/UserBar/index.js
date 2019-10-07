import React, { Component } from 'react';
import { withContext } from '../../context/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Settings } from '../index';
import './style.css';

class UserBar extends Component {

  handleLogout = () => {
		this.props.logout();
		this.props.history.push('/logout');
  }
  
  render() {
    return (
      <div className='userbar'>
        <p className='brand'>POURSCORE</p>
        <div className='logout' onClick={this.handleLogout} >
          Log Out
        </div>
      </div>
    )
  }
}

export default withContext(UserBar);