import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

class AddModal extends Component {

  state = {
    beerName: '',
    breweryName: '',
    beerRating: '',
    beerNotes: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  updateRating = event => {
    let rating;
    // If/else to add .0 to whole numbers for UI rating system; Example: 2 => 2.0
    if (event.target.value - Math.floor(event.target.value) !== 0) {
      rating = event.target.value;
    } else {
      rating = event.target.value + '.0';
    }
    document.getElementById('sliderOutput').innerText = rating;
  }

  handleFormSubmit = event => {
    event.preventDefault();
    axios.post('/api/beers',
      {
        user: this.props.userId,
        beerName: this.state.beerName,
        breweryName: this.state.breweryName,
        beerRating: this.state.beerRating,
        beerNotes: this.state.beerNotes
      }).then(data => {
        this.props.hideModal();
        this.props.reload();
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Beer</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Label>Beer name: </Form.Label>
            <Form.Control type='text' size='sm' name='beerName' onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Brewery name: </Form.Label>
            <Form.Control type='text' size='sm' name='breweryName' onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Beer rating: </Form.Label>
            <Form.Control type='range' name='beerRating' min='0.0' max='5.0' step='0.5' onInput={this.updateRating} onChange={this.handleInputChange}>
            </Form.Control>
            <div className='ratingOutput'>
              <span className='sliderOutput' id='sliderOutput'></span> / 5.0
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Beer notes: </Form.Label>
            <Form.Control name='beerNotes' as='textarea' row='5' onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
          <hr />
          <Button onClick={this.handleFormSubmit}>
            Submit Rating
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default AddModal;