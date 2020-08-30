/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const HashTags = (props) => {

    return(
        <div className='clr__white w90p h360 mt10'>
            <div className='liked-talent-title p5'>
                <p className="oniline-status-title"><b>Follow Hashtags</b></p>
            </div>
            <div className='p5 row col-md-12 scrolling h88p m0'>
                {props.tags && props.tags.map((tag, index)=>{
                    return(
                        <>
                            <div className="col-md-2">
                                <img src={require('../../assets/trend-arrow.png')} alt="trend pic" />                
                            </div>
                            <div className="col-md-7 mb10">
                                <p className="p0 m0">#{tag.title}</p>
                                <span>{tag.follow_count} posts</span>
                            </div>
                            <div className="col-md-3 p0">
                                <button className="follow-sm-btn" onClick={()=>{props.followHashTag(tag.id, index)}}>{ tag.follow ? 'Following' : 'Follow'}</button>
                            </div>
                        </>
                    )
                })}


            </div>
        </div>
    );
}
export default HashTags