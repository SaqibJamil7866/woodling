import React from 'react';
import RatingStar from './rating-stars.component';
import convertToFloat from '../../public/helperFunctions';
import { siteUrl } from '../../public/endpoins';

const ProfilePicHeader = (props) => {
    const {rating, profile_picture, username, full_name,  bio} = props;
    return ( 
        <>
            <div className='d-flex space-between w50'>
                <RatingStar rating={convertToFloat(rating)} />
                <div className='d-flex align-item flex-dir-col'>
                    <img className='border-radius60 h100 m-50' src={siteUrl+""+profile_picture} />
                    <h1 className='fs30 poppins'>{full_name}</h1>
                    <p>{bio}</p>
                </div>
                <p><b>@{username}</b></p>
            </div>
            <div className='d-flex space-evenly w40 mb10'>
                <button className="profile-btn"><i className='fa fa-user-plus mr10' />Follow</button>
                <button className="profile-btn"><i className='fa fa-star mr10' />Rate</button>
                <button className="profile-btn"><i className='fa fa-envelope mr10' />Message</button>
            </div>
        </>
     );
}
 
export default ProfilePicHeader;