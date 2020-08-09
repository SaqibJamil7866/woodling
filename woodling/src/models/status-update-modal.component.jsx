/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import { filterBy } from '@progress/kendo-data-query';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { picUrl } from '../public/endpoins';
import { AuthService } from '../services/AuthService';
import TagAndLoc from '../components/common/home-modal-inputfields.component';
import {CastingCallService} from '../services/CastingCallsService';
// import '@progress/kendo-theme-default/dist/all.css';

class StatusUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formatted_address: '',
            value: [],
            locations: [],
            data: this.props.tagPeople
        };
    }
    
    // Custom item rendering of multiselect
    itemRender = (li, itemProps) => {
        const itemChildren = (
            <div style={{ color: "#00F" }}>
                <div className="w50 inline-block">
                    <img style={{marginTop:'-10px'}} src={itemProps.dataItem.profile_thumb ? picUrl+itemProps.dataItem.profile_thumb : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} className="brad-40 w50 h50" alt="profile pic" />
                </div>
                <div className="ml10 pt10 dark-gray  inline-block">
                    {itemProps.dataItem.full_name} <br />
                    <b>{itemProps.dataItem.username}</b>
                </div> 
            </div>
        );

        return React.cloneElement(li, li.props, itemChildren);
    }

    filterChange = (event) => {
        this.setState({
            data: filterBy(this.state.data.slice(), event.filter)
        });
    }

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
                                    tagPeople={this.state.data}
                                    handleChange={this.handleChange}
                                    filterChange={this.filterChange}
                                    value={this.state.value}
                                    itemRender={this.itemRender}
                                    filter={true}
                                    formatted_address={this.state.formatted_address}
                                    handleLocation={this.handleLocation}
                                    locations={this.state.locations}
                                    dataItemKey="id"
                                    textField="full_name"
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