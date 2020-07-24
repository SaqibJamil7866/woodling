import React from 'react';
import FollowersAndFollowingCard from './followers_and_following-card.component';

const UserFollowing = (props) => {
    const {followersId, myFollowing, onCrash} = props;
    console.log('MyFollowing', myFollowing)
    return ( 
        <div className='container'>
            <div className='row flex-dir-col align-item'>
                {followersId.map((i, index) => {
                    return <FollowersAndFollowingCard
                                onCrash={onCrash}
                                premium={i.premium}
                                profile_picture={i.profile_picture}
                                rating={i.rating}
                                full_name={i.full_name}
                                username={i.username}
                                bio={i.bio}
                            />;
                })}
            </div>
        </div>
     );
}
 
export default UserFollowing;