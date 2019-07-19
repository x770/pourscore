import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

class EditBeerModal extends Component {

  state = {
    beerName: '',
    breweryName: '',
    beerRating: '',
    beerNotes: ''
  }

  componentDidMount = async () => {
    this.setState({
      beerName: this.props.beerName,
      breweryName: this.props.breweryName,
      beerRating: this.props.beerRating,
      beerNotes: this.props.beerNotes
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  updateRating = event => {
    document.getElementById('sliderOutput').innerText = '';
    let rating;
    // If/else to add .0 to whole numbers for UI rating system; Example: 2 => 2.0
    if (event.target.value - Math.floor(event.target.value) !== 0) {
      rating = event.target.value;
    } else {
      rating = event.target.value + '.0';
    }
    document.getElementById('sliderOutput').innerText = rating;
  }

  handleFormSubmit = async event => {
    event.preventDefault();

    await axios.put('/api/beers/' + this.props.beerId, {
      beerName: this.state.beerName,
      breweryName: this.state.breweryName,
      beerRating: this.state.beerRating,
      beerNotes: this.state.beerNotes
    })

    await this.props.hideModal();
    await this.props.reload();
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
            <Form.Control
              required
              type='text'
              size='sm'
              name='beerName'
              value={this.state.beerName}
              onChange={this.handleInputChange}>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Brewery name: </Form.Label>
            <Form.Control
              required
              type='text'
              size='sm'
              name='breweryName'
              value={this.state.breweryName}
              onChange={this.handleInputChange}>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Beer rating: </Form.Label>
            <Form.Control
              type='range'
              name='beerRating'
              min='0.0' max='5.0' step='0.5'
              value={( this.state.beerRating ? this.state.beerRating : '' )}
              onInput={this.updateRating}
              onChange={this.handleInputChange}>
            </Form.Control>
            <div className='ratingOutput'>
              <span className='sliderOutput' id='sliderOutput'>
                {(this.state.beerRating ? this.state.beerRating : 'Not rated')}
              </span> / 5
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Beer notes: </Form.Label>
            <Form.Control
              name='beerNotes'
              as='textarea'
              row='5'
              value={this.state.beerNotes}
              onChange={this.handleInputChange}>
            </Form.Control>
          </Form.Group>
          <hr />
          <Button className='submitButton' onClick={this.handleFormSubmit}>
            Save Changes
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default EditBeerModal;