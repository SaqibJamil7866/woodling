import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthService } from '../services/AuthService';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { CastingCallService } from '../services/CastingCallsService';
import { ActivityStreamService } from '../services/ActivityStreamService';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../public/loader';

class EventModal extends Component {
    state = { 
        event_name: '',
        event_type: 'concert',
        description: '',
        show: false,
        concert: true,
        drama: false,
        party: false,
        locations: [],
        isLocationLoading: false,
        selectedLocation: '',
        lat: '',
        lng: '',
        formatted_address:'',
        city:'',
        country: '',
        date: '',
        time: '',
        images: '',
        uploadImages: ''
    }

    handleImages = (event) => {
       this.setState({uploadImages: event.target.files[0], images: URL.createObjectURL(event.target.files[0])});
        console.log(this.state.images)
    }

    handleOptionBtn = (e) => {
        console.log(e.currentTarget.name)
        this.setState({event_type: e.currentTarget.name}, () => {
            console.log(this.state.event_type)
            if(this.state.event_type === 'show') {
                this.setState({show: true, concert: false, drama: false, party: false});
            }
            else if(this.state.event_type === 'concert') {
                this.setState({show: false, concert: true, drama: false, party: false});
            }
            else if(this.state.event_type === 'drama') {
                this.setState({show: false, concert: false, drama: true, party: false});
            }
            else if(this.state.event_type === 'party') {
                this.setState({show: false, concert: false, drama: false, party: true});
            }
        })
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

    disablePastDt = current => {
        const yesterday = moment().subtract(1, 'day');
        return current.isAfter(yesterday);
    }

    handleDate = (name) => (e) => {
        const date = new Date(e).toLocaleDateString('en-GB')
        const time = new Date().toLocaleTimeString();
        this.setState({date: date, time: time})
        console.log(new Date(e).toLocaleDateString('en-GB'));
    }

    handleSubmit = async() => {
        const fd = new FormData();
        const { time, lat, lng, formatted_address, city, country, event_name, description, event_type, date, uploadImages } = this.state;
        if(!uploadImages, !formatted_address, !event_name, !description, !time) {
            ToastsStore.error("Please select all fields");
            return false;
        }

        fd.append('user_id', AuthService.getUserId());
        fd.append('type', 'event');
        fd.append('privacy', 'public');
        fd.append('event_name', event_name);
        fd.append('event_description', description);
        fd.append('event_venue', formatted_address);
        fd.append('event_type', event_type);
        fd.append('event_time', time);
        fd.append('event_date', date);
        fd.append('lat', lat);
        fd.append('lng', lng);
        fd.append('formatted_address', formatted_address);
        fd.append('city', city);
        fd.append('country', country);
        fd.append('photo', uploadImages)

        showLoader()
        await ActivityStreamService.submitScript(fd)
        .then((response) => {
            if(response.data.status !== 'error') {
                // const res= response.data;
                ToastsStore.success(response.data.message); 
                this.props.closeEventModal();
            }else{
                console.log('error')
                ToastsStore.error(response.message); 
            }
        }).catch(e => console.log(e))
        .then(() => hideLoader());
    }

    render() { 
        const { openEventModal, closeEventModal } = this.props;
        const { event_name, show, concert, drama, party, description, isLocationLoading, locations, date, images } = this.state;
        return ( 
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openEventModal}
                onHide={closeEventModal}
            >
                <Modal.Header closeButton>
                    <div className='d-flex justify-content-center w100p'>
                        <h4 className='alignCenter'>Event</h4>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-item'>
                        <img className='brad-40 w10p h50' src={AuthService.getUserProfileImage()} />
                        <p className='p0 mb0 ml10'>@{AuthService.getUserName()}</p>
                    </div>
                    <div className='w100p d-flex flex-dir-col align-item'>
                        <div className="form-group p20 w70 d-flex flex-dir-col align-item mb0">
                            <label className='ml10 fs25' for="event_name">Script Title</label>
                            <input value={event_name} onChange={(e)=>this.setState({event_name: e.target.value})} type="text" placeholder='Write event name here' className="form-control brder-l-r-t mt-10" id="script_title" name='script_title' />
                        </div>
                        <div className="form-group p20 w70 d-flex flex-dir-col align-item">
                            <label className='ml10 fs25' for="script_title">Event Type(choose one)</label>
                            <div className='d-flex space-between w100p mt20'>
                                <button onClick={this.handleOptionBtn} className={show ? 'skills-btn outline mt0 plr20' : 'skills-text outline mt0 plr20'} name='show'>Show</button>
                                <button onClick={this.handleOptionBtn} className={concert ? 'skills-btn outline mt0 plr20' : 'skills-text outline mt0 plr20'} name='concert'>concert</button>
                                <button onClick={this.handleOptionBtn} className={drama ? 'skills-btn outline mt0 plr20' : 'skills-text outline mt0 plr20'} name='drama'>Drama</button>
                                <button onClick={this.handleOptionBtn} className={party ? 'skills-btn outline mt0 plr20' : 'skills-text outline mt0 plr20'} name='party'>Party</button>
                            </div>
                        </div>
                        <div className="form-group w70 p20 d-flex flex-dir-col align-item">
                            <label className='ml10 fs25' for="script_title">Description</label>
                            <textarea className="form-control" value={description} onChange={(e)=>this.setState({description: e.target.value})} placeholder='Write Description here' rows="5" />
                        </div>
                        <div className='form-group w70 p20'>
                            <i className='fa fa-map-marker tag-icon padding-right-40'>  Location</i>
                            <div style={{width:'70%', display:'inline-block'}}>
                                <AsyncTypeahead
                                    id="location_typehead"
                                    labelKey="description"
                                    isLoading={isLocationLoading}
                                    placeholder="Search for a Location (type min 3 char)"
                                    minLength={3}
                                    onSearch={this.handleLocationSearch}
                                    onChange={this.handleLocation}
                                    options={locations}
                                    className="form-control border-none bckgrnd-grey h45px box-shadow-none"
                                />
                            </div>
                        </div>
                        <div className='w70 p20 d-flex'>
                            <div className='d-flex justify-content-center align-items-center bckgrnd-dark-grey w40 h45px'>
                                <i className='fa fa-calendar fs20' />
                                <p className='p0 m0 ml5'><b>Start Date:*</b></p>
                            </div>
                            <DatePicker
                                isValidDate={this.disablePastDt}
                                value={date}
                                onChange={this.handleDate('date')}
                                className="form-control date-picker border-none bckgrnd-grey h45px box-shadow-none"
                            />
                        </div>
                        <div className='w100p'>
                            {images!=='' ? <div>
                                <div className=''>
                                    <div className='w20 border-radius-20 ml20 d-flex flex-dir-col align-item float-left'>
                                        <img className='w100p ' src={images} />
                                    </div>
                                </div>
                                <label className='w100p' for='file-upload'>
                                    <div className='d-flex justify-content-center'>
                                        <div className='d-flex align-item pointer'>
                                            <i className='fa fa-plus-circle red' />
                                            <p className='mb0 red'>Add Photo(s)</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        
                            :
                            <div className='d-flex justify-content-center align-item flex-dir-w100p'>
                                <label className='w50 d-flex justify-content-center align-item flex-dir-col' for='file-upload'>
                                
                                    <div className='bkgrnd-light-red w40 d-flex justify-content-center align-item h150 border-radius-15 pointer'>
                                        <i className='fa fa-camera red fs30' />
                                    </div>
                                    <div className='d-flex align-item pointer'>
                                        <i className='fa fa-plus-circle red' />
                                        <p className='mb0 red'>Add Photo(s)</p>
                                    </div>
                            
                                </label>
                            </div>}
                            <input
                                onChange={this.handleImages}
                                id="file-upload"
                                accept="image/*"
                                style={{ display: "none" }}
                                type="file"
                                name="Add Profile Picture"
                            />
                        </div>
                        <div className='form-group d-flex justify-content-center'>
                            <button onClick={this.handleSubmit} type="button" className="profile-btn">Post</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
 
export default EventModal;