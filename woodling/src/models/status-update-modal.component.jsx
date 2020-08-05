/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import { siteUrl } from '../public/endpoins';
import { AuthService } from '../services/AuthService';
import TagAndLoc from '../components/common/home-modal-inputfields.component';
import {CastingCallService} from '../services/CastingCallsService';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
// import '@progress/kendo-theme-default/dist/all.css';

class StatusUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formatted_address: '',
            value: [],
            locations: []
        };
    }


    filterChange = (event) => {
        this.setState({
            data: filterBy(this.props.tagPeople.slice(), event.filter)
        });
    }

    // get this method to the parent component
    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleLocation = (e) => {
        this.setState({formatted_address: e.currentTarget.value}, () => {
            CastingCallService.getLocation(this.state.formatted_address)
            .then((res) => {
                this.setState({locations: res.data.predictions}, () => {
                    console.log(this.state.locations)
                })
            })
        })
    }
    render() {
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
                                    formatted_address={this.state.formatted_address}
                                    handleLocation={this.handleLocation}
                                    locations={this.state.locations}
                                />
                            </div>
                            <div className='form-group d-flex justify-content-center'>
                                <button onClick={this.handleSubmit} className="profile-btn">Post</button>
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