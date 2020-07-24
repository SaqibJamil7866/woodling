import React from 'react';
import RatingStar from './rating-stars.component';
import convertToFloat from '../../public/helperFunctions';
import { siteUrl } from '../../public/endpoins';

const FollowersAndFollowingCard = (props) => {
    const {onCrash, premium, profile_picture, rating, full_name, username, bio} = props;
    return ( 
        <div className='clr__white w65 mt10'>
            <div className='d-flex'>
                <div className='d-flex flex-dir-col align-item w25'>
                    <img onError={onCrash} className={premium==='1'? 'premium-border following-img' : 'following-img'} src={profile_picture!=='' ? siteUrl+""+profile_picture : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} />
                    <RatingStar rating={convertToFloat(rating)} />
                </div>
                <div className='w100p'>
                    <div className='d-flex space-between w100p align-item'>
                        <div>
                            <div className='d-flex'>
                                <p className='mb0 fs25'>{full_name}</p>
                                {premium==='1' ? <img className='h35' src={require('../../assets/Group 1977.svg')} /> : null}
                            </div>
                            <p className='clr-grey'>@{username}</p>
                        </div>
                        <div>
                            <button className="skills-btn">Following</button>
                        </div>
                    </div>
                    <p className='fs12 clr-grey'>{bio}</p>
                </div>
            </div>
        </div>
     );
}
 
export default FollowersAndFollowingCard;