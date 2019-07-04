import React, { Component } from 'react';
import Container from '../components/Container';
import { Input, FormBtn } from '../components/Form';
import axios from 'axios';


class Login extends Component {
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
			axios.post('/api/login', {
				username: this.state.username,
				password: this.state.password
			}).then(response => {
				console.log(response)
				if (response.status === 200) {
					this.props.updateUser({
						loggedIn: true,
						username: response.data.username
					})
					this.setState({
						redirectTo: '/dashboard'
					})
				}
			}).catch(error => {
				console.log('Login error: ')
				console.log(error);
			})
		}
	}

	render() {
		return (
			<Container>
				<h1>This is the log in page.</h1>
				<form>
					<Input
						value={this.state.username}
						onChange={this.handleInputChange}
						name='username'
						placeholder='Username (required)'
						label='Username: '
					/>
					<Input
						value={this.state.password}
						onChange={this.handleInputChange}
						name='password'
						type='password'
						placeholder='Password (required)'
						label='Password: '
					/>
					<FormBtn
						disabled={!(this.state.username && this.state.password)}
						onClick={this.handleFormSubmit}
					>
						Log in
					</FormBtn>
				</form>
			</Container>
		)
	}
}

export default Login;
