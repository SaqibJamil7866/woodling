import React from 'react';

const HeaderSearch = (props) => {
    return (
        <div className="img-div h380 mb10 p-relative">
            <img src={props.img}  alt="Talent pic" />
            <div className='w50 p-absolute t0 ml45 mt100'>
            <h1 className=' clr-w fs50'><b>{props.mainText}</b></h1>
            <p className=' clr-w'><b>{props.paraText}</b></p>
                <div>
                    <form class="example">
                        <i className='fa fa-search icon'></i>
                        <input type="search" placeholder="Who are you looking for?" name="search" className='border-radius' />
                        <button type="submit" name='searchSubmit' class="btn border-radius"><b>Search</b></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HeaderSearch