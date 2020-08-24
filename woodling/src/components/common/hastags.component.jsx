/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../../public/loader';

const HashTags = (props) => {

    return(
        <div className='clr__white wh80 h480 mt10'>
            <div className='liked-talent-title p5'>
                <p className="oniline-status-title"><b>Follow Hashtags</b></p>
            </div>
            <div className='p5 d-flex flex-dir-col'>
 
                <label className='fs20 muli mt25'>Gender</label>
                {/* <button className="filter-btn mt20" onClick={()=>props.applyFilter(formData, sliderValue)}>Apply Filter</button> */}
            </div>
        </div>
    );
}
export default HashTags