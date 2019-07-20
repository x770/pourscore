import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css';

class DeleteListModal extends Component {

  handleDeleteConfirm = (event) => {

    this.props.handleListDelete(event);
    this.props.handleDeleteModal();
    this.props.reload();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Are you sure?</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='deleteNotice'>
            Deleting this list cannot be undone. <br />
            Beers within this list will not be deleted.
          </div>
          <div>This list will be deleted:</div>
          <h2> {this.props.listName} </h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={this.handleDeleteConfirm}>Delete this List</Button>
          <Button variant='outline-secondary' size='sm' onClick={this.props.handleDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteListModal;