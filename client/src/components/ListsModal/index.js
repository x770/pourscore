import React, { Component } from 'react';
import { Context } from '../../context/appContext.js'; 
import { Button } from 'react-bootstrap';
import './style.css';

class ListsModal extends Component {

  updateListId = (event) => {
    const list_id = event.target.getAttribute('list_id');

    this.props.updateListId(list_id);
    this.props.fetchListBeers(list_id);
    this.props.handleListsToggle();
  }

  resetListId = () => {
    this.props.updateListId('');
    this.props.fetchAllBeers();
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <div className={this.props.showLists ? 'sidebar open' : 'sidebar'}>
          <div className={'listsModal'}>
            <h2>Your Lists ()</h2>
            <span className={'closeButton'} onClick={this.props.toggleLists}>&#10005;</span>
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
              {/* {this.props.listsArray.map(
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
              )} */}
            </ul>
          </div>
        </div>
        )}
      </Context.Consumer>
    )
  }
}

export default ListsModal;