import React from 'react';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


const AddExperience = (props) => {
    const { experienceModal, closeExperienceModal, allSkills, allRoleType, disablePastDt, disableDeadlineDt, handleChange, isLocationLoading, handleLocationSearch, handleLocation, locations, errors, handleDate, handleAddExperienceButton, updateExperience, handleUpdateExperience } = props;
    const { project, skill_id, role_type, company, location, start_date, end_date, description } = props.addExperience;
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
                    <button onClick={handleAddExperienceButton} className='skills-btn'>Done</button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='border'>
                    <div className='d-flex justify-content-center'>
                        <form className=''>
                            <div className='form-group'>
                                <label for='project' className='grey'>Title</label>
                                <input value={project} onChange={handleChange} type="text" className="form-control brder-l-r-t mt-10" id="project" name='project' />
                                {errors.title && <p className="alert alert-danger error">{errors.title}</p>}
                            </div>
                            <div className='form-group'>
                                <label for='company' className='grey'>Compnay/Institute</label>
                                <input value={company} onChange={handleChange} type="text" className="form-control brder-l-r-t mt-10" id="company" name='company' />
                                {/* <input value={company} type="text" className="form-control brder-l-r-t mt-10" id="company" name='company' /> */}
                                    {errors.title && <p className="alert alert-danger error">{errors.title}</p>}
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
                                {errors.title && <p className="alert alert-danger error">{errors.title}</p>}
                            </div>
                            <div className='form-group'>
                                <label for='location' className='grey'>Location</label>
                                <AsyncTypeahead
                                    id="location_typehead"
                                    labelKey="description"
                                    isLoading={isLocationLoading}
                                    placeholder="Search for a Location (type min 3 char)"
                                    minLength={3}
                                    onSearch={handleLocationSearch}
                                    onChange={handleLocation}
                                    options={locations}
                                    className="form-control box-shadow-none border-none brder-l-r-t mb20"
                                />
                            </div>
                            <div className="form-group">
                                <label className='ml10 gray' for="start_date">Start Date</label>
                                <DatePicker
                                    value={start_date}
                                    onChange={handleDate('start_date')}
                                    isValidDate={disablePastDt}
                                    className="form-control dates border-none "
                                />
                                {errors.title && <p className="alert alert-danger error">{errors.title}</p>}
                            </div>
                            <div className="form-group">
                                <label className='ml10 gray' for="start_date">End Date</label>
                                <DatePicker
                                    value={end_date}
                                    onChange={handleDate('end_date')}
                                    isValidDate={disableDeadlineDt}
                                    className="form-control dates border-none "
                                />
                                {errors.title && <p className="alert alert-danger error">{errors.title}</p>}
                            </div>
                            <div className='form-group'>
                                <label for='description' className='grey'>Desciption</label>
                                <textarea value={description} onChange={handleChange} className="form-control" placeholder='Write here(200 characters)' rows="8" name='description' id='description' />
                                {errors.title && <p className="alert alert-danger error">{errors.title}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
     );
}
 
export default AddExperience;