import React, { Component } from 'react';
import './style.css';

class ListsContainer extends Component {
  findListId = (event) => {
    let list_id = event.target.getAttribute('list_id');
    this.props.updateListId(list_id);
  }

  resetListId = () => {
    this.props.updateListId('');
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className='listsContainer'>
          <h2>Your lists ({this.props.listsArray.length + 1})</h2> <br />
          <hr />
          <h2 onClick={this.props.handleNewListModal}>+ Add New List</h2>
          <ul>
            <li list_id={''} onClick={this.resetListId} >All Beers</li>
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