import React, { Component } from 'react';
import axios from 'axios';

const beerAxios = axios.create();

beerAxios.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

// Context
const Context = React.createContext();

// Provider Component
class Provider extends Component {
  constructor() {
    super()
    this.state = {
      beers: [],
      lists: [],
      user: JSON.parse(localStorage.getItem('user')) || {},
      token: localStorage.getItem('token') || ''
    }
  }

  // Auth functions //
  signup = async (userInfo) => {
    const response = await beerAxios.post('/auth/signup', userInfo);
    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.setState({
      user,
      token
    });

    return response;
  }

  login = async (credentials) => {
    const response = await beerAxios.post('/auth/login', credentials);
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.setState({
      user,
      token
    });

    return response;
  }

  logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.setState({
      beers: [],
      lists: [],
      user: {},
      token: ''
    })
  }

  // Beer functions //
  getBeers = async () => {
    const response = await beerAxios.get('/api/beer');

    this.setState({ beers: response.data });

    return response;
  }

  addBeer = async (newBeer) => {
    const response = await beerAxios.post('/api/beer', newBeer);

    this.setState(prevState => {
      return { beers: [...prevState.beers, response.data] };
    });
    
    return response;
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          signup: this.signup,
          login: this.login,
          logout: this.logout,
          getBeers: this.getBeers
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }

}

export const withContext = Component => {
  return props => {
      return (
          <Context.Consumer>
            {
              globalState => {
                return (
                  <Component
                      {...globalState}
                      {...props}
                  />
                )
              }
            }
          </Context.Consumer>
      )
  }
}

export { Context, Provider };