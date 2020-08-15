import React from 'react';
import { Modal } from 'react-bootstrap';

const ChangePassword = (props) => {
    const { handleOpenModal, handleCloseModal, handlePasswordChange, handlePassDone, errors } = props;
    const { current_password, new_password, retype_password } = props.password;
    return ( 
        <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={handleOpenModal}
                onHide={handleCloseModal}
                className="hide-close-btn"
            >
                <Modal.Header>
                    <div className='d-flex space-between w100p'>
                        <h5><b>Edit Skills</b></h5>
                        <button onClick={handlePassDone} className='skills-btn'>Done</button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='p20'>
                            <input value={current_password} onChange={handlePasswordChange} placeholder='Old Password' type="password" className="form-control brder-l-r-t mt-10 p20" id="current_password" name='current_password' />
                            {errors.current_password && <p className="alert alert-danger error">{errors.current_password}</p>}
                        </div>
                        <div className='p20'>
                            <input value={new_password} onChange={handlePasswordChange} placeholder='New Password' type="password" className="form-control brder-l-r-t mt-10 p20" id="new_password" name='new_password' />
                            {errors.current_password && <p className="alert alert-danger error">{errors.current_password}</p>}
                        </div>
                        <div className='p20'>
                            <input value={retype_password} onChange={handlePasswordChange} placeholder='Current Password' type="password" className="form-control brder-l-r-t mt-10 p20" id="retype_password" name='retype_password' />
                            {errors.retype_password && <p className="alert alert-danger error">{errors.retype_password}</p>}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
     );
}
 
export default ChangePassword;