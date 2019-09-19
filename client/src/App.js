import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from './context/appContext.js';
import './App.css';
import Nav from './components/Nav';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import LogIn from './pages/LogIn';
import NoMatch from './pages/NoMatch';
import SignUp from './pages/SignUp';

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
            <Nav />
            <Switch>
              <Route exact path='/' component={Welcome} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={LogIn} />
              <Route path='*' component={NoMatch} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
