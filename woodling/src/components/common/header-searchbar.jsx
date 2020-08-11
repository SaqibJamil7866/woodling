/* eslint-disable react/destructuring-assignment */
import React, { useRef } from 'react';

const HeaderSearch = (props) => {
    const seacrchFieldRef = useRef();

    return(
        <div className="img-div h380 mb10 p-relative">
            <img src={props.img} alt="Talent pic" />
            <div className='w50p p-absolute t0 ml45 mt100'>
            <h1 className=' clr-w fs50'><b>{props.mainText}</b></h1>
            <p className=' clr-w p0'><b>{props.paraText1}</b></p>
            <p className=' clr-w p0 mt-15'><b>{props.paraText2}</b></p>
                <div>
                    <form className="example">
                        <i className='fa fa-search icon' />
                        <input type="search" ref={seacrchFieldRef} placeholder={props.placeholder} name="search" className='border-radius' />
                        <button type="button" onClick={()=>props.onSearch(seacrchFieldRef && seacrchFieldRef.current && seacrchFieldRef.current.value)} name='searchSubmit' className="btn border-radius"><b>Search</b></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HeaderSearch