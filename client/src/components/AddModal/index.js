import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

class AddModal extends Component {

  state = {
    beerName: '',
    breweryName: '',
    beerRating: '',
    beerNotes: '',
    lists: []
  }

  componentDidMount = () => {
    this.setState({
      beerName: '',
      breweryName: '',
      beerRating: '',
      beerNotes: '',
      lists: []
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSelectChange = event => {
    let selectedOptions = [...event.target.options].filter(o => o.selected).map(o => o.value);

    this.setState({
      lists: selectedOptions
    })
  }

  updateRating = event => {
    let rating = event.target.value;
    document.getElementById('sliderOutput').innerText = rating;
  }

  handleFormSubmit = async (event) => {

    let addedRes = await axios.post('/api/beers', {
      user: this.props.userId,
      lists: this.state.lists,
      beerName: this.state.beerName,
      breweryName: this.state.breweryName,
      beerRating: this.state.beerRating,
      beerNotes: this.state.beerNotes
    })

    let addedBeer = addedRes.data;
    let beerId = addedBeer._id;
    let listsArray = addedRes.data.lists;

    const promises = listsArray.map(
      async listId => {
        await axios.put(
          '/api/lists/' + listId,
          { $push: { beers: beerId } }
        )
      })
  
    await Promise.all(promises);
    await this.componentDidMount();
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
          <span>Fields marked with an (*) are required. </span>
          <br /> <br />
          <Form.Group>
            <Form.Label>Beer name:* </Form.Label>
            <Form.Control
              required
              type='text'
              size='sm'
              name='beerName'
              onChange={this.handleInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Brewery name:* </Form.Label>
            <Form.Control
              required
              type='text'
              size='sm'
              name='breweryName'
              onChange={this.handleInputChange}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Beer rating: </Form.Label>
            <Form.Control type='range' name='beerRating' min='0.0' max='5.0' step='0.5' onInput={this.updateRating} onChange={this.handleInputChange}>
            </Form.Control>
            <div className='ratingOutput'>
              <span className='sliderOutput' id='sliderOutput'></span> / 5
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Beer notes: </Form.Label>
            <Form.Control name='beerNotes' as='textarea' row='5' onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Add this beer to lists: </Form.Label>
            <Form.Control as='select' multiple name='lists' onChange={this.handleSelectChange}>
              {this.props.allLists.map(
                list => (
                  <option key={list._id} value={list._id} onChange={this.handleSelectChange}>
                    {list.name}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>
          <hr />
          <Button type='submit' className='submitButton' onClick={this.handleFormSubmit}>
            Submit Beer
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default AddModal;