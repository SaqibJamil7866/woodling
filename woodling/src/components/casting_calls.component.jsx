import React, { Component } from 'react';
import HeaderSearch from './common/header-searchbar';
import Filters from './common/filters.component';
import SmallSubmissionCard from './common/small_submission_card.component';
import LargeSubmissionCard from './common/large_submission_card.component';
import CastingCallModal from '../models/casting-call-modal.component';

const cards = [
    {
        name: 'CLOSEUP: MAGIC BREATH',
        description: 'The commercial is going to be a really fun 30 second spot with a really cool ‘mysterious’ motif in an elegant, fantasy- like party environment. Our female lead is in the middle of the room, at this elegant party, as she notices a mysterious door on the other side of the space. She goes to the door, and after sharing the pass code ( Glenn Grant) she discovers an inner club of elite glenn grant drinkers.{\n} Please note that this is a spec commercial. However, there is a very high probability for it to get picked up by the brand.',
        skill: 'Dancer',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Nigeria',
        status: 'ACTIVE',
        btn: 'Commercial',
        expiryDate: '7/7/2020'
    },
    {
        name: 'PORT HARCOURT FASHION RUNAWAY 2019 COMPITITION',
        skill: 'Model',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Port Harcourt, Nigeria',
        status: 'ACTIVE',
        btn: 'Runaway Modeling',
        expiryDate: '7/17/2020'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary',
        expiryDate: '7/1/2020'
    },
    {
        name: 'CLOSEUP: MAGIC BREATH',
        skill: 'Dancer',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Nigeria',
        status: 'ACTIVE',
        btn: 'Commercial',
        expiryDate: '7/20/2020'
    },
    {
        name: 'PORT HARCOURT FASHION RUNAWAY 2019 COMPITITION',
        skill: 'Model',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Port Harcourt, Nigeria',
        status: 'ACTIVE',
        btn: 'Runaway Modeling',
        expiryDate: '1/7/2020'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary',
        expiryDate: '1/7/2020'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary',
        expiryDate: '1/7/2020'
    },
    {
        name: 'IN THE MIND OF AN ARTIST',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary',
        expiryDate: '1/7/2020'
    },
];

const myJob = [];
class CastingCalls extends Component {
    state = { 
        submissions: false, 
        submissionCard: [...cards] ,
        myJob: [...myJob],
        cardShown: false,
        switchScreen: false,
        showModel: false,
        popupData: {}
    }

    showCards = () => {
        this.setState({cardShown: true})
    }

    mySubmissionScreen = () => {
        this.setState({switchScreen: true}, () => {
             this.props.history.push({
                pathname: '/casting_calls/my_submission',
                state: {switchScreen: this.state.switchScreen}
            })
        })
    }

    postedCallScreen = () => {
        console.log('posted calls')
        this.setState({switchScreen: false}, () => {
             this.props.history.push({
                pathname: '/casting_calls/posted_calls',
                state: {switchScreen: this.state.switchScreen}
            })
        });
    }

    handleShowModel = (data) => {
        console.log(data);
        this.setState({showModel: true, popupData: data});
    }

    handleHideModel = () => {
        this.setState({showModel: false});
    }
    render() { 
        const {submissionCard, cardShown, showModel, popupData} = this.state
        return ( 
            <>
                <div className='h100 scrolling'>
                    <div className="row m0">
                        <div className="col-md-12 p0">
                            <HeaderSearch 
                                img={require('../assets/casting-call-cover.png')} 
                                mainText='Casting Calls'
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
                                        jobsClick={this.postedCallScreen}
                                    />
                                    <SmallSubmissionCard
                                        Length='2'
                                        Heading='My Submissions'
                                        jobsClick={this.mySubmissionScreen}
                                    />
                                </div>
                                <div className='mt20'>
                                    <LargeSubmissionCard
                                        submissionCard={submissionCard}
                                        textlimit={200}
                                        headinglimit={30}
                                        countrylimit={10}
                                        cardShown={cardShown}
                                        showCards={this.showCards}
                                        noRecord='No Record found'
                                        handleShowModel={this.handleShowModel}
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
                <div>
                    {showModel ? <CastingCallModal
                                    showModel={this.handleShowModel}
                                    hideModel={this.handleHideModel}
                                    popupData={popupData}
                                /> : 
                                null
                    }
                </div>
           </>
        );
    }
}
 
export default CastingCalls;