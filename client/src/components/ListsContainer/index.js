import React, { Component } from 'react';
import './style.css';

class ListsContainer extends Component {

  updateListId = (event) => {
    const list_id = event.target.getAttribute('list_id');

    this.props.updateListId(list_id);
    this.props.fetchListBeers(list_id);
  }

  resetListId = () => {
    this.props.updateListId('');
    this.props.fetchAllBeers();
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className='listsContainer'>
          <h2>Your lists ({this.props.listsArray.length + 1})</h2>
          <hr />
          <h3 onClick={this.props.handleNewListModal} className='newListButton'>+ Add New List</h3>
          <ul>
            <li list_id={''} onClick={this.resetListId} className='listElement'>All Beers</li>
            {this.props.listsArray.map(
              list => (
                <li
                  key={list._id}
                  list_id={list._id}
                  onClick={this.updateListId}
                  className='listElement'
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