import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthService } from '../services/AuthService';
import { ActivityStreamService } from '../services/ActivityStreamService';
import currencyToSymbolMap from 'currency-symbol-map/map'

class PostProduct extends Component {
    state = { 
        product: true,
        service: false,
        sell: 'Product',
        images: [],
        uploadImages: [],
        nameOfProduct: '',
        titleOfService: '',
        productTypeId: '',
        serviceTypeId: '',
        productType: [],
        serviceType: [],
        lookingTo: 'sell',
        currency: []
    }

    async componentDidMount() {
        await ActivityStreamService.getProductType()
        .then((res) => {
            this.setState({productType: res.data.data})
        }).catch((e) => console.log(e))

        await ActivityStreamService.getServiceType()
        .then((res) => {
            this.setState({serviceType: res.data.data}, () => {
                console.log(res.data.data)
            })
        }).catch((e) => console.log(e))
        this.state.currency.push(currencyToSymbolMap)
        console.log('currency', this.state.currency)
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
    }

    render() { 
        const { openProductModal, closeProductModal } = this.props;
        const { product, service, images, nameOfProduct, titleOfService, productType, serviceType, lookingTo, currency } = this.state;
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
                                <select value={product ? productType : serviceType} onChange={this.handleChange} name={product ? 'productType' : 'serviceType'} id="inputState" className="form-control bold box-shadow-none border-radius-30 w65" placeholder='ProductType'>
                                  {product ? productType.map((i, index) => {
                                      return <option value={i.id}>{i.name}</option>
                                  }) : serviceType.map((i, index) => {
                                    return <option value={i.id}>{i.name}</option>
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
                            <div className="form-group p20 w35 d-flex flex-dir-col mb0">
                                <label className='ml10 fs25'>Choose Currency</label>
                                <select  id="inputState" className="form-control bold box-shadow-none border-radius-30 w65" placeholder='ProductType'>
                                    {/* <option>{currencyToSymbolMap}</option> */}
                                    {currency.map((i, index) => {
                                        return <option key={index} value={JSON.stringify(i)}>{i.AED}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
 
export default PostProduct;