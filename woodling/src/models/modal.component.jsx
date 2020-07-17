/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react';
import {Modal, Dropdown} from 'react-bootstrap';
import { copyToClipboard } from '../../public/helperFunctions';
import { siteUrl } from '../../public/endpoins';

const TalentMdoel = (props) => {
   
    const notesRef = useRef();
    const { modalData: {showModal, talent, notes}, hideModel, saveNotes, unstarTalent } = props;
    const [editMode, setEditMode] = useState(false);
    const [talentNotes, setTalentNotes] = useState(notes);
    const clearNotes = () =>{
        setTalentNotes('');
    }

    return ( 
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal}
            onHide={hideModel}
            className="hide-close-btn"
        >
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
                                <Dropdown.Item onClick={()=>copyToClipboard(talentNotes)}><b>Copy Text</b></Dropdown.Item>
                                <Dropdown.Item onClick={()=>clearNotes()}><b>Clear Text</b></Dropdown.Item>
                                <Dropdown.Item onClick={()=>unstarTalent(talent)} className="red"><b>Unstar Talent</b></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body className='scrolling min-h300'>
                {editMode ? (
                        <textarea
                            className="w100p h100p"
                            // value={talentNotes}
                            onChange={()=>setTalentNotes(notesRef.current.value)}
                            onBlur={()=> {saveNotes({talent, notes: notesRef.current.value });setEditMode(false)}}
                            ref={notesRef}
                        >
                            {talentNotes}
                        </textarea>
                    )
                : <p onClick={()=>setEditMode(true)}> { talentNotes ? talentNotes : 'No Notes added'} </p> }
            </Modal.Body>
            {/* <Modal.Footer>
                <div className='d-flex space-between w100p'>
                    <p className='gray'><b>Created: {notes.created}</b></p>
                    <p className='gray'><b>Published: {notes.lastEdit}</b></p>
                </div>
            </Modal.Footer> */}
        </Modal>
     );
}
 
export default TalentMdoel;