import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './style.css';
import axios from 'axios';

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
		console.log(this.state);
		console.log(this.props);
		if (this.state.username && this.state.password) {
			axios.post('/api/signup', {
				username: this.state.username,
				password: this.state.password
			}).then(data => {
				this.props.updateUser(data.data.username, data.data._id, data.data.beers, data.data.lists, true);
				this.props.hide();
				window.location.replace('/');
			}).catch(err => console.log(err))
			this.clearInput();
		}
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.hide}>
				<Modal.Header closeButton>
					<Modal.Title>Please Sign Up</Modal.Title>
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
					<Button
						style={{ backgroundColor: '#F7CB14', color: 'black' }}
						className='signupButton'
						disabled={!(this.state.username && this.state.password)}
						onClick={this.handleFormSubmit}
					>
						Sign up
					</Button>
				</Form>
			</Modal>
		)
	}
}

export default Signup;
