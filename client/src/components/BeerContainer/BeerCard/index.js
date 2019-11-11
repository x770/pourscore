import React, { Component } from 'react';
import './style.css';

class BeerCard extends Component {
  render() {
    return (
      <div className='beerCard'>
        <div className='beerCardInner'>
          <div className='beerCardHeader'>
            <div className='beerCardRow'>
              <p className='beerName'>{this.props.name}</p>
              <p className='cardOptionsToggle'>...</p>
            </div>
            <p className='brewery'>{this.props.brewery}</p>
            <p className='dateAdded'>{this.props.dateAdded}</p>
          </div>
          <div className='beerCardBody'>
            <p className='rating'>Your Rating: {this.props.rating ? this.props.rating : 'None'}</p>
            <p className='notes'>{this.props.notes ? `"${this.props.notes}"` : ''}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default BeerCard;