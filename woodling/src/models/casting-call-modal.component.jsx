import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const CastingCallModal = (props) => {
    const {showModel, hideModel, popupData: {name, btn, skill, description, status, location, expiryDate, Venue,
    Roles}, applyBtn, cancelApplication, Apply} = props;
    console.log(props.applyBtn)
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
                        <h3>{name}</h3>
                        <div className='d-flex'>
                            <button style={{backgroundColor: 'red', color: 'white'}} disabled href="" className="skills-text">{btn}</button>
                            <button style={{marginLeft: '20px'}} disabled href="" className="skills-text">{skill}</button>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='border-bottom'>
                            <p><b>Description</b></p>
                            <p>{description}</p>
                        </div>
                        <div className='border-bottom'>
                            <div className='d-flex space-between'>
                                <p><b>Detail</b></p>
                                <p className='clr__red'><b>{status}</b></p>
                            </div>
                            <p><i className='fa fa-map-marker clr__red mr10'></i>{location}</p>
                            <div className='d-flex space-between'>
                                <p>Start Date: {expiryDate}</p>
                                <p>Deadline: {expiryDate}</p>
                            </div>
                        </div>
                        <div className='border-bottom'>
                            <p><b>Dates & Venues</b></p>
                            <p>{Venue}</p>
                        </div>
                        {Roles.map((role, index) => {
                            return <div className='border-bottom'>
                                        <p><b>Role{index+1}</b></p>
                                        <div className='d-flex space-evenly'>
                                            <div>
                                                <p>Role Type</p>
                                                <p><b>{role.RoleType}</b></p>
                                            </div>
                                            <div>
                                                <p>Gender</p>
                                                <p><b>{role.gender}</b></p>
                                            </div>
                                            <div>
                                                <p>AgeRange</p>
                                                <p><b>{role.AgeRange}</b></p>
                                            </div>
                                        </div>
                                        <p>{role.Detail}</p>
                                        <div className='d-flex row-flex-end'>
                                            {applyBtn ? <button onClick={Apply} className="skills-text">Cancel Application</button> : <button style={{backgroundColor: 'red', color: 'white'}} onClick={cancelApplication} className="skills-text">Apply</button>}
                                        </div>
                                    </div>;
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
     );
}
 
export default CastingCallModal;