import React from 'react';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const AddExperience = (props) => {
    const { experienceModal, closeExperienceModal, allSkills, allRoleType, disablePastDt, disableDeadlineDt, handleChange } = props;
    const { project, skill_id, role_type, company, location, start_date, end_date, desciption } = props.addExperience;
    return ( 
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={experienceModal}
            onHide={closeExperienceModal}
        >
            <Modal.Header>
                <div className='d-flex space-between w100p'>
                    <h1 className='fs25'><b>Add Experience</b></h1>
                    <button className='skills-btn'>Done</button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='border'>
                    <div className='d-flex justify-content-center'>
                        <form className=''>
                            <div className='form-group'>
                                <label for='project' className='grey'>Title</label>
                                <input value={project} onChange={handleChange} type="text" className="form-control brder-l-r-t mt-10" id="project" name='project' />
                            </div>
                            <div className='form-group'>
                                <label for='company' className='grey'>Compnay/Institute</label>
                                <input value={company} onChange={handleChange} type="text" className="form-control brder-l-r-t mt-10" id="company" name='company' />
                            </div>
                            <div className='form-group'>
                                <label for='skill_id' className='grey'>Role</label>
                                <select value={skill_id} onChange={handleChange} name="skill_id" id="skill_id" className="form-control bold form-control brder-l-r-t mt-10" placeholder='Gender'>
                                    {allSkills.map((i, index) => {
                                        return <option key={index} value={i.id}>{i.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label for='role_type' className='grey'>Role Type</label>
                                <select value={role_type} onChange={handleChange} name="role_type" id="role_type" className="form-control bold form-control brder-l-r-t mt-10" placeholder='Gender'>
                                    {allRoleType.map((i, index) => {
                                        if(i.name===''){
                                            return null;
                                        }
                                        return <option key={index} value={i.id}>{i.name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label for='location' className='grey'>Location</label>
                                <input value={location} type="text" className="form-control brder-l-r-t mt-10" id="location" name='location' />
                            </div>
                            <div className="form-group">
                                <label className='ml10 gray' for="start_date">Start Date</label>
                                <DatePicker
                                    // value={}
                                    // onChange={this.handleDate('date_of_birth')}
                                    isValidDate={disablePastDt}
                                    className="form-control dates border-none "
                                />
                            </div>
                            <div className="form-group">
                                <label className='ml10 gray' for="start_date">End Date</label>
                                <DatePicker
                                    // value={}
                                    // onChange={this.handleDate('date_of_birth')}
                                    isValidDate={disableDeadlineDt}
                                    className="form-control dates border-none "
                                />
                            </div>
                            <div className='form-group'>
                                <label for='location' className='grey'>Location</label>
                                <textarea className="form-control" placeholder='Write here(200 characters)' rows="8" name='discription' id='discription' />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
     );
}
 
export default AddExperience;