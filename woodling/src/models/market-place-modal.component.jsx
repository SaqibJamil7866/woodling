import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { picUrl, siteUrl } from '../public/endpoins';
import { Modal, Button } from 'react-bootstrap';
import { MarketPlaceService } from '../services/MarketPlace';
import RatingStar from '../components/common/rating-stars.component';
import convertToFloat from '../public/helperFunctions';
import { showLoader, hideLoader } from '../public/loader';

class MarketPlaceModal extends Component {
    state = { 
        likes: [],
        relatedProd: [],
        status: ''
    }
    async componentDidMount() {
        showLoader();
        await MarketPlaceService.getPostLike(this.props.modalData.post_id)
        .then((res) => {
            this.setState({likes: res.data.data, status: res.data.status});
        }).catch((e) => console.log(e));

        await MarketPlaceService.getRelatedPost(this.props.modalData.product_id)
        .then((res) => {
            this.setState({relatedProd: res.data.data, status: res.data.status})
        }).catch((e) => console.log(e))

        .then(() => hideLoader());
        hideLoader();
    }
    render() { 
        const {postModal, handleCloseModal} = this.props;
        const {name, product_type, path, purpose, currency, price, full_name, username, profile_thumb, profile_picture, rating, formatted_address} = this.props.modalData;
        const {likes, status, relatedProd} = this.state;
        return ( 
            <Modal
                // {...props}
                dialogClassName='modal-90w'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                 show={postModal}
                onHide={handleCloseModal}
            >
                <Modal.Header>
                    <div className='d-flex'>
                        <div className='d-flex flex-dir-col'>
                            <h6><b>{name}</b></h6>
                            <p className='clr-grey m0'>{product_type}</p>
                        </div>
                    </div>
                    <div className="modal-header post-modal-header">
                        <div className='modal-content close-btn'>
                            <button onClick={handleCloseModal} type='button' className='close'>
                                <i aria-hidden="true" className='fa fa-times fs30'></i>
                            </button>
                        </div>
                        <div className='post-like-btn'>
                            <a href="" className="post-like-top"><i className="fa fa-heart-o"></i></a>
                        </div>
                        <div className="attachment-share">
                            <div className="more-icon">
                                <a href="" className="more-optinon"><i className="fa fa-ellipsis-h" /></a>
                            </div>
                            <div className="share-icon">
                                <a href="" className="share-optinon"><i className="fa fa-share-alt" /></a>
                            </div>
                            <div className="link-icon">
                                <a href="" className="link-optinon"><i className="fa fa-link" /></a>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="full-post-img">
                        <Carousel>
                            <Carousel.Item>
                                {path ? <img src={picUrl+""+path} alt='carousal-img' style={{borderRadius: '10px'}} /> : null}
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div>
                        <button disabled href="" className="skills-text m0 red">For {purpose}</button>
                        <div className='d-flex space-between align-item mt20 border-bottom p10'>
                            <h4 className='p0 m0 red'><b>{currency} {price}</b></h4>
                            {status==='empty' ? <p>No Likes</p> : 
                                <div className="like-by mr20 align-item">
                                    <p className='m0 pr10'>Like by</p>  
                                    {likes.map((i, index) => {
                                        return <img key={index} style={{borderRadius:'20px', marginRight: '-15px'}} src={picUrl+""+i.profile_thumb} alt="avatar" />;
                                    })}
                                </div>}
                        </div>
                        <div className='d-flex p25 space-between '>
                            <div className='d-flex'>
                                <img style={{width: '10%'}} className="brad-40 h45" src={profile_thumb ? picUrl+""+profile_thumb : picUrl+""+profile_picture} alt="authore pic" />
                                <div className='ml10'>
                                    <p className='m0 p0'><b>{full_name}</b></p>
                                    <p className='clr-grey'><b>@{username}</b></p>
                                </div>
                            </div>
                            <RatingStar rating={convertToFloat(rating)} />
                        </div>
                        <div className='d-flex space-between pb10 border-bottom'>
                            <div />
                            <div className='d-flex space-around w30'>
                                <img className='w30 pointer' src={require('../assets/Call.svg')} />
                                <img className='w30 pointer' src={require('../assets/message.svg')} />
                            </div>
                        </div>
                        <div className='d-flex space-between p20 border-bottom'>
                            <div/>
                            <div className="min-h80 mt10 d-flex">
                                <i className='fa fa-map-marker red fs20' />
                                <p className='ml5'><b>{formatted_address}</b></p>
                            </div>
                        </div>
                        {status==='empty' ? null : 
                            <div className='p10'>
                                <p><b>Related</b></p>
                                <div className='d-flex space-around'>
                                    {relatedProd.map((i, index) => {
                                        return <div>
                                            {index<3 ? <div className='d-flex flex-dir-col align-item'>
                                                <img className='h150' src={picUrl+""+i.path} alt='relatedPost' />
                                                <p className='fw600'>{i.name}</p>
                                            </div>: null}
                                        </div>;
                                    })}
                                </div>
                            </div>}
                    </div>
                </Modal.Body>
            </Modal>
         );
    }
}
 
export default MarketPlaceModal;