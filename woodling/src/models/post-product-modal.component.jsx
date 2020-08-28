import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthService } from '../services/AuthService';
import { ActivityStreamService } from '../services/ActivityStreamService';
import priceValidator from '../public/priceValidator';
import { CastingCallService } from '../services/CastingCallsService';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { showLoader, hideLoader } from '../public/loader';
import { ToastsStore } from 'react-toasts';

class PostProduct extends Component {
    state = { 
        product: true,
        service: false,
        sell: 'Product',
        images: [],
        uploadImages: [],
        nameOfProduct: '',
        titleOfService: '',
        productTypeId: '34',
        serviceTypeId: '6',
        productType: [],
        serviceType: [],
        lookingTo: 'sell',
        currency: [],
        currencySign: '$',
        price: '',
        costOfService: '',
        locations: [],
        isLocationLoading: false,
        selectedLocation: '',
        lat: '',
        lng: '',
        formatted_address:'',
        city:'',
        country: '',
        description: ''
    }

    async componentDidMount() {
        await ActivityStreamService.getProductType()
        .then((res) => {
            this.setState({productType: res.data.data})
        }).catch((e) => console.log(e))

        await ActivityStreamService.getServiceType()
        .then((res) => {
            this.setState({serviceType: res.data.data})
        }).catch((e) => console.log(e))
        
        await ActivityStreamService.getCurrencySymbols()
        .then((res) => {
            this.setState({currency: res})
        })
    }

    handleMultipleImages = (event) => {
        for(let i=0; i<event.target.files.length; i++) {
            this.state.uploadImages.push(event.target.files[i]);
            this.state.images.push(URL.createObjectURL(event.target.files[i]))
        }
        console.log(this.state.images)
        this.setState({showImages: true})
    }

    handleSellingOption = (e) => {
        this.setState({sell: e.currentTarget.name}, () => {
            if(this.state.sell === 'Product') {
                this.setState({product: true, service: false});
            }
            else if(this.state.sell === 'Service') {
                this.setState({service: true, product: false});
            }
        })
    }

    handleDeleteImage = (data) => {
        const list1 = this.state.images;
        const list2 = this.state.uploadImages;
        list1.splice(data, 1);
        list2.splice(data, 1);
        this.setState({images: list1, uploadImages: list2})
    }

