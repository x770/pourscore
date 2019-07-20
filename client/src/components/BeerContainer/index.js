import React, { Component } from 'react';
import BeerEntry from '../BeerEntry';
import DeleteListModal from '../DeleteListModal';
import EditListModal from '../EditListModal';
import axios from 'axios';
import './style.css';

class BeerContainer extends Component {

  state = {
    showDeleteListModal: false,
    showEditListModal: false
  }

  handleListDelete = () => {
    const list_id = this.props.listId;
    
    axios.delete('/api/lists/' + list_id)
      .then(res => {
        this.props.reload();
        this.props.updateListId('');
      })
      .catch(err => console.log(err))
  }

  handleDeleteModal = () => {
    this.setState({ showDeleteListModal: !this.state.showDeleteListModal });
  }

  handleEditModal = () => {
    this.setState({ showEditListModal: !this.state.showEditListModal });
  }
  

  render() {
    // If the beers array is empty, display a message
    if (this.props.beersArray.length === 0) {
      return (
        <div className='beerContainer'>
          <h2 className='listTitle'>{this.props.listName}</h2>
          {(this.props.listName !== 'All Beers' ? <span onClick={this.handleDeleteModal} className='deleteList'>Delete this list</span> : '')}
          <hr />
        <div>
          <h2>You haven't added any beers yet!</h2>
          </div>
          <DeleteListModal
            show={this.state.showDeleteListModal}
            handleListDelete={this.handleListDelete.bind(this)}
            handleDeleteModal={this.handleDeleteModal.bind(this)}
            hideModal={this.handleDeleteModal}
            listName={this.props.listName}
            reload={this.props.reload}
          />
      </div>
      )
    }

    // Load beers into the beer container
    return (
      <div className='beerContainer'>
        <h2 className='listTitle'>
          {this.props.listName}
        </h2>
        {(this.props.listName !== 'All Beers' ?
          <div>
            <span onClick={this.handleEditModal} className='editList'>Edit this list</span> &nbsp; | &nbsp;
            <span onClick={this.handleDeleteModal} className='deleteList'>Delete this list</span>
          </div>
          : '')}
        <hr />
        <div>
          {this.props.beersArray.map(beerEntry => (
            <BeerEntry
              key={beerEntry._id}
              entryId={beerEntry._id}
              beerName={beerEntry.beerName}
              breweryName={beerEntry.breweryName}
              beerRating={beerEntry.beerRating}
              beerNotes={beerEntry.beerNotes}
              dateAdded={beerEntry.date}
              fetchBeers={this.props.fetchBeers}
              reload={this.props.reload}
              allLists={this.props.allLists}
            />
          ))}
        </div>
        <DeleteListModal
          show={this.state.showDeleteListModal}
          handleListDelete={this.handleListDelete.bind(this)}
          handleDeleteModal={this.handleDeleteModal.bind(this)}
          hideModal={this.handleDeleteModal}
          listName={this.props.listName}
          reload={this.props.reload}
        />
        <EditListModal
          show={this.state.showEditListModal}
          hideModal={this.handleEditModal}
          reload={this.props.reload}
          allBeers={this.props.allBeers}
          listName={this.props.listName}
          listId={this.props.listId}
          listBeers={this.props.beersArray}
          updateListId={this.props.updateListId}
        />
      </div>
    )
  }
}

export default BeerContainer;