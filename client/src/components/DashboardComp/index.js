import React, { Component } from 'react';
import { BeerContainer, Sidebar } from '../index';
import { withContext } from '../../context/appContext';
import './style.css';

class DashboardComp extends Component {
  render() {
    return (
      <div className='dashboard'>
        <Sidebar />
        <div className='main'>
          <div className="welcomeMessage">
            <h2>Welcome to your dashboard.</h2>
            <p>You've added {this.props.state.beers.length} beers to Pourscore.</p>
          </div>
          <hr />
          <BeerContainer/>
        </div>
      </div>
    )
  }
}

export default withContext(DashboardComp);
