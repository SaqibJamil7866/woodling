import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import MultiSelectDropdown from '../components/common/multi_select.component';
import { SettingService } from '../services/Setting';

class MySkillsModal extends Component {
    state = {  }
    // async componentDidMount() {
    //     // await SettingService.getSkills()
    //     // .then
    // }
    render() { 
        const { closeSkillModal, skillModal, allSkills, handleSkills, data } = this.props;
        console.log(allSkills);
        return ( 
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={skillModal}
                onHide={closeSkillModal}
                className="hide-close-btn"
            >
                <Modal.Header>
                    <div className='d-flex space-between w100p'>
                        <h1><b>Edit Skills</b></h1>
                        <button onClick={closeSkillModal} className='skills-btn'>Done</button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='h400'>
                        <MultiSelectDropdown 
                            data={allSkills}
                            value={data}
                            handleChange={handleSkills}
                            textField="name" 
                            dataItemKey="id" 
                            filter={true}
                        />
                    </div>
                </Modal.Body>
            </Modal>
         );
    }
}
 
export default MySkillsModal;