/* eslint-disable camelcase */
import React, { useState } from 'react';
import { ToastsStore } from 'react-toasts';
import RatingStar from './rating-stars.component';
import history from '../../public/history';
import convertToFloat from '../../public/helperFunctions';
import { AuthService } from '../../services/AuthService';
import { FollowService } from '../../services/FollowService';
import { siteUrl } from '../../public/endpoins';
import ProfileRating from '../../models/profile-rating.modal.component';
import AccountModal from '../../models/profile-account-modal.component';
import { showLoader, hideLoader } from '../../public/loader';

const ProfilePicHeader = (props) => {
    const {rating, profile_picture, following_status, username, full_name,  bio, openModal, closeModal, 
        userModal, id, myProfile, openAccountModal, closeAccountModal, accountModal} = props;
    const [follow, setFollow] = useState(following_status);

    
    const followUnfollowUser = () => {
        const data = { user_id: AuthService.getUserId(), follower_id: id};
        showLoader();
        if(follow){
            FollowService.unfollowUser(data).then((res)=>{
                hideLoader();
                if(res.data.status !== 'error'){
                    setFollow(false);
                    ToastsStore.success(res.data.message);
                }
            });
        }
        else{
            FollowService.followUser(data).then((res)=>{
                hideLoader();
                if(res.data.status !== 'error'){
                    setFollow(true);
                    ToastsStore.success(res.data.message);
                }
            });
        }
    }
    
    return ( 
        <>
            <div className='d-flex space-between w50p'>
                <div className='w100p'>
                    <RatingStar rating={convertToFloat(rating)} />
                </div>
                <div className='d-flex align-item flex-dir-col'>
                    <div className='m-50 border-radius60 w30'>
                        <img className='border-radius60 h100 w100p' src={siteUrl+""+profile_picture} alt="profile img" />
                    </div>
                    <h1 className='fs30 poppins'>{full_name}</h1>
                    <p>{bio}</p>
                </div>
                <p><b>@{username}</b></p>
            </div>
            {myProfile ?             
            <div className='d-flex space-evenly w40 mb10'>
                <button className="profile-btn" onClick={()=> history.push('/wallet')}><i className='fa fa-credit-card mr10' />Wallet</button>
                <button className="profile-btn"><i className='fa fa-pencil mr10' />Edit Profile</button>
                <button onClick={openAccountModal} className="profile-btn"><i className='fa fa-envelope mr10' />Account</button>
            </div> 
            :             
            <div className='d-flex space-evenly w40 mb10'>
                <button className="profile-btn" onClick={()=>followUnfollowUser()}><i className='fa fa-user-plus mr10' />{follow ? 'Following' : 'Follow'}</button>
                <button onClick={() => openModal()} className="profile-btn"><i className='fa fa-star mr10' />Rate</button>
                <button className="profile-btn"><i className='fa fa-university mr10' />Message</button>
            </div>}
            {userModal ? <ProfileRating 
                            openModal={openModal}
                            closeModal={closeModal}
                            username={username}
                            id={id}
                        /> 
                    : null}
            {accountModal ? <AccountModal 
                                accountModal={accountModal}
                                openAccountModal={openAccountModal}
                                closeAccountModal={closeAccountModal}
                        /> 
                    : null}
        </>
    );
}
 
export default ProfilePicHeader;