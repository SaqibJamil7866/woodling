import React from 'react';
import RatingStar from './rating-stars.component';
import convertToFloat from '../../public/helperFunctions';
import { siteUrl, picUrl } from '../../public/endpoins';

const Reviews = (props) => {
    const {userReviews, onCrash} = props;
    console.log(userReviews)
    return ( 
        <div className='container'>
            <div className='row flex-dir-col align-item'>
                {userReviews && userReviews.map((i, index) => {
                    return <div className='clr__white w50 mt10'>
                                <div className='d-flex border-bottom'>
                                    <div className='d-flex flex-dir-col align-item w25'>
                                        <img onError={onCrash} className={i.premium==='1'? 'premium-border following-img w65' : 'following-img w65'} src={i.profile_thumb!=='' ? picUrl+""+i.profile_thumb : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} />
                                        <RatingStar rating={convertToFloat(i.rating)} />
                                    </div>
                                    <div className='w100p'>
                                        <div className='d-flex space-between w100p align-item'>
                                            <div>
                                                <div className='d-flex'>
                                                    <p className='mb0 fs25'>{i.full_name ? i.full_name : 'Unknown'}</p>
                                                    {i.premium==='1' ? <img className='h35' src={require('../../assets/Group 1977.svg')} /> : null}
                                                </div>
                                                <p className='clr-grey'>@{i.username ? i.username : 'Unknown'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className='mt10'>{i.review ? i.review : ''}</p>
                            </div>
                })}
            </div>
        </div>
     );
}
 
export default Reviews;