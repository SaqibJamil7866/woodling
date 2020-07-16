import React, { Component } from 'react';
import HeaderSearch from './common/header-searchbar';
import Filters from './common/filters.component';
import SmallSubmissionCard from './common/small_submission_card.component';
import LargeSubmissionCard from './common/large_submission_card.component';

const cards = [
    {
        name: 'CLOSEUP: MAGIC BREATH',
        skill: 'Dancer',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Nigeria',
        status: 'ACTIVE',
        btn: 'Commercial'
    },
    {
        name: 'PORT HARCOURT FASHION RUNAWAY 2019 COMPITITION',
        skill: 'Model',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Port Harcourt, Nigeria',
        status: 'ACTIVE',
        btn: 'Runaway Modeling'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'CLOSEUP: MAGIC BREATH',
        skill: 'Dancer',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Nigeria',
        status: 'ACTIVE',
        btn: 'Commercial'
    },
    {
        name: 'PORT HARCOURT FASHION RUNAWAY 2019 COMPITITION',
        skill: 'Model',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Port Harcourt, Nigeria',
        status: 'ACTIVE',
        btn: 'Runaway Modeling'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
];

const myJob = [];
class CastingCalls extends Component {
    state = { 
        submissions: false, 
        submissionCard: [...cards] ,
        myJob: [...myJob],
        cardShown: false
    }
    showCards = () => {
        this.setState({cardShown: true})
    }
    render() { 
        return ( 
            <div className='h100 scrolling'>
                <div className="row m0">
                    <div className="col-md-12 p0">
                        <HeaderSearch 
                            img={require('../assets/casting-call-cover.png')} 
                            mainText='Find Talents'
                            placeholder='Search Casting Calls'
                            paraText1='Search openings and '
                            paraText2='Indentify existing openings and opportunities. Take it.'
                        />
                    </div>
                </div>
                <div>
                    <div className="row d-flex m0">
                        <div className="col-md-8 br-white pl100">
                            <div className='d-flex space-evenly'>
                                <SmallSubmissionCard
                                    Length='2'
                                    Heading='My Posted Jobs'
                                    jobsClick={() => this.props.history.push("/casting_calls/posted_calls")}
                                />
                                <SmallSubmissionCard
                                    Length='2'
                                    Heading='My Submissions'
                                />
                            </div>
                            <div className='mt20'>
                                <LargeSubmissionCard
                                    submissionCard={this.state.submissionCard}
                                    textlimit={200}
                                    headinglimit={30}
                                    countrylimit={10}
                                    cardShown={this.state.cardShown}
                                    showCards={this.showCards}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="img-div h230 mt30 mb10">
                                <div>
                                    <Filters />
                                </div>
                                <img style={{width: '80%', marginTop: '20px'}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                            </div>
        
                            <div className="mt10 mb10">
                                {/* <ExploreCard /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CastingCalls;