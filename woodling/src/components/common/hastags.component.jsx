/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../../public/loader';

const HashTags = (props) => {

    return(
        <div className='clr__white w90p h360 mt10'>
            <div className='liked-talent-title p5'>
                <p className="oniline-status-title"><b>Follow Hashtags</b></p>
            </div>
            <div className='p5 row col-md-12 scrolling h88p m0'>
                {props.tags && props.tags.map((tag)=>{
                    return(
                        <>
                            <div className="col-md-2">
                                <img src={require('../../assets/trend-arrow.png')} alt="trend pic" />                
                            </div>
                            <div className="col-md-7">
                                #{tag.title}
                            </div>
                            <div className="col-md-3 p0">
                                <button className="follow-sm-btn" onClick={()=>props.applyFilter()}>Follow</button>
                            </div>
                        </>
                    )
                })}


            </div>
        </div>
    );
}
export default HashTags