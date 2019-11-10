// React import
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from './context/appContext.js';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRedirect from './components/AuthRedirect';

// CSS import
import './App.css';

// App pages import
import Welcome from './pages/Welcome/';
import Dashboard from './pages/Dashboard/';
import LoggedOut from './pages/LoggedOut/';
import LogIn from './pages/LogIn/';
import NoMatch from './pages/NoMatch/';
import SignUp from './pages/SignUp/';

// FontAwesome Import
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faCog, faTimes)

class App extends Component {
  constructor(props) {
    super(props);
    const authStatus = JSON.parse(localStorage.getItem('isAuth'));
    const currentUser = '';
    const user_id = '';

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
    const currentUser = '';
    const user_id = '';

    this.setState({
      isAuth: isAuth,
      currentUser: currentUser,
      userId: user_id,
      showLogin: false,
      showSignup: false
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
          <Switch>
            <AuthRedirect exact path='/' component={Welcome} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <AuthRedirect exact path='/signup' component={SignUp} />
            <AuthRedirect exact path='/login' component={LogIn} />
            <Route exact path='/logout' component={LoggedOut} />
            <Route path='*' component={NoMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
