/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react';
import {Modal, Dropdown} from 'react-bootstrap';
import { copyToClipboard } from '../../public/helperFunctions';
import { siteUrl } from '../../public/endpoins';

const TalentMdoel = (props) => {
    const [editMode, setEditMode] = useState(false);
    const notesRef = useRef();
    const { modalData: {showModal, talent, notes}, hideModel, saveNotes } = props;
    return ( 
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal}
            onHide={hideModel}            
        >
            {notes &&(
                <>
                    <Modal.Header>
                        <div className='d-flex align-items-center space-between w100p'>
                            <div className='w75 d-flex align-items-center'>
                                <img className='border-radius60 h60 w60' src={siteUrl+""+talent.profile_thumb} alt="avatar" />
                                <h3 className='fs20 ml10'><b>{talent.full_name}</b></h3>
                            </div>
                            <div className='mr20'>
                                <Dropdown>
                                    <Dropdown.Toggle className='elipsis-dropdown dropDown-btn fa fa-ellipsis-v' />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=>copyToClipboard(notes)}>Copy Text</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Clear Text</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3" className="red">Unstar Talent</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Modal.Header>

                    <Modal.Body className='scrolling'>
                        <p contentEditable={editMode} onClick={()=>setEditMode(true)} onBlur={()=>saveNotes({talent, notes : notesRef.current.innerHTML })} ref={notesRef}>
                            {notes}
                        </p>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <div className='d-flex space-between w100p'>
                            <p className='gray'><b>Created: {notes.created}</b></p>
                            <p className='gray'><b>Published: {notes.lastEdit}</b></p>
                        </div>
                    </Modal.Footer> */}
                </>
            )}
            {!notes &&(
                <>
                    <Modal.Body>
                        <p className="notes">
                            No notes added
                        </p>
                    </Modal.Body>
                </>
            )}
        </Modal>
     );
}
 
export default TalentMdoel;