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
      errorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  clearInputs = () => {
    this.setState({
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.state)
      .then(() => this.clearInputs())
      .catch(err => {
        if (err) {
          this.setState({
            errorMessage: err.response.data.error
          })
        } else {
          this.props.history.push('/dashboard')
        }
      })
  }

  render() {
    return (
      <div className='formWrapper'>
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

        {this.state.errorMessage && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
      </div>
    );
  }
}

export default withRouter(withContext(SignUpForm));