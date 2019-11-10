import React, { Component } from 'react';
import './style.css';

import { AddModal, BeerContainer, UserBar } from '../../components';

class MainDash extends Component {
  render() {
    return (
      <div className={this.props.isMobile ? 'mainDash mobile fullWidth' : 'mainDash'}>
        <UserBar {...this.props} />
        <div className='dashboardContent'>
          <h2>{this.props.currentList}</h2>
          <p>Contains </p>
          <hr />
          <BeerContainer />
        </div>
      </div>
    )
  }
}

export default MainDash;