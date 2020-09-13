import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthService } from '../services/AuthService';
import TagAndLoc from '../components/common/home-modal-inputfields.component';
import { picUrl } from '../public/endpoins';
import { ActivityStreamService } from '../services/ActivityStreamService';
import {CastingCallService} from '../services/CastingCallsService';
import { filterBy } from '@progress/kendo-data-query';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../public/loader';

class PictureModal extends Component {
    state = { 
        images: [],
        uploadImages: [],
        selectedLocation: '',
        caption: '',
        lat: '',
        lng: '',
        formatted_address:'',
        city:'',
        country: '',
        selectedPeople: [],
        locations: [],
        isLocationLoading: false,
        data: this.props.tagPeople
    }

    handleMultipleImages = (event) => {
        for(let i=0; i<event.target.files.length; i++) {
            this.state.uploadImages.push(event.target.files[i]);
            this.state.images.push(URL.createObjectURL(event.target.files[i]))
        }
        console.log(this.state.images)
        this.setState({showImages: true})
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

    handleDeleteImage = (data) => {
        const list1 = this.state.images;
        const list2 = this.state.uploadImages;
        list1.splice(data, 1);
        list2.splice(data, 1);
        this.setState({images: list1, uploadImages: list2})
    }

    handleSubmit = async() => {
        const fd = new FormData();
        const { lat, lng, formatted_address, city, country, selectedPeople, uploadImages, caption } = this.state;
        if(!uploadImages, !formatted_address, !selectedPeople) {
            ToastsStore.error("Please select all fields");
            return false;
        }
        const people = selectedPeople.map((obj)=>{
            return obj.id;
        }).join(',');

        fd.append('user_id', AuthService.getUserId());
        fd.append('type', 'photo');
        fd.append('privacy', 'public');
        fd.append('lat', lat);
        fd.append('lng', lng);
        fd.append('formatted_address', formatted_address);
        fd.append('city', city);
        fd.append('country', country);
        fd.append('caption', caption);
        fd.append('post_tagged_users', people);
        
        for(let i=0; i<=uploadImages.length; i++) {
            fd.append('photo', uploadImages[i])
        }
        showLoader()
        await ActivityStreamService.submitPicture(fd)
        .then((response) => {
            if(response.data.status !== 'error') {
                // const res= response.data;
                ToastsStore.success(response.data.message); 
                this.props.closePictureUploadModal();
            }else{
                console.log('error')
                ToastsStore.error(response.message); 
            }
        }).catch(e => console.log(e))
        .then(() => hideLoader());
    }

    render() { 
        const { openPictureUploadModal, closePictureUploadModal } = this.props;
        const { data, selectedPeople, caption, locations, images } = this.state;
        return ( 
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openPictureUploadModal}
                onHide={closePictureUploadModal}
            >
                <Modal.Header closeButton>
                    <div className='d-flex justify-content-center w100p'>
                        <h4 className='alignCenter'>Image</h4>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-item'>
                        <img className='brad-40 w10p h50' src={AuthService.getUserProfileImage()} />
                        <p className='p0 mb0 ml10'>@{AuthService.getUserName()}</p>
                    </div>
                    {images.length!==0 ? <div>
                        <div className=''>
                            {this.state.images.map((i, index) => {
                                return <div className='w20 border-radius-20 ml20 d-flex flex-dir-col align-item float-left'>
                                    <i onClick={() => this.handleDeleteImage(index)} className='fa fa-times red fs20 pointer' />
                                    <img className='w100p ' src={i} />
                                </div>;
                            })}
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
                        onChange={this.handleMultipleImages}
                        id="file-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        name="Add Profile Picture"
                        multiple="multiple"
                    />
                    <div className="form-group p20">
                        <label className='ml10 fs25' for="caption">Add Caption</label>
                        <input value={caption} onChange={(e)=>this.setState({caption: e.target.value})} type="text" placeholder='Write Something' className="form-control brder-l-r-t mt-10" id="caption" name='add_caption' />
                    </div>
                    <div className='form-group p20'>
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
                        <button onClick={this.handleSubmit} type="button" className="profile-btn">Post</button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
 
export default PictureModal;