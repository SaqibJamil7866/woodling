import React from 'react';
import {Modal, Button, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TalentMdoel = (props) => {
    const menuClass = `dropdown-menu${props.openDropdown ? " show" : ""}`;
    return ( 
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.showModel}
            onHide={props.hideModel}
        >
            <Modal.Header onClick={() => props.toggleClose}>
                <div className='d-flex align-items-center space-between w100p'>
                    <div className='w75 d-flex align-items-center'>
                        <img className='border-radius60 h60' src={props.notes.img} />
                        <h3 className='fs20 ml10'><b>{props.notes.name}</b></h3>
                    </div>
                    <div className='mr20'>
                        <div className="dropdown dropleft" onClick={props.toggleOpen}>
                            <button className="fa fa-ellipsis-v border-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                            <div className={menuClass} aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" href="#"><b>Copy Text</b></Link>
                                <Link className="dropdown-item" href="#"><b>Clear Text</b></Link>
                                <Link className="dropdown-item" href="#"><b>Unstar Talent</b></Link>
                            </div>
                        </div>
                        
                        {/* <Dropdown>
                        
                            <Dropdown.Toggle className='dropDown-btn' >
                                <i className='fa fa-ellipsis-v pointer'></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </div>
                </div>

            </Modal.Header>
            <Modal.Body className='scrolling'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, asperiores dicta provident eveniet ducimus ullam praesentium commodi, ratione id minima tenetur magnam amet aut! Velit cupiditate error eius recusandae placeat.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, asperiores dicta provident eveniet ducimus ullam praesentium commodi, ratione id minima tenetur magnam amet aut! Velit cupiditate error eius recusandae placeat.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, asperiores dicta provident eveniet ducimus ullam praesentium commodi, ratione id minima tenetur magnam amet aut! Velit cupiditate error eius recusandae placeat.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, asperiores dicta provident eveniet ducimus ullam praesentium commodi, ratione id minima tenetur magnam amet aut! Velit cupiditate error eius recusandae placeat.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, asperiores dicta provident eveniet ducimus ullam praesentium commodi, ratione id minima tenetur magnam amet aut! Velit cupiditate error eius recusandae placeat.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, asperiores dicta provident eveniet ducimus ullam praesentium commodi, ratione id minima tenetur magnam amet aut! Velit cupiditate error eius recusandae placeat.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, asperiores dicta provident eveniet ducimus ullam praesentium commodi, ratione id minima tenetur magnam amet aut! Velit cupiditate error eius recusandae placeat.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <div className='d-flex space-between w100p'>
                    <p className='gray'><b>Created: {props.notes.created}</b></p>
                    <p className='gray'><b>Published: {props.notes.lastEdit}</b></p>
                </div>
            </Modal.Footer>
        </Modal>
     );
}
 
export default TalentMdoel;