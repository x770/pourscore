import React, { Component } from 'react';
import './style.css';

import { AddModal, BeerContainer, UserBar } from '../../components';

class MainDash extends Component {
  render() {
    return (
      <div className={this.props.isMobile ? 'mainDash mobile fullWidth' : 'mainDash'}>
        <UserBar {...this.props} />
        <div className='dashboardContent'>
          <div className='listInfo'>
            <div className='listInfoRow'>
              <h2>{this.props.currentList} (#)</h2>
            </div>
            <div className='listInfoRow'>
              <p>Edit this List</p>
              <span>|</span>
              <p>Delete this List</p>
            </div>
          </div>
          <BeerContainer />
        </div>
      </div>
    )
  }
}

export default MainDash;