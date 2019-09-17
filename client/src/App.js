import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from './context/context.js';
import './App.css';
import Nav from './components/Nav';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import Login from './components/LoginModal';
import Signup from './components/SignupModal';

class App extends Component {
  constructor(props) {
    super(props);
    const authStatus = JSON.parse(localStorage.getItem('isAuth'));
    const currentUser = 'admin';
    const user_id = 'admin';

    this.state = {
      currentUser: currentUser,
      isAuth: authStatus,
      userId: user_id,
      showLogin: false,
      showSignup: false,
      showLists: false
    };
  }

  componentDidMount() {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));
    const currentUser = 'admin';
    const user_id = 'admin';

    this.setState({
      isAuth: isAuth,
      currentUser: currentUser,
      userId: user_id,
      showLogin: false,
      showSignup: false
    });
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

  updateUser = (username, user_id, beers, lists, authStatus) => {
    this.setState({ currentUser: username, userId: user_id, beers: beers, lists: lists, isAuth: authStatus });
    localStorage.setItem('currentUser', username);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('isAuth', authStatus);
  }

  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Nav
              isAuth={this.state.isAuth}
              handleLoginModal={this.handleLoginModal.bind(this)}
              handleSignupModal={this.handleSignupModal.bind(this)}
              handleListsToggle={this.handleListsToggle.bind(this)}
            />
            <Switch>
              <Route exact path='/'
                render={(props) => <Welcome {...props} isAuth={this.state.isAuth} handleSignupModal={this.handleSignupModal.bind(this)} />} />
              <Route
                exact path='/dashboard'
                render={(props) => <Dashboard currentUser={this.state.currentUser} isAuth={this.state.isAuth} user_id={this.state.userId} showLists={this.state.showLists} handleListsToggle={this.handleListsToggle.bind(this)} {...props} />}
              />
              <Route path='*' component={NoMatch} />
            </Switch>
          </React.Fragment>
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
        </Provider>
    );
  }
}

export default App;
