import React from 'react';
import RatingStar from './rating-stars.component';
import convertToFloat from '../../public/helperFunctions';
import { siteUrl } from '../../public/endpoins';

const ProfilePicHeader = (props) => {
    const {rating, profile_picture, username} = props;
    console.log(profile_picture)
    return ( 
        <div className='d-flex space-between w50'>
            <RatingStar rating={convertToFloat(rating)} />
            <img className='border-radius60 h100 m-50' src={siteUrl+""+profile_picture} />
            <p><b>@{username}</b></p>
        </div>
     );
}
 
export default ProfilePicHeader;