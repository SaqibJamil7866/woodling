import React from 'react';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';

function ExploreCard(props) {
    return (
        // <div className="card">
        //     <p class="oniline-status-title gray">EXPLORE | Get Connected <span className="inline-block float-right"><RightIcon /></span></p>
        //     <hr className="mt0 mb0"/>
        //     <ul className='vertical-list p0'>
        //         <li>Terms</li>
        //         <li>Privacy</li>
        //         <li>FAQ</li>
        //         <li>Support</li>
        //         <li>See More</li>
        //     </ul>
        // </div>
        // }
        <div className="card">
            <p class="oniline-status-title gray">EXPLORE | Get Connected <span className="inline-block float-right"><RightIcon /></span></p>
            <div className="pl5">
                {props.followers && props.followers.map((tuser,index)=>{  
                    return <div className="explore-user-profile">
                        <img src={require('../../assets/img_avatar.png')} alt="user" className="explore-user" />
                        <div className="user-name-follow">
                            <p className="explore-user-name">{tuser.full_name}</p>
                            <span>follow you</span>
                        </div>
                        <button href="" className="explore-follow-btn">follow</button>
                    </div>;
                })}
            </div>	
        </div>
    );
}

export default ExploreCard;