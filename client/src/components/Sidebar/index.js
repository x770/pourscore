import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewList from './NewList';
import LogoComponent from './LogoComponent';
import SidebarContent from './SidebarContent';
import './style.css';

class SidebarComponent extends Component {
  styleSidebar = () => {
    if (this.props.docked && this.props.isMobile) {
      return('newSidebar mobile-expanded')
    } else if (this.props.docked) {
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
          className={this.props.docked && !this.props.isMobile ? 'hidden' : 'closeIcon'}
          onClick={this.props.toggleSidebar}
        />
        <LogoComponent />
        <SidebarContent />
        <NewList />
      </div>
    )
  }
}

export default SidebarComponent;