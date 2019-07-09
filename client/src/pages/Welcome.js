import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';

class Welcome extends Component {

	render() {
		if (this.props.isAuth === true) {
			return <Redirect to='/dashboard' />
		}
		return (
			<Container>
				<h1>Welcome to Pourscore</h1>
			</Container>
		)
	}
}

export default Welcome;
