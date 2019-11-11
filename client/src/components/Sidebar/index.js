import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewList from './NewList';
import { ListsContainer } from '../index';
import LogoComponent from './LogoComponent';
import './style.css';

class SidebarComponent extends Component {
  styleSidebar = () => {
    if (this.props.sidebarDocked && this.props.isMobile) {
      return('newSidebar mobile-expanded')
    } else if (this.props.sidebarDocked) {
      return ('newSidebar expanded')
    } else {
      return('newSidebar collapsed')
    }
  }

  render() {
    return (
      <div className={this.styleSidebar()}>
        <FontAwesomeIcon
          icon='times'
          className={this.props.sidebarDocked && !this.props.isMobile ? 'hidden' : 'closeIcon'}
          onClick={this.props.toggleSidebar}
        />
        <LogoComponent />
        <ListsContainer currentList={this.props.currentList} />
        <NewList />
      </div>
    )
  }
}

export default SidebarComponent;