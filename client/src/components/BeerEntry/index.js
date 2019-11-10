import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DeleteBeerModal from '../DeleteBeerModal';
import EditBeerModal from '../EditBeerModal';
import axios from 'axios';
import './style.css';

class BeerEntry extends Component {

  state = {
    showDeleteModal: false,
    showEditModal: false
  }

  // Parse ISO8601 date to a 'Month Date, Year' format
  parseDate = (oldDate) => {
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = oldDate.slice(8, 10);
    let month = oldDate.slice(5, 7);
    let year = oldDate.slice(0, 4);

    month = monthsArr[month - 1];

    return (`${month} ${day}, ${year}`);
  }

  // Format rating so that whole numbers display as #.0; Rating of 2 => 2.0
  formatRating = (rating) => {
    if (rating.toString().length === 1) {
      return rating + '.0'
    }
    return rating.toString();
  }

  // Handle edit modal
  handleEditModal = (event) => {
    this.setState({ showEditModal: !this.state.showEditModal })
  }

  // Handle delete modal
  handleDeleteModal = () => {
		this.setState({ showDeleteModal: !this.state.showDeleteModal })
	}

  // Handle entry delete
  deleteBeer = event => {
    event.preventDefault();

    let entryId = this.props.entryId;

    axios.delete('/api/beers/' + entryId)
      .then(
        () => {
          this.props.fetchBeers();
        }
      )
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <div className='entryContainer'>
          <div className='titleContainer'>
            <p>{this.props.breweryName} {this.props.beerName}</p>
          </div>
          <div className='dateContainer'>
            <div>Added on {this.parseDate(this.props.dateAdded)}</div>
          </div>
          <div className='notesContainer'>
            <div>Your notes: <span className='beerNotes'>"{this.props.beerNotes}"</span></div>
          </div>
          <div className='buttonsContainer'>
            <Button variant='warning' size='sm' onClick={this.handleEditModal}>Edit this Beer</Button> &nbsp;
            <Button variant='outline-danger' size='sm' onClick={this.handleDeleteModal} >Delete this Beer</Button>
          </div>
          <div className='ratingContainer'>
            {this.props.beerRating ? (
              <div className='beerRating'>
                <div className='ratingNumber'>{
                  this.formatRating(this.props.beerRating)
                }</div>
                <div className='ratingLabel'>RATING</div>
              </div>
            ) : (
              <div className='emptyRating'></div>
              )}
          </div>
        </div>
        <hr />
        <EditBeerModal
          show={this.state.showEditModal}
          hideModal={this.handleEditModal}
          allLists={this.props.allLists}
          beerName={this.props.beerName}
          breweryName={this.props.breweryName}
          beerRating={this.props.beerRating}
          beerNotes={this.props.beerNotes}
          beerId={this.props.entryId}
          reload={this.props.reload}
        />
        <DeleteBeerModal
          show={this.state.showDeleteModal}
          hideModal={this.handleDeleteModal}
          beerName={this.props.beerName}
          breweryName={this.props.breweryName}
          beerRating={this.props.beerRating}
          formatRating={this.formatRating.bind(this)}
          deleteBeer={this.deleteBeer.bind(this)}
          handleDeleteModal={this.handleDeleteModal.bind(this)}
          reload={this.props.reload}
        />
      </div>
    )
  }
}

export default BeerEntry;