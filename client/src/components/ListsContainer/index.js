import React, { Component } from 'react';
import './style.css';

class ListsContainer extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className='listsContainer'>
          <h2>Your lists ({this.props.listsArray.length + 1})</h2> <br />
          <ul>
            <li>All Beers</li>
            {this.props.listsArray.map(
              list => (
                <li
                  key={list._id}
                >
                  {list.name}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListsContainer;