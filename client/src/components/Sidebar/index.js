import React, { Component } from 'react';
import { withContext } from '../../context/appContext';
import { ListsContainer } from '../index';
import './style.css';

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-inner'>
          <div className='sidebar-text center'>
            <p className='user-greeting'>Welcome, {this.props.state.user.username}!</p>
            <p>Beers added: {this.props.state.beers.length}</p>
          </div>
          <ListsContainer />
        </div>
      </div>
    )
  }
}

export default withContext(Sidebar);