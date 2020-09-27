/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { picUrl } from '../../public/endpoins';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';

function ExploreCard(props) {

    const onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }

    return (
        <div className="card">
            {/* <span className="inline-block float-right"><RightIcon /></span> */}
            <p className="oniline-status-title gray">EXPLORE | Get Connected </p>
            <div className="pl5">
                {props.followers && props.followers.map((tuser,index)=>{  
                    return(
                        <div className="explore-user-profile" key={index}>
                            <img onError={onCrash} src={picUrl+""+tuser.profile_thumb} alt="user" className="explore-user" />
                            <div className="user-name-follow">
                                <p className="explore-user-name pb5">{tuser.full_name}</p>
                                <span>follows you</span>
                            </div>
                            <button className="explore-follow-btn" onClick={()=>props.followUnfollowUser(index)}>{tuser.follow_status ? 'Following' : 'Follow' }</button>
                        </div>
                    )
                })}
            </div>	
        </div>
    );
}

export default ExploreCard;