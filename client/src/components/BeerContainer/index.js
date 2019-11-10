import React, { Component } from 'react';
import { withContext } from '../../context/appContext.js';
import BeerEntry from '../BeerEntry';
import axios from 'axios';
import './style.css';

class BeerContainer extends Component {
  render() {
    return (
      <div>
        {this.props.state.beers.map(beerEntry => (
          <BeerEntry
            key={beerEntry._id}
            entryId={beerEntry._id}
            beerName={beerEntry.name}
            breweryName={beerEntry.brewery}
            beerRating={beerEntry.beerRating}
            beerNotes={beerEntry.beerNotes}
            dateAdded={beerEntry.date}
            fetchBeers={this.props.fetchBeers}
            reload={this.props.reload}
            allLists={this.props.allLists}
          />
        ))}
      </div>
    )
  }
}

export default withContext(BeerContainer);