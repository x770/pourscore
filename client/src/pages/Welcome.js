import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../context/appContext.js';
import Hero from '../components/Hero';

class Welcome extends Component {

	render() {
		return (
			<Context.Consumer>
				{(context) => {
					if (context.state.isAuth === true) {
						return <Redirect to='/dashboard' />
					} else {
						return <Hero />
					}
				}}
			</Context.Consumer>
		)
	}
}

export default Welcome;
