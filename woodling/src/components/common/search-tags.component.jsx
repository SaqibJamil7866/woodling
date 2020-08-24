import React, { Component } from 'react';

const SearchTags = (props) => {
    const { allTags, handleHastagPost } = props;
        return ( 
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 clr__white'>
                        {allTags.map((i, index) => {
                            return (<div key={index} className='d-flex p20 border-bottom'>
                                <div className='hastag'>
                                    <p className='mb0 clr-w fs50'>#</p>
                                </div>
                                <div className='ml50 d-flex w100p space-between align-item'>
                                    <div>
                                        <p onClick={() => handleHastagPost(i)} className='mb0 fs30 pointer'><b>#{i.title}</b></p>
                                    </div>
                                    <i className='fa fa-ellipsis-v' />
                                </div>
                            </div>);
                        })}
                    </div>
                </div>
            </div>
         );
}
 
export default SearchTags;