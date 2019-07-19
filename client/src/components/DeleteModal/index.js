import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css';

class DeleteModal extends Component {

  handleDeleteConfirm = (event) => {

    this.props.deleteBeer(event);
    this.props.reload();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Are you sure?</h2>
            <span className='deleteNotice'>Deleting this beer cannot be undone.</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{this.props.breweryName} {this.props.beerName}</h2>
          <span>Rated {this.props.beerRating} out of 5.0.</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={this.handleDeleteConfirm}>Delete this Beer</Button>
          <Button variant='outline-secondary' size='sm' onClick={this.props.handleDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteModal;