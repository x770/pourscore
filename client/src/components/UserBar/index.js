import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withContext } from '../../context/appContext';
import { withRouter } from 'react-router';
import './style.css';

class UserBar extends Component {
  state = { 
    showDropdown: false
  }

  componentWillMount = () => {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      this.handleDropdown();
      return;
    } else {
      this.setState({
        showDropdown: false
      })
    }
  }

  handleLogout = async () => {
    await this.props.logout()
    await this.props.history.push('/logout');
  }

  handleDropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown
    }))
  }

  render() {
    return (
      <div className='userbar'>
        <div className='userbarInner'>
        <FontAwesomeIcon
          icon='bars'
          className={this.props.isMobile ? 'menuIcon' : 'hidden'}
          onClick={this.props.toggleSidebar}
        />
        <p>{this.props.currentList}</p>

        <div className='userInfo'>
          <p>{this.props.state.user.username}</p>
          <div className='dropdownContainer' ref={dropdownContainer => this.node = dropdownContainer}>
            <FontAwesomeIcon icon='cog' className='cogIcon' />
            <div className={this.state.showDropdown ? 'dropdown' : 'dropdown dropdown-hidden'}>
              <div className='logout' onClick={this.handleLogout}>Logout</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withContext(UserBar));