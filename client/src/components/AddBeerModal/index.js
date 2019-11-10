import React from 'react';
import './style.css';

const AddBeerModal = ({ show, handleModal, children }) => {
  const modalClassName = show ? 'modal show' : 'modal hide';

  return (
    <div className={modalClassName}>
      <section className='modalMain'>
        <button onClick={handleModal}>Close</button>
        {children}
      </section>
    </div>
  )
}

export default AddBeerModal;