import React from 'react';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';

const SmallSubmissionCard = (props) => {
    return ( 
        <div className='clr__white w45 d-flex flex-dir-col p15 border-radius-20 '>
            <div className='d-flex space-between align-items-center'>
                <div>
                    <h1 className='fs25 clr__red'>{props.Length}</h1>
                </div>
                <div>
                    <p onClick={props.jobsClick} className="gray pointer"><b>View All </b><span className="inline-block float-right ml-2"> <RightIcon /></span></p>
                </div>
            </div>
            <div className='d-flex flex-dir-col align-item-end'>
                <h3 className='fs20 float-right'>{props.Heading}</h3>
                {props.Heading==='My Posted Jobs' ?<p className='float-right fs13'>You have {props.Length} casting calls posted</p>:<p className='float-right fs13'>You have sent an application to {props.Length} casting calls</p>}
            </div>
        </div>
    );
}
 
export default SmallSubmissionCard;