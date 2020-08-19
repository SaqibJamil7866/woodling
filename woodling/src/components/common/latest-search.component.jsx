import React from 'react';
import { picUrl } from '../../public/endpoins';
import RatingStar from './rating-stars.component';
import convertToFloat from '../../public/helperFunctions';
import Post from './post.component';

const LatestSearch = (props) => {
    const {peoples, onCrash, everything} = props;
    console.log(peoples)
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='d-flex clr__white scrolling-x'>
                        {peoples.map((i, index) => {
                            return <div className='d-flex flex-dir-col align-items-center justify-content-center p10 mlr10'>  
                                        <div className='d-flex justify-content-center w70'>
                                            <img onError={onCrash} className='border-radius60 w30 h80' src={picUrl+""+i.profile_thumb}  alt='thumbnail pic' />
                                        </div>
                                        <p style={{width: '125px'}} className='mb0 fs12 alignCenter'>{i.full_name}</p>
                                        <div style={{width: '115px'}}>
                                            <RatingStar  rating={convertToFloat(i.rating)} />
                                        </div>
                                    </div>;
                        })}
                    </div>
                </div>
                <div className='col-md-9'>
                    <Post post={everything} />
                </div>
            </div>
        </div>
     );
}
 
export default LatestSearch;