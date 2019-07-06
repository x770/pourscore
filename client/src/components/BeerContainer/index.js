import React from 'react';
import BeerEntry from '../BeerEntry';
import './style.css';

export function BeerContainer(props) {
  console.log(props);
  const beersArray = props.beersArray;
  return (
    <div className='beerContainer'>
      <h2 className='listTitle'>Beers You've Rated</h2>
      <div>
        {beersArray.map((beer) => {
          return <BeerEntry key={beer._id} beer={beer}/>
        })}
      </div>
    </div>
  )
}