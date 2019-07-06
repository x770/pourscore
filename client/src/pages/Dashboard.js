import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BeerContainer } from '../components/BeerContainer';
import './dashboard.css';

class Dashboard extends Component {

	render() {
		if (this.props.isAuth === false) {
			return <Redirect to='/login' />
		}
		return (
			<div>
				<h1 className='welcomeMessage'>Welcome to your Pourscore Dashboard, {this.props.currentUser}</h1>
				<div>
					<BeerContainer test='test' beersArray={this.props.beers} />
				</div>
			</div>
		);
	}
}

export default Dashboard;
