import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  validateForm = () => {
     
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    alert('Success!')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username: <br />
          <input
            name='username'
            type='text'
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Password: <br />
          <input 
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Confirm Password: <br />
          <input
            name='confirmPassword'
            type='password'
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
          />
        </label>
        <button className='button'>
          Sign Up
        </button>
      </form>
    );
  }
}

export default SignUpForm;