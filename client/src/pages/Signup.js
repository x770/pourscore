import React, { Component } from 'react';
import Container from '../components/Container';
import { Input, FormBtn } from '../components/Form';
import Register from '../utils/Register.js';

class Signup extends Component {
	state = {
		username: '',
		password: ''
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	clearInput = function() {
		this.setState({
			username: '',
			password: ''
		})
	}

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.username && this.state.password) {
			Register.signUp({
				username: this.state.username,
				password: this.state.password
			});
			this.clearInput();
		}
	}

	render() {
		return (
			<Container>
				<h1>This is the sign up page.</h1>
				<br />
				<form>
					<Input
						value={this.state.username}
						onChange={this.handleInputChange}
						name='username'
						placeholder='Username'
						label='Username (required)'
					/>
					<Input
						value={this.state.password}
						onChange={this.handleInputChange}
						name='password'
						type='password'
						placeholder='Password'
						label='Password (required)'
					/>
					<br />
					<FormBtn
						disabled={!(this.state.username && this.state.password)}
						onClick={this.handleFormSubmit}
					>
						Sign Up
					</FormBtn>
				</form>
			</Container>
		)
	}
}

export default Signup;
