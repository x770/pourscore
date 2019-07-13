import React, { Component } from 'react';
import './style.css';

class ListsContainer extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className='listsContainer'>
          <h2>Your lists ({this.props.lists.length})</h2>
        </div>
      </div>
    )
  }
}

export default ListsContainer;