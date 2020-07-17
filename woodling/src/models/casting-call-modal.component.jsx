import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const CastingCallModal = (props) => {
    const {showModel, hideModel, popupData} = props;
    return ( 
        <div>
            <Modal
                // {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModel}
                onHide={hideModel}
            >
                <Modal.Header>
                <div className="modal-header post-modal-header">
                        <div onClick={hideModel} className='modal-content close-btn'>
                            <button type='button' className='close'>
                                <i aria-hidden="true" className='fa fa-times fs30'></i>
                            </button>
                        </div>
                        <div className="attachment-share">
                            <div className="more-icon">
                                <a href="" class="more-optinon"><i className="fa fa-ellipsis-h" /></a>
                            </div>
                            <div className="share-icon">
                                <a href="" className="share-optinon"><i className="fa fa-share-alt" /></a>
                            </div>
                            <div className="link-icon">
                                <a href="" className="link-optinon"><i className="fa fa-link" /></a>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-dir-col'>
                        <h3>{popupData.name}</h3>
                        <div className='d-flex'>
                            <button style={{backgroundColor: 'red', color: 'white'}} disabled href="" className="skills-text">{popupData.btn}</button>
                            <button style={{marginLeft: '20px'}} disabled href="" className="skills-text">{popupData.skill}</button>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={hideModel}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default CastingCallModal;