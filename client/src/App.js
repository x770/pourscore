import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import Login from './components/LoginModal';
import Signup from './components/SignupModal';
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
      lists: [],
      showLogin: false,
      showSignup: false,
      showLists: false
    };
  }

  componentDidMount() {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));
    const currentUser = localStorage.getItem('currentUser');

    this.setState({
        isAuth: isAuth,
        currentUser: currentUser,
        showLogin: false,
        showSignup: false
      });

    this.getUserData();
  }

  handleLoginModal = () => {
		if (this.state.showLogin === false) {
			this.setState({ showLogin: true })
		} else {
			this.setState({ showLogin: false })
		}
  }
  
  handleSignupModal = () => {
		if (this.state.showSignup === false) {
			this.setState({ showSignup: true })
		} else {
			this.setState({ showSignup: false })
		}
  }

  handleListsToggle = () => {
    this.setState({
      showLists: !this.state.showLists
    });
  }

  getUserData() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      axios.get('/api/users/' + currentUser)
			.then(response => {
        this.setState({ beers: response.data.beers });
      })
    }
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
          <Nav
            isAuth={this.state.isAuth}
            updateUser={this.updateUser.bind(this)}
            handleLoginModal={this.handleLoginModal.bind(this)}
            handleSignupModal={this.handleSignupModal.bind(this)}
            handleListsToggle={this.handleListsToggle.bind(this)}
          />
          <Switch>
            <Route exact path='/'
              render={(props) => <Welcome {...props} isAuth={this.state.isAuth} updateUser={this.updateUser.bind(this)} handleSignupModal={this.handleSignupModal.bind(this)} />} />
            <Route
              exact path='/dashboard'
              render={(props) => <Dashboard currentUser={this.state.currentUser} isAuth={this.state.isAuth} beers={this.state.beers} lists={this.state.lists} showLists={this.state.showLists} handleListsToggle={this.handleListsToggle.bind(this)} {...props} />}
            />
            <Route path='*' component={NoMatch} />
          </Switch>
        </div>
        <Login
              show={this.state.showLogin}
              hide={this.handleLoginModal.bind(this)}
              updateUser={this.updateUser}
            />
          <Signup
            show={this.state.showSignup}
            hide={this.handleSignupModal.bind(this)}
            updateUser={this.updateUser}
          />
      </Router>
    );
  }
}

export default App;
