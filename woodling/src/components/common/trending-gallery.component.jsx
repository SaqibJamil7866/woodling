import React from 'react';
import { picUrl, siteUrl } from '../../public/endpoins';

const TrendingGallery = (props) => {
    const { gallery, handleOpenModal } = props;
    return ( 
        gallery.map((i, index) => {
            return <>
                {i.type==='video' ?<> <i className='fa fa-video-camera video-camera-icon p-absolute' />

                                    <video className='p-relative' style={{width: '100%', height: '100%', borderRadius:'20px'}}> 
                                        <source src={siteUrl+""+i.path} type="video/mp4" /> 
                                        <source src={siteUrl+""+i.path} type="video/ogg" />
                                    </video> </> : <img className='pointer' onClick={()=>handleOpenModal(i)} src={picUrl+""+i.path} alt='gallery pics' />}
            </>;
            
        })
     );
}
 
export default TrendingGallery;