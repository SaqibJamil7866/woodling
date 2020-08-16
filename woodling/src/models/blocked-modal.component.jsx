import React from 'react';
import { Modal } from 'react-bootstrap';

const BlockedModal = (props) => {
    const { openModal, closeModal } = props;
    return ( 
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={openModal}
            onHide={closeModal}
            className="hide-close-btn"
        >
            <Modal.Header>
            <div className='d-flex space-between w100p'>
                <h1><b>Edit Skills</b></h1>
                <button onClick={closeModal} className='skills-btn'>Done</button>
            </div>
            </Modal.Header>
        </Modal>
     );
}
 
export default BlockedModal;