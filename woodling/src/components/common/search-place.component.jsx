import React from 'react';

const SearchPlace = (props) => {
    const { allPlace } = props;
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    {allPlace.map((i, index) => {
                        return (<div key={index} className='d-flex p20 border-bottom'>
                            <div className='hastag'>
                                <p className='mb0 clr-w fs50'>L</p>
                            </div>
                            <div className='ml50 d-flex w100p space-between align-item'>
                                <div>
                                    <p className='mb0 fs30 pointer'><b>{i.address}</b></p>
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

export default SearchPlace;