import React from 'react';
import { picUrl } from '../../public/endpoins';
import RatingStar from './rating-stars.component';
import convertToFloat from '../../public/helperFunctions';
import Post from './post.component';

const LatestSearch = (props) => {
    const {peoples, scrollRef, onCrash, everything, loadMorePeople, loadMoreLatest, openProfile} = props;
    return ( 
        <div className='container p0'>
            <div className='row'>
                <div className='col-md-12 p0'>
                    <div className='d-flex clr__white scrolling-x'>
                        {peoples.map((i, index) => {
                            return (
                                <div key={index} onClick={()=>openProfile(i)} className='d-flex flex-dir-col align-items-center justify-content-center p5'>  
                                    <div className='d-flex justify-content-center'>
                                        <img onError={onCrash} className='border-radius60 w108 h108' src={picUrl+""+i.profile_thumb} alt='thumbnail pic' />
                                    </div>
                                    <p style={{width: '108px'}} className='mb0 fs12 alignCenter'>{i.full_name}</p>
                                    <div style={{width: '108px'}}>
                                        <RatingStar rating={convertToFloat(i.rating)} />
                                    </div>
                                </div>
                            );
                        })}
                        {peoples.length>9 ? <i onClick={loadMorePeople} className='fa fa-arrow-right right-arrow pointer' /> : null}
                    </div>
                </div>
                <div className='col-md-9 scrolling-x'>
                    <Post posts={everything} scrollRef={scrollRef} />
                    {everything && everything.length!==0 ? (
                        <div className='d-flex justify-content-center w80'>
                            <button onClick={loadMoreLatest} className='load-btn'>Load More</button>
                        </div>
                    ): null}
                </div>
            </div>
        </div>
     );
}
 
export default LatestSearch;