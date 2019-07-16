import React, { Component } from 'react';
import './style.css';

class ListsContainer extends Component {
  findListId = (event) => {
    event.preventDefault();
    
    let list_id = event.target.getAttribute('list_id');
    this.props.updateListId(list_id);
  }


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
                  list_id={list._id}
                  onClick={this.findListId}
                >
                  {list.name} ({list.beers.length})
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