import React, { Component } from 'react';
import { withContext } from '../../context/appContext.js';
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
          <h2>Your lists ({1 + this.props.state.lists.length})</h2>
          <ul>
            <li list_id={'All Beers'} onClick={this.resetListId} className='sidebarItem active'>
              <p className='listTitle'>All Beers</p>
            </li>
            {this.props.state.lists.map(
              list => (
                <li
                  key={list._id}
                  list_id={list._id}
                  onClick={this.updateList}
                  className='sidebarItem'
                >
                  <p className='listTitle'>{list.name} ({list.beers.length})</p>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default withContext(ListsContainer);