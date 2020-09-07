import React from 'react';
import { Modal } from 'react-bootstrap';
import { siteUrl, picUrl } from '../public/endpoins';
const CircleMemberModal = (props) => {
    const { openCircleMemberModal, closeCircleMemberModal, allMembers, onCrash, handleMember } = props;
    return ( 
        <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={openCircleMemberModal}
        onHide={closeCircleMemberModal}
        >
            <Modal.Header>
                <div className='d-flex space-between w100p'>
                    <h3 className='fs20'><b>Add Members to your Circle</b></h3>
                    <button onClick={closeCircleMemberModal} className='skills-btn'>Done</button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {allMembers && allMembers.map((i, index) => {
                        return <div className='p10 d-flex'>
                            <div className='w25'>
                                <img onError={onCrash} className={i.premium==='1'? 'premium-border w100p following-img' : 'following-img w100p'} src={i.profile_picture!=='' ? picUrl+""+i.profile_picture : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} />
                            </div>
                            <div className='w100p'>
                                <div className='d-flex space-between w100p align-item'>
                                    <div>
                                        <div className='d-flex'>
                                            <p className='mb0 fs25'>{i.full_name}</p>
                                            {i.premium==='1' ? <img className='h35' src={require('../assets/Group 1977.svg')} /> : null}
                                        </div>
                                        <p className='clr-grey'>@{i.username}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handleMember(i)} className="skills-btn">ADD</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </Modal.Body>
        </Modal>
    );
}
 
export default CircleMemberModal;