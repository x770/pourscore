import React from 'react';
import './style.css';

export default function BeerEntry(props) {
  const parseDate = (oldDate) => {
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = oldDate.slice(8, 10);
    let month = oldDate.slice(5, 7);
    let year = oldDate.slice(0, 4);

    month = monthsArr[month - 1];

    return(`${month} ${day}, ${year}`);
  }

  return (
    <div className='beerEntry'>
      <div className='entryInfoContainer'>
        <h3 className='entryTitle'>
          <span className='beerName'>{props.beerName}</span> by 
          <span className='breweryName'> {props.breweryName}</span> <br />
          <div className='dateAdded'>Added on {parseDate(props.dateAdded)}</div> <br />
        </h3>
      </div>
      <div className='ratingContainer'>
        <div className='beerRating'>
          <div className='ratingNumber'>{props.beerRating}</div>
          <div className='ratingLabel'>RATING</div>
        </div>
      </div>
      <div className='notesContainer'>
        <div className='notesTitle'>Your notes: <span className='beerNotes'>"{props.beerNotes}"</span></div>
      </div>
    </div>
  )
};