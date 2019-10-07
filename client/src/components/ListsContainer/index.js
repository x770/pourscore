import React, { Component } from 'react';
import './style.css';

class ListsContainer extends Component {

  updateList = async (event) => {
    const list_id = await event.target.getAttribute('list_id');

    await this.props.updateListId(list_id);
    await this.props.fetchListBeers(list_id);
  }

  resetListId = () => {
    this.props.updateListId('');
    this.props.fetchAllBeers();
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className='listsContainer'>
          <h2>Your lists ()</h2>
          <hr />
          <button
            onClick={this.props.handleNewListModal}
            className='newListButton'
          >
            + Add New List
          </button>
          <ul>
            <li list_id={''} onClick={this.resetListId} className='listElement'>All Beers</li>
            {/* {this.props.listsArray.map(
              list => (
                <li
                  key={list._id}
                  list_id={list._id}
                  onClick={this.updateList}
                  className='listElement'
                >
                  {list.name} ({list.beers.length})
                </li>
              )
            )} */}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListsContainer;