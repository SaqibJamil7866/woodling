/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
import React, {Component} from 'react';
import history from '../public/history';
import LargeSubmissionCard from './common/large_submission_card.component';

class PostedCallsAndSubmissions extends Component{
    constructor(props){
        super(props);
        this.state = {
            switchScreen: history.location.state.to,
            data: history.location.state.to === 'posted_call' ? history.location.state.myJobs : history.location.state.mySubmissions,
            cardShown: false,
            myJobs: history.location.state.myJobs,
            mySubmissions: history.location.state.mySubmissions

        }
    }

    showCards = () => {
        this.setState({cardShown: true})
    }

    postedCallCards = () => {
        const { myJobs } = this.state;
        console.log({myJobs})
        this.setState({switchScreen: 'posted_call' , data: [...myJobs]}, () => {
            history.replace('/casting_calls/posted_calls')
        })
    }

    mySubmissionCards = () => {
        const { mySubmissions } = this.state;
        console.log({mySubmissions})
        this.setState({switchScreen: 'my_submission', data: [...mySubmissions]}, () => {
            history.replace('/casting_calls/my_submission')
        })
    }

    goBack = () => {
        history.replace('/casting_calls')
    }
    
    render() {
        const {switchScreen, cardShown, data} = this.state;
        return (
            <div className='h100p scrolling'>
                <div className="row m0">
                    <div className="col-md-12 pl100 pt100">
                      <div className='d-flex align-items-center'>
                        <i onClick={this.goBack} className='fa fa-arrow-left pointer' />
                        <h1 onClick={this.postedCallCards} className={switchScreen === 'posted_call' ? 'fs38 ml15 pointer' : 'fs38 ml15 pointer half-opacity'}>Posted Calls</h1>
                        <h1 onClick={this.mySubmissionCards} className={switchScreen === 'my_submission' ? 'fs38 ml15 pointer' : 'fs38 ml15 pointer half-opacity'}>My Submissions</h1>
                      </div>
                    </div>
                </div>
                <div>
                    <div className="row d-flex m0">
                        <div className="col-md-8 br-white pl100 mt30">
                            {switchScreen === 'my_submission' ?  <LargeSubmissionCard
                                data={data}
                                textlimit={200}
                                headinglimit={30}
                                countrylimit={10}
                                cardShown={cardShown}
                                showCards={this.showCards}
                                handleShowModel={this.handleShowModel}
                                img={require('../assets/no-submission.svg')}
                                noRecord='You have not applied for any casting calls'
                            /> :  <LargeSubmissionCard
                                data={data}
                                textlimit={200}
                                headinglimit={30}
                                countrylimit={10}
                                cardShown={cardShown}
                                showCards={this.showCards}
                                handleShowModel={this.handleShowModel}
                                img={require('../assets/no-post-calls.svg')}
                                noRecord='You have not posted any casting calls'
                            />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default PostedCallsAndSubmissions;