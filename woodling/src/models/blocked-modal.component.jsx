import React from 'react';
import { Modal } from 'react-bootstrap';
import { picUrl } from '../public/endpoins';

const BlockedModal = (props) => {
    const { openModal, closeModal, blocked, handleUnblock, status } = props;
    
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
                <h4><b>Blocked Accounts</b></h4>
                <button onClick={closeModal} className='skills-btn'>Done</button>
            </div>
            </Modal.Header>
            <Modal.Body>
                {status==='empty' ? blocked && blocked.map((i, index) => {
                    return <div key={index} className='p20 border-bottom'>
                            <div className='d-flex align-items-center space-between'>
                                <div className='d-flex align-items-center'>
                                    <img className='brad-40 w20 h70' src={i.profile_thumb ? picUrl+""+i.profile_thumb : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} />
                                    <div className='ml10'>
                                        <p className='mb0'>{i.full_name}</p>
                                        <p className='gray fs13 mb0'>@{i.username}</p>
                                    </div>
                                </div>
                                <p onClick={() => handleUnblock(i)} className='update-btn outline align-self-center pointer'>Unblock</p>
                            </div>
                    </div>
                }) : <p><b>No Blocked User</b></p>}
            </Modal.Body>
        </Modal>
     );
}
 
export default BlockedModal;