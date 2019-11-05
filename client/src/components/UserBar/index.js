import React, { Component } from 'react';
import { withContext } from '../../context/appContext';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Settings } from '../index';
import './style.css';

class UserBar extends Component {
  constructor(props) {
    super(props)
  }

  handleLogout = async () => {
    await this.props.logout()
    await this.props.history.push('/logout')
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

export default withRouter(withContext(UserBar));