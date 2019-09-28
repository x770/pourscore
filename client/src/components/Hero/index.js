import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Hero extends Component {
  render() {
    return (
      <div className='heroContainer'>
        <h1>There's a lot of beer out there.</h1>
        <p>
          With so much beer on the market, it's easy to find new things to try. But keeping track of them all? Not so much.
        </p>
        <p>
          Pourscore helps you do just that, so you can focus on more important things&mdash;like trying new beer.
        </p>
        <Link to='/signup'>
          <button className='button button-lg'>Get Started</button>
        </Link>
      </div>
    )
  }
}

export default Hero;