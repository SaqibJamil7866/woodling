import React from 'react';
import { Modal } from 'react-bootstrap';
import MultiSelectDropdown from '../components/common/multi_select.component';

const CircleForModal = (props) => {
    const { openCircleForModal, closeCircleForModal, allSkills, data, handleSkillChange } = props;
    return ( 
        <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={openCircleForModal}
        onHide={closeCircleForModal}
        >
            <Modal.Header>
                <div className='d-flex space-between w100p'>
                    <h3><b>Who is this Circle for?</b></h3>
                    <button onClick={closeCircleForModal} className='skills-btn'>Done</button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='h400'>
                    <MultiSelectDropdown 
                        data={allSkills}
                        value={data}
                        handleChange={handleSkillChange}
                        textField="name" 
                        dataItemKey="id" 
                        filter={true}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}
 
export default CircleForModal;