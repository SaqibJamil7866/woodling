/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Modal} from 'react-bootstrap';
import { ToastsStore } from 'react-toasts';
import { filterBy } from '@progress/kendo-data-query';
import { picUrl } from '../public/endpoins';
import { AuthService } from '../services/AuthService';
import TagAndLoc from '../components/common/home-modal-inputfields.component';
import { ActivityStreamService } from '../services/ActivityStreamService';
import {CastingCallService} from '../services/CastingCallsService';
// import '@progress/kendo-theme-default/dist/all.css';

class StatusUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLocation: '',
            description: '',
            lat: '',
            lng: '',
            formatted_address:'',
            city:'',
            country: '',
            selectedPeople: [],
            locations: [],
            isLocationLoading: false,
            data: this.props.tagPeople
        }; 
    }
    
    // Custom item rendering of multiselect
    itemRender = (li, itemProps) => {
        const itemChildren = (
            <div style={{ color: "#00F" }}>
                <div className="w20 inline-block">
                    <img style={{marginTop:'-10px'}} src={itemProps.dataItem.profile_thumb ? picUrl+itemProps.dataItem.profile_thumb : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} className="brad-40 w100p h50" alt="profile pic" />
                </div>
                <div className="ml5 pt10  dark-gray  inline-block">
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
            selectedPeople: event.target.value
        });
    }

    handleLocationSearch = (keyword) =>{
        this.setState({isLocationLoading: true});
        CastingCallService.getLocation(keyword)
        .then((res) => {
            this.setState({isLocationLoading: false, locations: res.data.predictions});
        })
    }

    handleLocation = (location) => {
        if(location && location.length > 0){
            this.setState({selectedLocation: location[0]}, () => {
                const {selectedLocation}= this.state;
                ActivityStreamService.getLocationDetailByPlaceId(selectedLocation.place_id)
                .then((response) => {
                    const res= response.data.results[0];
                    const address = selectedLocation.description.split(',');
                    this.setState({city: address[address.length-2],country: address[address.length-1],lat: res.geometry.location.lat, lng: res.geometry.location.lng, formatted_address: res.formatted_address})
                })
            })
        }
    }

    handlePostSubmit = () => {
        const {description, lat, lng, formatted_address, city, country, selectedPeople} = this.state;
        if(!description || !formatted_address || !selectedPeople){
            ToastsStore.error("Please select all fields");
            return false;
        }
        const people = selectedPeople.map((obj)=>{
            return obj.id;
        }).join(',');
        const User_id = AuthService.getUserId();
        ActivityStreamService.submitPost({User_id, description, lat, lng, formatted_address, people, city, country, type: "Text", privacy: "public"})
        .then((response) => {debugger
            const res= response.data;
            this.props.closeStatusUploadModal();
        })
    }

    render(){
        const { openStatusUploadModal, closeStatusUploadModal } = this.props;
        const { data, selectedPeople, description, locations } = this.state;
        return ( 
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openStatusUploadModal}
                onHide={closeStatusUploadModal}
            >
                <Modal.Header closeButton>
                    <div className='d-flex justify-content-center w100p'>
                        <h4 className='alignCenter'>What are you up to?</h4>
                    </div>
                </Modal.Header>
        
                <Modal.Body>
                    <div>
                        <div className='d-flex align-item'>
                            <img className='brad-40 w10p h50' src={AuthService.getUserProfileImage()} />
                            <p className='p0 mb0 ml10'>@{AuthService.getUserName()}</p>
                        </div>
                        <form>
                            <div className="form-group p20">
                                <textarea className="form-control" value={description} onChange={(e)=>this.setState({description: e.target.value})} placeholder='Say Something...' rows="5" />
                            </div>
                            <div className='form-group'>
                                <TagAndLoc 
                                    tagPeople={data}
                                    handleChange={this.handleChange}
                                    filterChange={this.filterChange}
                                    value={selectedPeople}
                                    itemRender={this.itemRender}
                                    filter={true}
                                    locations={locations}
                                    isLocationLoading={this.isLocationLoading}
                                    handleLocationSearch={this.handleLocationSearch}
                                    handleLocation={this.handleLocation}
                                    dataItemKey="id"
                                    textField="full_name"
                                />
                            </div>
                            <div className='form-group d-flex justify-content-center'>
                                <button type="button" onClick={this.handlePostSubmit} className="profile-btn">Post</button>
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