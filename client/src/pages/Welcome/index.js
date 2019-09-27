import React, { Component } from 'react';
import { withContext } from '../../context/appContext.js';
import { Hero, Nav, WelcomeCard } from '../../components';

class Welcome extends Component {
	render() {
		return (
			<React.Fragment>
				<Nav />
				<Hero />
			</React.Fragment>
		);
	}
}

export default withContext(Welcome);
