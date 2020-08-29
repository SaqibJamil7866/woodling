import React from 'react';
import { Modal } from 'react-bootstrap';

const AlertModal = (props) => {

    return(
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.showModal}
            onHide={props.closeAlertModal}
        >
            <Modal.Header>
                <div className='d-flex space-between w100p'>
                    <h1 className='fs25'><b>Add Experience</b></h1>
                </div>
            </Modal.Header>
            <Modal.Body>
                This is Alert popup.
            </Modal.Body>
        </Modal>
    )
}

export default AlertModal;
