import React, { Component } from 'react';

// Context
const Context = React.createContext();

// Provider Component
class Provider extends Component {

  state = {
    currentUser: 'admin',
    isAuth: true,
    userId: 'admin',
    showLists: false
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