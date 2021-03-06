import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
          <h2>Your lists ({this.props.listsArray.length + 1})</h2>
          <hr />
          <Button
            onClick={this.props.handleNewListModal}
            className='newListButton'
            block
          >
            + Add New List
          </Button>
          <ul>
            <li list_id={''} onClick={this.resetListId} className='listElement'>All Beers</li>
            {this.props.listsArray.map(
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
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListsContainer;