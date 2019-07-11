import React from 'react';
import BeerEntry from '../BeerEntry';
import './style.css';

export function BeerContainer(props) {
  if (props.beersArray.length === 0) {
    return (
      <div className='beerContainer'>
      <h2 className='listTitle'>Beers You've Rated</h2>
      <div>
        <h2>You haven't rated any beers yet!</h2>
      </div>
    </div>
    )
  }
  return (
    <div className='beerContainer'>
      <h2 className='listTitle'>Beers You've Rated</h2>
      <hr />
      <div>
        {props.beersArray.map(beerEntry => (
          <BeerEntry
            key={beerEntry._id}
            beerName={beerEntry.beerName}
            breweryName={beerEntry.breweryName}
            beerRating={beerEntry.beerRating}
            beerNotes={beerEntry.beerNotes}
            dateAdded={beerEntry.date}
          />
        ))}
      </div>
    </div>
  )
}