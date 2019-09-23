import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../context/appContext.js';
import { Hero, Nav, WelcomeCard } from '../../components';

class Welcome extends Component {
	render() {
		return (
			<Context.Consumer>
				{(context) => {
					if (context.state.isAuth === true) {
						return <Redirect to="/dashboard" />;
					} else {
						return (
							<React.Fragment>
								<Nav />
								<Hero />
							</React.Fragment>
						)
					}
				}}
			</Context.Consumer>
		);
	}
}

export default Welcome;
