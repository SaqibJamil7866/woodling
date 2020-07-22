import React from 'react';
import { siteUrl } from '../../public/endpoins';

const UserAlbum = (props) => {
    const {userAlbum} = props;
    return ( 
        <div className="container">
            <div className="row">
                {userAlbum.map((i, index) => {
                    return <div className="col-md-4 mt20 border-radius-20">
                        {i.type==='video' ? <div>
                                                <i className='fa fa-video-camera video-camera-icon p-absolute' />

                                                <video className='p-relative' style={{width: '100%', height: '100%', borderRadius:'20px'}}> 
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
                                                <img style={{width: '100%', height: '100%', borderRadius: '20px'}} src={siteUrl+""+i.path} />
                                                
                                                <div className='d-flex space-between mt-45 p10'>
                                                    <i className='fa fa-heart clr-white z-index'> {i.likes}</i>
                                                    <i className='fa fa-comment  clr-white z-index'> {i.comments}</i>
                                                </div>
                                            </div>}
                               
                            </div>;
                })}
                
            </div>
        </div>
     );
}
 
export default UserAlbum;