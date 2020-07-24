import React from 'react';
import {Modal} from 'react-bootstrap';
import { siteUrl } from '../public/endpoins';
import { AuthService } from '../services/AuthService';

const StatusUpload = (props) => {
    console.log(AuthService.getUserName());
    console.log(AuthService.getUserProfileImage())
    return ( 
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.openStatusUploadModal}
        onHide={props.closeStatusUploadModal}
        
    >
        <Modal.Header closeButton>
            <div className='d-flex justify-content-center w100p'>
                <h4 className='alignCenter'>What are you up to?</h4>
            </div>
        </Modal.Header>

        <Modal.Body>
            <div>
                <div className='d-flex align-item'>
                    <img className='brad-40' style={{width: '10%'}} src='https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg' />
                    <p className='p0 mb0 ml10'>@{AuthService.getUserName()}</p>
                </div>
                <form action="">
                    <div class="form-group p20">
                        <textarea class="form-control" placeholder='Say Something...' rows="5"></textarea>
                    </div>
                </form>
            </div>
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
 
export default StatusUpload;