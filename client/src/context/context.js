import React, { Component } from 'react';

// Context
const Context = React.createContext();

// Provider Component
class Provider extends Component {

  state = {
    currentUser: '',
    isAuth: false,
    userId: '',
    showLogin: false,
    showSignup: false,
    showLists: false,
    testKey: 'testValue',
    beersAdded: 21
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }

}

export { Context, Provider };