import React, { Component } from 'react';
import './style.css';

class ListsModal extends Component {

  render() {
    return (
      <div className={this.props.showLists ? 'sidebar open' : 'sidebar'}>
        <div className={'listsModal'}>
          <h2>Your Lists ({this.props.lists.length})</h2>
          <span className={'closeButton'} onClick={this.props.handleListsToggle}>&#10005;</span>
        </div>
      </div>
    )
  }
}

export default ListsModal;