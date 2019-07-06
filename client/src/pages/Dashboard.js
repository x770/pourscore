import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

	render() {
		if (this.props.isAuth === false) {
			return <Redirect to='/login' />
		}
		return (
			<div>
				<h1>Welcome to your Pourscore Dashboard, {this.props.currentUser}</h1>
				<p>
					Your beers are listed here: {this.props.beers}
				</p>
			</div>
		);
	}
}

export default Dashboard;
