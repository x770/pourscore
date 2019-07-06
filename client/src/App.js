import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
      isAuth: false,
      beers: [],
      lists: []
    };
  }

  updateUser = (username, beers, lists, authStatus)=> this.setState({ currentUser: username, beers: beers, lists: lists, isAuth: authStatus });

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' render={(props) => <Login updateUser={this.updateUser.bind(this)} {...props} />} />
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
