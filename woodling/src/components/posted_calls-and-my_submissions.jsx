import React, {Component} from 'react';
import LargeSubmissionCard from './common/large_submission_card.component';

const postedCalls = [
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

const Submission = [
    {
        name: 'Submission 1',
        skill: 'Dancer',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Nigeria',
        status: 'ACTIVE',
        btn: 'Commercial'
    },
    {
        name: 'Submission 2',
        skill: 'Model',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Port Harcourt, Nigeria',
        status: 'ACTIVE',
        btn: 'Runaway Modeling'
    },
    {
        name: 'Submission 3',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'Submission 1',
        skill: 'Dancer',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Nigeria',
        status: 'ACTIVE',
        btn: 'Commercial'
    },
    {
        name: 'Submission 2',
        skill: 'Model',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Port Harcourt, Nigeria',
        status: 'ACTIVE',
        btn: 'Runaway Modeling'
    },
    {
        name: 'Submission 3',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'Submission 3',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'Submission 3',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'Submission 3',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'Submission 3',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
    {
        name: 'Submission 3',
        skill: 'Actor',
        details: 'Seeking talent for a 30-second spec commercial for the popular toothpaste. The ad takes place on a dance floor, pushing the brands progressive and forward thinking values.',
        country: 'Worldwide',
        status: 'ACTIVE',
        btn: 'Documeentary'
    },
];

class PostedCallsAndSubmissions extends Component{
    constructor(props){
        super(props);
        this.state = {
            switchScreen: this.props.history.location.state.switchScreen,
            postedCalls: [],
            Submission: [],
            cardShown: false
        }
    }
    showCards = () => {
        this.setState({cardShown: true})
    }
    postedCallCards = () => {
        this.setState({switchScreen: false}, () => {
            this.props.history.replace('/casting_calls/posted_calls')
        })
    }
    mySubmissionCards = () => {
        this.setState({switchScreen: true}, () => {
            this.props.history.replace('/casting_calls/my_submission')
        })
    }
    goBack = () => {
        this.props.history.replace('/casting_calls')
    }
    render() {
        const {switchScreen, cardShown, postedCalls, Submission} = this.state
        return (
        <div className='h100 scrolling'>
                <div className="row m0">
                    <div className="col-md-12 pl100 pt100">
                      <div className='d-flex align-items-center'>
                        <i onClick={this.goBack} className='fa fa-arrow-left pointer'></i>
                        <h1 onClick={this.postedCallCards} className={switchScreen===false ? 'fs38 ml15 pointer' : 'fs38 ml15 pointer half-opacity'}>Posted Calls</h1>
                        <h1 onClick={this.mySubmissionCards} className={switchScreen ? 'fs38 ml15 pointer' : 'fs38 ml15 pointer half-opacity'}>My Submissions</h1>
                      </div>
                    </div>
                </div>
                <div>
                    <div className="row d-flex m0">
                        <div className="col-md-8 br-white pl100 mt30">
                            {switchScreen ?  <LargeSubmissionCard
                                submissionCard={Submission}
                                textlimit={200}
                                headinglimit={30}
                                countrylimit={10}
                                cardShown={cardShown}
                                showCards={this.showCards}
                                img={require('../assets/no-submission.svg')}
                                noRecord='You have not applied for any casting calls'
                            /> :  <LargeSubmissionCard
                            submissionCard={postedCalls}
                            textlimit={200}
                            headinglimit={30}
                            countrylimit={10}
                            cardShown={cardShown}
                            showCards={this.showCards}
                            img={require('../assets/no-post-calls.svg')}
                            noRecord='You have not posted any casting calls'
                        />}
                        </div>
                        <div className="col-md-4">
                            
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}
 
export default PostedCallsAndSubmissions;