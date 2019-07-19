import React, { Component } from 'react';
import BeerEntry from '../BeerEntry';
import './style.css';

class BeerContainer extends Component {

  render() {
    // If the beers array is empty, display a message
    if (this.props.beersArray.length === 0) {
      return (
        <div className='beerContainer'>
          <h2 className='listTitle'>Your Beers</h2>
          <hr />
        <div>
          <h2>You haven't added any beers yet!</h2>
        </div>
      </div>
      )
    }

    // Load beers into the beer container
    return (
      <div className='beerContainer'>
        <h2 className='listTitle'>Your Beers</h2>
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
            />
          ))}
        </div>
      </div>
    )
  }
}

export default BeerContainer;