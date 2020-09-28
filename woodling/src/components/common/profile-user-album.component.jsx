import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { siteUrl } from '../../public/endpoins';

const UserAlbum = (props) => {
    const {userAlbum} = props;
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState('');

    const openSelectedMedia = (media) => {
        setSelectedMedia(media);
        setShowMediaModal(true);
    }

    const onCrash = (e) => {
        e.currentTarget.src = require('../../assets/no-image-found.jpg');
    }

    return ( 
        <div className="container">
            <div className="row">
                {userAlbum && userAlbum.map((i, index) => {
                    return <div key={index} className="col-md-4 mt20 border-radius-20">
                        {i.type==='video' ? <div>
                                                <i className='fa fa-video-camera video-camera-icon p-absolute' />

                                                <video onClick={()=>openSelectedMedia(i)} className='p-relative' style={{width: '100%', height: '100%', borderRadius:'20px'}} > 
                                                    <source src={siteUrl+""+i.path} type="video/mp4" /> 
                                                    <source src={siteUrl+""+i.path} type="video/ogg" />
                                                </video>
                                                
                                                <div className='d-flex space-between mt-45 p10'>
                                                    <i className='fa fa-heart clr-white z-index'> {i.likes}</i>
                                                    <i className='fa fa-comment  clr-white z-index'> {i.comments}</i>
                                                </div>
                                               
                                            </div>
                                            : 
                                            <div>
                                                <img onClick={()=>openSelectedMedia(i)} onError={onCrash} style={{width: '100%', height: '100%', borderRadius: '20px'}} src={siteUrl+""+i.path} />
                                                
                                                <div className='d-flex space-between mt-45 p10'>
                                                    <i className='fa fa-heart clr-white z-index'> {i.likes}</i>
                                                    <i className='fa fa-comment  clr-white z-index'> {i.comments}</i>
                                                </div>
                                            </div>}
                            </div>;
                })}
            </div>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showMediaModal}
                onHide={()=>{setShowMediaModal(false)}}
            >
                    <Modal.Body>
                        <div>
                            {selectedMedia.type === 'video' ? (
                                <video style={{width: '100%', height: '100%', borderRadius:'20px'}} controls > 
                                    <source src={siteUrl+""+selectedMedia.path} type="video/mp4" /> 
                                    <source src={siteUrl+""+selectedMedia.path} type="video/ogg" />
                                    Your Browser don't support the video tag.
                                </video>
                            ) : 
                                <img src={siteUrl+""+selectedMedia.path} alt="Album pic" />}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{setShowMediaModal(false)}}>Close</Button>
                    </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default UserAlbum;