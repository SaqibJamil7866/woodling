import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import TalentBar from './common/talent_bar.component';

function SearchTalent(props) {
    
    useEffect(() => {

    }, []);

    return (
        <div className='h100 scrolling'>
            <div className="row m0">
                <div className="col-md-12 p0">
                    <div className="img-div h380 mb10 p-relative">
                        <img src={require('../assets/find-talent-cover.png')}  alt="Talent pic" />
                    </div>
                    <div className='w50'>
                        <h1>Find Talents</h1>
                    </div>
                </div>
            </div>

            <div className="container flex">
                <div className="col-md-8 br-white">
                    <TalentBar title="Featured Talents of the week"/>
                </div>
                <div className="col-md-4">
                    <div className="img-div h230 mt30 mb10">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                    </div>
                    
                    <div className="mt10 mb10">
                        {/* <ExploreCard /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchTalent;
