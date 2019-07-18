import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

class BeerEntry extends Component {

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

  // Handle entry delete
  handleDelete = event => {
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
            <h3>{this.props.breweryName} {this.props.beerName}</h3>
          </div>
          <div className='dateContainer'>
            <div>Added on {this.parseDate(this.props.dateAdded)}</div>
          </div>
          <div className='notesContainer'>
            <div>Your notes: <span className='beerNotes'>"{this.props.beerNotes}"</span></div>
          </div>
          <div className='buttonsContainer'>
            <Button variant='warning' size='sm' >Edit this Beer</Button> &nbsp;
            <Button variant='outline-danger' size='sm' onClick={this.handleDelete} >Delete this Beer</Button>
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
      </div>
    )
  }
}

export default BeerEntry;