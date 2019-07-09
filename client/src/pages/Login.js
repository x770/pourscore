import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

class Login extends Component {
	state = {
		username: '',
		password: '',
		currentUser: ''
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
			}).then(data => {
				if (data.data[0].username) {
					this.props.updateUser(data.data[0].username, data.data[0].beers, data.data[0].lists, true)
				}
				else {
					alert('Incorrect password. Try again...');
				}
				
		})
			.catch(err => console.log(err))
		}

	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.hide}>
				<Modal.Header closeButton>
					<Modal.Title>Please Log In</Modal.Title>
				</Modal.Header>
				<Form>
					<Form.Group>
						<Form.Label>Username: </Form.Label>
						<Form.Control
							type='text'
							size='sm'
							name='username'
							value={this.state.username}
							onChange={this.handleInputChange}
							placeholder='Username (required)'
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password: </Form.Label>
						<Form.Control
							type='password'
							size='sm'
							name='password'
							value={this.state.password}
							onChange={this.handleInputChange}
							placeholder='Password (required)'
						/>
					</Form.Group>
					<Button disabled={!(this.state.username && this.state.password)} onClick={this.handleFormSubmit}>
						Log In
					</Button>
				</Form>
			</Modal>
		)
	}
}

export default Login;
