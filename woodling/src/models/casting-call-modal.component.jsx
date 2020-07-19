/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from 'react';
import {Modal} from 'react-bootstrap';

const CastingCallModal = (props) => {
    const {showModel, hideModel, popupData: { data , role_details }, applyBtns, cancelApplication, Apply} = props;
    const checkApplyBtnStatus = (index) => {
        const result = applyBtns.includes(index);
        return result;
    }

    return ( 
        <div>
            <Modal
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
                                <i aria-hidden="true" className='fa fa-times fs30' />
                            </button>
                        </div>
                        <div className="attachment-share">
                            <div className="more-icon">
                                <a href="javascript:;" className="more-optinon"><i className="fa fa-ellipsis-h" /></a>
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
                        <h3>{data[0].title}</h3>
                        <div className='d-flex'>
                            <button style={{backgroundColor: 'red', color: 'white'}} disabled className="skills-text">{data[0].production_type}</button>
                            <button style={{marginLeft: '20px'}} disabled className="skills-text">{data[0].skill}</button>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='border-bottom'>
                            <p><b>Description</b></p>
                            <p>{data[0].description}</p>
                        </div>
                        <div className='border-bottom'>
                            <div className='d-flex space-between'>
                                <p><b>Detail</b></p>
                                <p className='clr__red'><b>{data[0].status}</b></p>
                            </div>
                            <p><i className='fa fa-map-marker clr__red mr10' />{data[0].formatted_address}</p>
                            <div className='d-flex space-between'>
                                <p>Start Date: {data[0].start_date}</p>
                                <p>Deadline: {data[0].deadline}</p>
                            </div>
                        </div>
                        <div className='border-bottom'>
                            <p><b>Dates & Venues</b></p>
                            <p>{data[0].date_venue}</p>
                        </div>
                        {role_details && role_details.map((role, index) => {
                            return(
                                <div key={role.id} className='border-bottom'>
                                    <p><b>Role {index+1}</b></p>
                                    <div className='d-flex space-evenly'>
                                        <div>
                                            <p>Role Type</p>
                                            <p><b>{role.role_type}</b></p>
                                        </div>
                                        <div>
                                            <p>Gender</p>
                                            <p><b>{role.gender}</b></p>
                                        </div>
                                        <div>
                                            <p>AgeRange</p>
                                            <p><b>{role.age_from}-{role.age_to}</b></p>
                                        </div>
                                    </div>
                                    <p>{role.role_description}</p>
                                    <div className='d-flex row-flex-end'>
                                        { checkApplyBtnStatus(index) ? <button onClick={()=>cancelApplication(index)} className="skills-text">Cancel Application</button> : <button style={{backgroundColor: 'red', color: 'white'}} onClick={()=>Apply({data: data[0], role, index })} className="skills-text">Apply</button>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
     );
}
 
export default CastingCallModal;