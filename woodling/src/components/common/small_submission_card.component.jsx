/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';

const SmallSubmissionCard = (props) => {
    const { data, cardClick, Heading, from } = props;
    return ( 
        <div className='clr__white w45 d-flex flex-dir-col p15 border-radius-20 '>
            <div className='d-flex space-between align-items-center'>
                <div>
                    <h1 className='fs25 clr__red'>{data && data.length}</h1>
                </div>
                <div>
                    <p onClick={()=>cardClick()} className="gray pointer"><b>View All </b><span className="inline-block float-right ml-2"> <RightIcon /></span></p>
                </div>
            </div>
            <div>
                <h3 className='fs20 align-right w100p'>{Heading}</h3>
                {from==='jobs' ?<p className='w100p align-right fs17'>You have {data && data.length} casting calls posted</p> : <p className='w100p align-right fs17'>You have sent an application to {data.length} casting calls</p>}
            </div>
        </div>
    );
}
 
export default SmallSubmissionCard;