import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Hero from '../components/Hero';

class Welcome extends Component {

	render() {
		if (this.props.isAuth === true) {
			return <Redirect to='/dashboard' />
		}
		return (
			<Hero />
		)
	}
}

export default Welcome;
