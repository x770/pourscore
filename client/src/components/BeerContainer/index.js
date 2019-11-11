import React, { Component } from 'react';
import { withContext } from '../../context/appContext.js';
import BeerEntry from '../BeerEntry';
import BeerCard from './BeerCard';
import axios from 'axios';
import './style.css';

class BeerContainer extends Component {
  // Parse ISO8601 date to a 'Month Date, Year' format
  parseDate = (oldDate) => {
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let day = oldDate.slice(8, 10);
    let month = oldDate.slice(5, 7);
    let year = oldDate.slice(0, 4);

    month = monthsArr[month - 1];

    return (`${month} ${day}, ${year}`);
  }

  render() {
    return (
      <div className='beerContainer'>
        {/* {this.props.state.beers.map(beerEntry => (
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
        ))} */}
        {this.props.state.beers.map(beer => (
          <BeerCard
            key={beer._id}
            name={beer.name}
            brewery={beer.brewery}
            notes={beer.notes}
            rating={beer.rating}
            dateAdded={this.parseDate(beer.date)}
          />
        ))}
        {this.props.state.beers.map(beer => (
          <BeerCard
            key={beer._id}
            name={beer.name}
            brewery={beer.brewery}
            notes={beer.notes}
            rating={beer.rating}
            dateAdded={this.parseDate(beer.date)}
          />
        ))}
        {this.props.state.beers.map(beer => (
          <BeerCard
            key={beer._id}
            name={beer.name}
            brewery={beer.brewery}
            notes={beer.notes}
            rating={beer.rating}
            dateAdded={this.parseDate(beer.date)}
          />
        ))}
      </div>
    )
  }
}

export default withContext(BeerContainer);