/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';

function ExploreCard(props) {
    return (
        <div className="card">
            <p className="oniline-status-title gray">EXPLORE | Get Connected <span className="inline-block float-right"><RightIcon /></span></p>
            <div className="pl5">
                {props.followers && props.followers.map((tuser,index)=>{  
                    return(
                        <div className="explore-user-profile" key={index}>
                            <img src={require('../../assets/img_avatar.png')} alt="user" className="explore-user" />
                            <div className="user-name-follow">
                                <p className="explore-user-name">{tuser.full_name}</p>
                                <span>follow you</span>
                            </div>
                            <button href="" className="explore-follow-btn">follow</button>
                        </div>
                    )
                })}
            </div>	
        </div>
    );
}

export default ExploreCard;