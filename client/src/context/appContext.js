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
      user: JSON.parse(localStorage.getItem('user')) || {},
      token: localStorage.getItem('token') || ''
    }
  }

  componentDidMount = () => {
    if (this.state.token) {
      this.getBeers();
    }
  }

  getBeers = () => {
    return beerAxios.get('/api/beer')
      .then(response => {
        this.setState({ beers: response.data });
        return response;
      })
  }

  addBeer = (newBeer) => {
    return beerAxios.post('/api/beer', newBeer)
      .then(response => {
        this.setState(prevState => {
          return { beers: [...prevState.beers, response.data] }
        });
        return response;
      })
  }

  signup = (userInfo) => {
    return beerAxios.post('/auth/signup', userInfo)
      .then(response => {
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.setState({
          user,
          token
        });

        return response
      })
  }

  login = (credentials) => {
    return beerAxios.post('/auth/login', credentials)
      .then(response => {
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.setState({
          user,
          token
        });

        return response
      })
  }

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.setState({
      beers: [],
      user: {},
      token: ''
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          signup: this.signup,
          login: this.login,
          logout: this.logout
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