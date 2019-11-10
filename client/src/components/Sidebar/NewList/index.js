import React, { Component } from 'react';
import './style.css';

class NewList extends Component {
  handleNewList = () => {
    alert('Placeholder')
  }

  render() {
    return (
      <div className='sidebarItem addNewList' onClick={this.handleNewList}>
        <p>+ New List</p>
      </div>
    )
  }
}

export default NewList;