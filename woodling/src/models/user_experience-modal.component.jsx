import React from 'react';
import {Modal} from 'react-bootstrap';

const UserExperienceModal = (props) => {
    const  {openModal, closeModal} = props;
    const {project, company, role, role_type, location, start_date, end_date, description} = props.userModalData;
    console.log(props.userModalData);
    return ( 
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={openModal}
            onHide={closeModal}
            className="hide-close-btn"
        >
            <Modal.Body>
                <div className='d-flex justify-content-center'>
                    <div onClick={closeModal} className='modal-content close-btn w5 mt-30'>
                        <button type='button' className='close'>
                            <i aria-hidden="true" className='fa fa-times fs30'></i>
                        </button>
                    </div>
                </div>
                <div className='d-flex'>
                    <div>
                        <p>Title</p>
                        <p><b>{project}</b></p>
                        <p>Company/Institution</p>
                        <p><b>{company}</b></p>
                        <p>Role & Role Type</p>
                        <div className='d-flex w80 space-between align-item'>
                            <button disabled href="" className="skills-text m0">{role}</button>
                            <p className='p0 m0'><b>{role_type}</b></p>
                        </div>
                        <p className='mt20'>Location & Date</p>
                        <p className='m0 p0'><b>{location}</b></p>
                        <p><b>{start_date} - {end_date}</b></p>
                    </div>
                    <div className='ml30'>
                        <p>Description</p>
                        <p><b>{description}</b></p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
     );
}
 
export default UserExperienceModal;