import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import TalentBar from './common/talent_bar.component';
import TalentCard from './common/talent_card.component';

function SearchTalent(props) {

    useEffect(() => {

    }, []);

    return (
        <div className='h100 scrolling'>
            <div className="row m0">
                <div className="col-md-12 p0">
                    <div className="img-div h380 mb10 p-relative">
                        <img src={require('../assets/find-talent-cover.png')}  alt="Talent pic" />
                        <div className='w50 p-absolute t0 ml45 mt100'>
                            <h1 className=' clr-w fs50'><b>Find Talents</b></h1>
                            <p className=' clr-w'><b>Explore our talent database<br/>Hunting down the perfect star has never been easier. Try it.</b></p>
                            <div>
                                <form class="example">
                                    <i className='fa fa-search icon'></i>
                                    <input type="search" placeholder="Who are you looking for?" name="search" className='border-radius' />
                                    <button type="submit" name='searchSubmit' class="btn border-radius"><b>Search</b></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex m0">
                <div className="col-md-8 br-white pl100">
                    <TalentBar title="Featured Talents of the week"/>
                    <div className='mt20'>
                        {/* <div> */}
                            <TalentCard />
                            <TalentCard />
                            <TalentCard />
                            <TalentCard />
                            <TalentCard />
                            <TalentCard />
                            <TalentCard />
                        {/* </div> */}
                    </div>
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