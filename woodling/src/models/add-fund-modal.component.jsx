import React, { useRef } from 'react';
import { Modal } from 'react-bootstrap';

const AddFundModal = (props) => {
    const fundInput = useRef();
    const { showModal, handleFundCloseModal, handleAddFund } = props;

    return ( 
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal}
            onHide={handleFundCloseModal}
            className="hide-close-btn"
        >
            <Modal.Body>
                <div className="row">
                    <div className='col-md-8'>
                        <input placeholder='0' type="number" ref={fundInput} className="form-control brder-l-r-t mt-10 p20" />
                    </div>
                    <div className="col-md-4">
                        <button className="addPopupFundsBtn" onClick={()=>handleAddFund(fundInput && fundInput.current && fundInput.current.value)}>
                            <img src={require('../assets/fingerprint.png')} style={{width:'30px'}} alt="finger print" />
                            ADD FUNDS
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
 
export default AddFundModal;