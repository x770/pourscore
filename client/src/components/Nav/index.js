import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/appContext.js';
import ListsModal from '../../components/ListsModal';
import './style.css';

class Nav extends Component {
  state = {
    showMenu: false,
    showLists: false
  }

  handleMenuToggle = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  handleListsToggle = () => {
    this.setState({
      showLists: !this.state.showLists
    });
  }

  logOut = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          if (context.state.isAuth === true) {
            return (
              <React.Fragment>
                <nav>
                  <span className='listsToggle' onClick={this.handleListsToggle}>
                    &#9776;
                  </span>
                  <Link to='/' className='brand'>POURSCORE</Link>
                  <span className='navbarToggle' onClick={this.handleMenuToggle} >
                    <i className="fas fa-cog"></i>
                  </span>
                  <ul className={this.state.showMenu ? 'mainNav show' : 'mainNav hide'}>
                    <li>
                      <Link to='/dashboard' className='navLink'>Dashboard</Link>
                    </li>
                    <li>
                      <span className='navLink' onClick={this.logOut}>Log Out</span>
                    </li>
                  </ul>
                </nav>
                <ListsModal showLists={this.state.showLists} toggleLists={this.handleListsToggle.bind(this)} />
              </React.Fragment>
            )
          } else {
              return (
                <nav>
                  <Link to='/' className='brand'>POURSCORE</Link>
                  <span className='navbarToggle' onClick={this.handleMenuToggle} >
                    <i className="fas fa-bars"></i>
                  </span>
                  <ul className={this.state.showMenu ? 'mainNav show' : 'mainNav hide'}>
                    <li>
                      <Link to='/login' className='navLink'>Log in</Link>
                    </li>
                    <li>
                      <Link to='/signup' className='navLink'>Sign Up</Link>
                    </li>
                  </ul>
                </nav>
              ) 
            }
        }}
      </Context.Consumer>
    )} 
  }

export default Nav;