/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import HeaderSearch from './common/header-searchbar';
import Filters from './common/filters.component';
import { showLoader, hideLoader } from '../public/loader';
import history from '../public/history';
import SmallSubmissionCard from './common/small_submission_card.component';
import LargeSubmissionCard from './common/large_submission_card.component';
import CastingCallModal from '../models/casting-call-modal.component';
import { CastingCallService } from '../services/CastingCallsService';
import { AuthService } from '../services/AuthService';
import PostingCallsForm from './posting-calls-form.component';
import { getLocation } from '../public/helperFunctions';

class CastingCalls extends Component {
    state = { 
        allCastingCalls: [],
        myJobs: [],
        mySubmissions: [],
        cardShown: false,
        showModel: false,
        postingForm: false,
        popupData: "",
        applyBtns: []
    }

    componentDidMount(){
        getLocation().then((res)=>{

        });

        showLoader();
        Promise.all([CastingCallService.getAllCastingCalls(1), CastingCallService.getUserPostedJobsCalls(), CastingCallService.getUserAppliedJobsCalls()])
        .then((res)=>{
            if(res[0].data.status !== 'error'){
                this.setState({allCastingCalls: res[0].data.data});
            }else {
                ToastsStore.error(res[0].message); 
            }
            if(res[1].data.status !== 'error'){
                this.setState({myJobs: res[1].data.data});
            }else { 
                ToastsStore.error(res[1].message); 
            }
            if(res[2].data.status !== 'error'){
                this.setState({mySubmissions: res[2].data.casting_call});
            }else { 
                ToastsStore.error(res[2].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }

    showCards = () => {
        this.setState({cardShown: true})
    }

    mySubmissionScreen = () => {
        history.push({
            pathname: '/casting_calls/my_submission',
            state: {to: 'my_submission', myJobs: this.state.myJobs, mySubmissions: this.state.mySubmissions }
        })
    }

    postingCallForm = () => {
        this.setState({postingForm: true}, () => {
            console.log(this.state.postingForm)
            this.props.history.push({
                pathname: '/casting_calls/post-a-casting-calls',
            })
            // this.props.history.push('/casting_calls/post-a-casting-calls');
       });
    }

    postedCallScreen = () => {
        history.push({
            pathname: '/casting_calls/posted_calls',
            state: {to: 'posted_call', myJobs: this.state.myJobs, mySubmissions: this.state.mySubmissions}
        })
    }

    handleShowModel = (data) => {
        CastingCallService.getCastingCallDetails(data)
        .then((res)=>{
            if(res.data.status !== 'error'){
                this.setState({showModel: true, popupData: res.data});
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e));
    }

    handleHideModel = () => {
        this.setState({showModel: false});
    }

    cancelApplication = (index) => {
        const filtered = this.state.applyBtns.filter(function(value){ return value !== index;});
        this.setState({applyBtns: filtered});
    }

    Apply = (data) => {
        const params = { user_id: AuthService.getUserId(), casting_call_id: data.data.id, role_id: data.role.role_id, role_type_id: data.role.role_type_id }
        showLoader();
        CastingCallService.applyCastingCall(params)
        .then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                const temp = this.state.applyBtns;
                temp.push(data.index);
                this.setState({applyBtns: temp});
                ToastsStore.success(res.data.message); 
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e));
    }
    
    render() {

        const {allCastingCalls, myJobs, mySubmissions, cardShown, showModel, popupData, applyBtns, postingForm} = this.state;
        return ( 
            <>
                <div className='h100p scrolling'>
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
                                        data={myJobs}
                                        Heading='My Posted Jobs'
                                        from="jobs"
                                        cardClick={this.postedCallScreen}
                                    />
                                    <SmallSubmissionCard
                                        data={mySubmissions}
                                        Heading='My Submissions'
                                        from="submissions"
                                        cardClick={this.mySubmissionScreen}
                                    />
                                </div>
                                <div className='mt20'>
                                    <LargeSubmissionCard
                                        data={allCastingCalls}
                                        textlimit={200}
                                        headinglimit={30}
                                        countrylimit={10}
                                        cardShown={cardShown}
                                        showCards={this.showCards}
                                        noRecord='No Record found'
                                        handleShowModel={this.handleShowModel}
                                        postingCallForm={this.postingCallForm}
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
                    { showModel ? 
                    (
                        <CastingCallModal
                            showModel={this.handleShowModel}
                            hideModel={this.handleHideModel}
                            popupData={popupData}
                            applyBtns={applyBtns}
                            Apply={this.Apply}
                            cancelApplication={this.cancelApplication}
                        />
                    ) : null}
                </div>
                <div>
                    {postingForm ? <PostingCallsForm coming='He is cumming' /> : null}
                </div>
            </>
        );
    }
}
 
export default CastingCalls;