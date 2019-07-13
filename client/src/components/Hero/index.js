import React, { Component } from 'react';
import Container from '../Container';
import { Button } from 'react-bootstrap';
import heroImage from './img/beer-hero.jpg';
import './style.css';

class Hero extends Component {

  render() {
    const background = {
      background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${heroImage})`,
      backgroundSize: 'cover',
      zIndex: '-1'
    }
    return (
      <div style ={ { ...background } } className='heroContainer'>
        <Container>
          <h1>There's a lot of beer out there.</h1>
          <p>For beer lovers, there's no shortage of variety, which means finding new beer is easy. Keeping up with what you like and don't? Not so much.</p>
          <br />
          <p>Pourscore helps you do just that, so you can focus on more important things&mdash;like trying new beer.</p>
          <br />
          <Button size='lg' className='button' onClick={this.props.handleSignupModal}>Get Started</Button>
        </Container>
      </div>
    )
  }
}

export default Hero;