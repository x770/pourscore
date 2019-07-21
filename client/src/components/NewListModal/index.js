import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

class NewListModal extends Component {

  state = {
    listName: '',
    beers: []
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
      beers: selectedOptions
    })
  }

  handleFormSubmit = async () => {
    await axios.post('/api/lists', {
      name: this.state.listName,
      user: this.props.userId,
      beers: this.state.beers
    })
    await this.props.hideModal();
    await this.props.reload();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New List</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Label>List name: </Form.Label>
            <Form.Control required type='text' size='sm' name='listName' onChange={this.handleInputChange} ref={this.inputListName}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select beers to add to this list: </Form.Label>
            <Form.Control as='select' multiple name='beers' onChange={this.handleSelectChange} style={{ height: '250px'}}>
              {this.props.allBeers.map(
                beer => (
                  <option key={beer._id} value={beer._id} onChange={this.handleSelectChange}>
                    {beer.breweryName} {beer.beerName}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>
          <hr />
          <Button type='submit' className='submitButton' onClick={this.handleFormSubmit}>
            Create List
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default NewListModal;