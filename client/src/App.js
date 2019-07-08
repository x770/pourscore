import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    const authStatus = JSON.parse(localStorage.getItem('isAuth'));
    const currentUser = localStorage.getItem('currentUser');

    this.state = {
      currentUser: currentUser,
      isAuth: authStatus,
      beers: [],
      lists: []
    };
  }

  componentDidMount() {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));
    const currentUser = localStorage.getItem('currentUser');

    this.setState({ isAuth: isAuth });
    this.setState({ currentUser: currentUser });

    this.getUserData();
  }

  getUserData() {
    const currentUser = localStorage.getItem('currentUser');
    axios.get('/api/users/' + currentUser)
			.then(response => {
        this.setState({ beers: response.data.beers });
      })
  }

  updateUser = (username, beers, lists, authStatus) => {
    this.setState({ currentUser: username, beers: beers, lists: lists, isAuth: authStatus });
    localStorage.setItem('currentUser', username);
    localStorage.setItem('isAuth', authStatus);
  }

  render() {
    return (
      <Router>
        <div>
          <Nav isAuth={this.state.isAuth} />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/login' render={(props) => <Login updateUser={this.updateUser.bind(this)} {...props} />}
            />
            <Route
              exact path='/dashboard'
              render={(props) => <Dashboard currentUser={this.state.currentUser} isAuth={this.state.isAuth} beers={this.state.beers} lists={this.state.lists} {...props} />}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