    handleChange = (e) => {
        if(e.currentTarget.name === 'productType') {
            this.setState({productTypeId: e.currentTarget.value})
        }
        else if(e.currentTarget.name === 'serviceType') {
            this.setState({serviceTypeId: e.currentTarget.value})
        }
        else if(e.currentTarget.name === 'currency') {
            this.setState({currencySign:e.currentTarget.value})
        }
        else if(e.currentTarget.name === 'price') {
            const a = priceValidator(e.currentTarget.value)
            if(a === true) {
                this.setState({price: e.currentTarget.value})
            }
        }
        else if(e.currentTarget.name === 'cost') {
            const a = priceValidator(e.currentTarget.value)
            if(a === true) {
                this.setState({price: e.currentTarget.value})
            }
        }
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

    handleSubmit = async () => {
        const fd = new FormData();
        const { product, service, description,lat, lng, formatted_address, city, country, uploadImages, sell, titleOfService, nameOfProduct, price, productTypeId, serviceTypeId, lookingTo, currencySign,  } = this.state;
        if(product) {
            if(!uploadImages, !formatted_address, !nameOfProduct, !price) {
                ToastsStore.error("Please select all fields");
                return false;
            }else {
                fd.append('name', nameOfProduct);
                fd.append('category', 'product');
                fd.append('product_type_id', productTypeId);
                fd.append('purpose', lookingTo);
                fd.append('price', price);
                fd.append('currency', currencySign);
                fd.append('description', description);
                fd.append('formatted_address', formatted_address);
                fd.append('lat', lat);
                fd.append('lng', lng);
                fd.append('country', country);
                fd.append('city', city);
                fd.append('user_id', AuthService.getUserId());
                for(let i=0; i<=uploadImages.length; i++) {
                    fd.append('photo', uploadImages[i])
                }
                showLoader()
                await ActivityStreamService.submitProduct(fd)
                .then((res) => {
                    if(res.data.status !== 'error'){
                        ToastsStore.success(res.data.message); 
                        this.props.closeProductModal();
                    }
                    else{
                        console.log('error')
                        ToastsStore.error(res.message); 
                    }
                }).catch(e => console.log(e))
                .then(() => hideLoader());
            }
        }else {
            if(!uploadImages, !formatted_address, !titleOfService, price) {
                ToastsStore.error("Please select all fields");
                return false;
            }else {
                fd.append('name', titleOfService);
                fd.append('category', 'service');
                fd.append('product_type_id', serviceTypeId);
                fd.append('price', price);
                fd.append('currency', currencySign);
                fd.append('description', description);
                fd.append('formatted_address', formatted_address);
                fd.append('lat', lat);
                fd.append('lng', lng);
                fd.append('country', country);
                fd.append('city', city);
                fd.append('user_id', AuthService.getUserId());
                for(let i=0; i<=uploadImages.length; i++) {
                    fd.append('photo', uploadImages[i])
                }
                showLoader()
                await ActivityStreamService.submitProduct(fd)
                .then((res) => {
                    if(res.data.status !== 'error'){
                        ToastsStore.success(res.data.message); 
                        this.props.closeProductModal();
                    }
                    else{
                        console.log('error')
                        ToastsStore.error(res.message); 
                    }
                }).catch(e => console.log(e))
                .then(() => hideLoader());
            }
        }
    }

    render() { 
        const { openProductModal, closeProductModal } = this.props;
        const { product, service, images, nameOfProduct, titleOfService, productType, serviceType, lookingTo, currency,
            productTypeId, serviceTypeId, currencySign, price, costOfService, isLocationLoading, locations, description } = this.state;
        return ( 
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openProductModal}
                onHide={closeProductModal}
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
                    <div className='w100p d-flex flex-dir-col align-item'>
                        <div className="form-group p20 w70 d-flex flex-dir-col align-item mb0">
                            <label className='ml10 fs25' for="script_title">What do you want to sell?</label>
                            <div className='d-flex mt20 w50p space-between'>
                                <button onClick={this.handleSellingOption} className={product ? 'skills-btn outline mt0 plr20' : 'skills-text outline mt0 plr20'} name='Product'>Product</button>
                                <button onClick={this.handleSellingOption} className={service ? 'skills-btn outline mt0 plr20' : 'skills-text outline mt0 plr20'} name='Service'>Service</button>
                            </div>
                            {/* <input value={script_title} onChange={(e)=>this.setState({script_title: e.target.value})} type="text" placeholder='Write the title of your script here' className="form-control brder-l-r-t mt-10" id="script_title" name='script_title' /> */}
                        </div>
                    </div>
                    {images.length!==0 ? <div>
                        <div className=''>
                            {images.map((i, index) => {
                                return <div className='w20 border-radius-20 ml20 d-flex flex-dir-col align-item float-left'>
                                    <i onClick={() => this.handleDeleteImage(index)} className='fa fa-times red fs20 pointer' />
                                    <img className='w100p' src={i} />
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
                    <div className='w100p'>
                        <label className='w50 d-flex justify-content-center align-item ' for='file-upload'>
                        
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
                    <div>
                        <div className='w100p d-flex'>
                            <div className="form-group p20 w50p d-flex flex-dir-col mb0">
                                <label className='ml10 fs25' for="script_title">{product ? 'Product Name' : 'Title'}</label>
                                <input value={product ? nameOfProduct : titleOfService} onChange={product ? (e)=>this.setState({nameOfProduct: e.target.value}) : (e)=>this.setState({titleOfService: e.target.value})} type="text" placeholder={product ? 'Name of your product' : 'Title of your service'} className="form-control brder-l-r-t mt-10" id="script_title" name='script_title' />
                            </div>
                            <div className="form-group p20 w50p d-flex flex-dir-col mb0">
                                <label className='ml10 fs25' for="inputState">{product ? 'Production Type' : 'Type of Services'}</label>
                                <select value={product ? productTypeId : serviceTypeId} onChange={this.handleChange} name={product ? 'productType' : 'serviceType'} id="inputState" className="form-control bold box-shadow-none border-radius-30 w65" placeholder='ProductType'>
                                  {product ? productType.map((i, index) => {
                                      return <option key={index} value={i.id}>{i.name}</option>
                                  }) : serviceType.map((i, index) => {
                                    return <option key={index} value={i.id}>{i.name}</option>
                                })}
                              </select> 
                            </div>
                        </div>
                        <div className='w100p d-flex'>
                            {product ? <div className="form-group p20 w35 d-flex flex-dir-col mb0">
                                <label className='ml10 fs25' for="event_name">Looking to</label>
                                <div className='d-flex'>
                                    <label className="containers">Sell
                                        <input checked={lookingTo==='sell' ? true : null} onClick={() => this.setState({lookingTo: 'sell'})}  type="radio" name="radio" />
                                        <span className="checkmark" />
                                    </label>
                                    <label className="containers">Rent
                                        <input checked={lookingTo==='rent' ? true : null} onClick={() => this.setState({lookingTo: 'rent'})} type="radio" name="radio" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                            </div> : null}
                            <div className={product ? "form-group p20 w35 d-flex flex-dir-col mb0" : 'form-group p20 w50p d-flex flex-dir-col mb0'}>
                                <label className='ml10 fs25'>Choose Currency</label>
                                <select value={currencySign} onChange={this.handleChange} name='currency'  id="inputState" className="form-control bold box-shadow-none border-radius-30 w65" placeholder='ProductType'>
                                    {currency.map((i, index) => {
                                        return <option key={index} value={i}>{i}</option>
                                    })}
                                </select>
                            </div>
                            <div className={product ? "form-group p20 w35 d-flex flex-dir-col mb0" : "form-group p20 w50p d-flex flex-dir-col mb0"}>
                                <label className='ml10 fs25' for="cost">{product ? 'Price' : 'Cost of Service'}</label>
                                <input value={product ? price : costOfService} onChange={this.handleChange} type="text" placeholder='0' className="form-control brder-l-r-t mt-10" id="cost" name={product ? 'price' : 'cost'} />
                            </div>
                        </div>
                        <div className='form-group w100p p20 d-flex justify-content-center'>
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
                        <div className="form-group w100p d-flex flex-dir-col align-item p20">
                            <label className='ml10 fs25' for="cost">Description</label>
                            <textarea className="form-control" value={description} onChange={(e)=>this.setState({description: e.target.value})} placeholder='Write Description here' rows="5" />
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
 
export default PostProduct;