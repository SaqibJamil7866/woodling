/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import { siteUrl } from '../public/endpoins';
import { AuthService } from '../services/AuthService';
import TagAndLoc from '../components/common/home-modal-inputfields.component';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
// import '@progress/kendo-theme-default/dist/all.css';

class StatusUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // data: props.tagPeople.slice(),
            value: []
        };
    }


    filterChange = (event) => {
        console.log('filterChanege', this.state.data)
        this.setState({
            data: filterBy(this.props.tagPeople.slice(), event.filter)
        });
    }

    // get this method to the parent component
    handleChange = (event) => {
        console.log('handle Cahnfe')
        this.setState({
            value: event.target.value
        });
    }
    render() {
        console.log(this.props.posts)
        return ( 
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.openStatusUploadModal}
                onHide={this.props.closeStatusUploadModal}
            >
                <Modal.Header closeButton>
                    <div className='d-flex justify-content-center w100p'>
                        <h4 className='alignCenter'>What are you up to?</h4>
                    </div>
                </Modal.Header>
        
                <Modal.Body>
                    <div>
                        <div className='d-flex align-item'>
                            <img className='brad-40' style={{width: '10%'}} src='https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg' />
                            <p className='p0 mb0 ml10'>@{AuthService.getUserName()}</p>
                        </div>
                        <form action="">
                            <div className="form-group p20">
                                <textarea className="form-control" placeholder='Say Something...' rows="5"></textarea>
                            </div>
                            <div className='form-group'>
                                <TagAndLoc 
                                    tagPeople={this.props.tagPeople}
                                    filterChange={this.filterChange}
                                    handleChange={this.handleChange}
                                    value={this.state.value}
                                    textField="title" 
                                    dataItemKey="id" 
                                    filter={true}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <div className='d-flex space-between w100p'>
                        <p className='gray'><b>Created: {notes.created}</b></p>
                        <p className='gray'><b>Published: {notes.lastEdit}</b></p>
                    </div>
                </Modal.Footer> */}
            </Modal>
         );
    }
}
 
export default StatusUpload;