import React, { Component } from 'react';
import { withContext } from '../../context/appContext';
import { withRouter } from 'react-router-dom';
import './style.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.state)
      .then(() => this.props.history.push('/dashboard'));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username <br />
          <input
            name='username'
            type='text'
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Password <br />
          <input 
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Confirm Password <br />
          <input
            name='confirmPassword'
            type='password'
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
          />
        </label>
        <button
          className='button'
        >
          Sign Up
        </button>
      </form>
    );
  }
}

export default withRouter(withContext(SignUpForm));