import React from 'react';
import { picUrl } from '../../public/endpoins';
import RatingStar from './rating-stars.component';
import convertToFloat from '../../public/helperFunctions';

const LatestSearch = (props) => {
    const {peoples, onCrash} = props;
    console.log(peoples)
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='d-flex clr__white scrolling-x'>
                        {peoples.map((i, index) => {
                            return (
                                <div key={index} className='d-flex flex-dir-col align-items-center justify-content-center p5'>  
                                        <div className='d-flex justify-content-center'>
                                            <img onError={onCrash} className='border-radius60 w110 h110' src={picUrl+""+i.profile_thumb}  alt='thumbnail pic' />
                                        </div>
                                        <p style={{width: '110px'}} className='mb0 fs12 alignCenter'>{i.full_name}</p>
                                        <div style={{width: '110px'}}>
                                            <RatingStar rating={convertToFloat(i.rating)} />
                                        </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LatestSearch;