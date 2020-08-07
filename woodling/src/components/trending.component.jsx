import React, { Component } from 'react';
import { TrendingService } from '../services/Trending';
import { Modal, Button } from 'react-bootstrap';
import { showLoader, hideLoader } from '../public/loader';
import TrendingGallery from './common/trending-gallery.component';
import PostImageDetailsModelContent from '../models/post_image_details.model';

class Trending extends Component {
    state = { 
        gallery: [],
        galleryModal: false,
        modalData: []
    }

    async componentDidMount() {
        showLoader();
        await TrendingService.getTrendingBonAppetit(1)
        .then((res) => {
            this.setState({gallery: res.data.data})
        }).catch((e) => console.log(e))

        .then(() => hideLoader());
        hideLoader();
    }

    handleOpenModal = (data) => {
        this.setState({galleryModal: true, modalData: data});
    }

    handleCloseModal = () => {
        this.setState({galleryModal: false})
    }

    render() { 
        const {gallery, galleryModal, modalData} = this.state;
        return ( 
            <>
                <div className='h100p scrolling'>
                    <div className="row m0">
                        <div className='col-md-8 pl100'>
                            <div className='clr__white mt20'>
                                <p className='gray'>Featured Ads</p>
                                <div>
                                    
                                </div>
                            </div>
                            <div className='clr__white mt30'>
                                <h1><b>Bon Appetit</b></h1>
                                <div className='d-flex justify-content-center'>
                                    <div className='image-list'>
                                        <TrendingGallery
                                            gallery={gallery}
                                            handleOpenModal={this.handleOpenModal}
                                        />
                                    </div >
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 br-white'>
                            
                        </div>
                    </div>
                </div>
                {galleryModal ? <Modal
                // {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={galleryModal}
                onHide={this.handleCloseModal}
            >
                <Modal.Body>
                    <PostImageDetailsModelContent postData={modalData} closeModal={this.handleCloseModal} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal> : null}
            </>
        );
    }
}
 
export default Trending;