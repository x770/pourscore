import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

class EditListModal extends Component {
  state = {
    listName: '',
    beers: []
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.listName !== this.props.listName && this.props.listId !== '') {
    
      let listRes = await axios.get('/api/lists/' + this.props.listId)
      let listData = listRes.data[0];

      await this.setState({
        listName: listData.name,
        beers: listData.beers
      })
    }
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

  handleFormSubmit = async (event) => {
    event.preventDefault();

      await axios.put('/api/lists/' + this.props.listId, {
        name: this.state.listName,
        beers: this.state.beers
      })

      await this.props.updateListId('');
      await this.props.hideModal();
      await this.props.reload();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this List</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Label>List name: </Form.Label>
            <Form.Control required type='text' size='sm' name='listName' onChange={this.handleInputChange} value={this.state.listName} ref={this.inputListName}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select beers to add to this list: </Form.Label>
            <Form.Control as='select' multiple value={this.state.beers} name='beers' onChange={this.handleSelectChange} style={{ height: '250px'}}>
              {this.props.allBeers.map(
                beer => (
                  <option
                    key={beer._id}
                    value={beer._id}
                    onChange={this.handleSelectChange}
                  >
                    {beer.breweryName} {beer.beerName}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>
          <hr />
          <Button type='submit' className='submitButton' onClick={this.handleFormSubmit}>
            Save Changes
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default EditListModal;