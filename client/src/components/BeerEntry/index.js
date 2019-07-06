import React from 'react';
import './style.css';

export default function BeerEntry(props) {
  console.log(props);
  return (
    <div className='beerEntry'>
      <h3 className='beerName'>{props.beer}</h3>
      <h4 className='beerRating'>Beer Rating: *****</h4>
      <p className='beerNotes'>Your notes: </p>
    </div>
  )
};