/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import HeaderSearch from './common/header-searchbar';
import CastingCallFilters from './common/casting_call_filter.component';
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
        showLoadMoreBtn: true,
        page: 1,
        myJobs: [],
        mySubmissions: [],
        cardShown: false,
        showModel: false,
        postingForm: false,
        popupData: "",
        applyBtns: [],
        scrollRef: React.createRef()
    }

    componentDidMount(){
        // getLocation().then((res)=>{
            //this.setState({page: this.state.page+1})
        //});

        showLoader();
        Promise.all([CastingCallService.getAllCastingCalls(this.state.page), CastingCallService.getUserPostedJobsCalls(), CastingCallService.getUserAppliedJobsCalls()])
        .then((res)=>{
            if(res[0].data.status !== 'error'){
                this.setState({allCastingCalls: res[0].data.data, page: this.state.page+1});
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
            history.push({
                pathname: '/casting_calls/post-a-casting-calls',
            })
       });
    }

    postedCallScreen = () => {
        history.push({
            pathname: '/casting_calls/posted_calls',
            state: {to: 'posted_call', myJobs: this.state.myJobs, mySubmissions: this.state.mySubmissions}
        })
    }

    loadMoreCastingCalls = () => {
        const {allCastingCalls, page} = this.state;
        const tempRef = this.state.scrollRef.current;
        showLoader();
        CastingCallService.getAllCastingCalls(page).then((res)=>{
            if(res.data.status !== 'error'){
                if(res.data.data){
                    this.setState({allCastingCalls: [...allCastingCalls, ...res.data.data], page: page+1}, () => {
                        tempRef.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    });
                }
                else{
                    this.setState({showLoadMoreBtn: false});
                    ToastsStore.warning('No more records.');
                }
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }

    applyCastingCallFilters = (data, age) =>{
        const params = {role: data.skill, age_from: age.min, age_to: age.max, gender: data.gender, production_type_id: data.production_type, location: data.location};
        showLoader();
        CastingCallService.getFilterCastingCallUrl('1', params).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                this.setState({allCastingCalls: res.data.data, showLoadMoreBtn: false, page: 1});
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
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

        const {scrollRef, allCastingCalls, showLoadMoreBtn, myJobs, mySubmissions, cardShown, showModel, popupData, applyBtns, postingForm} = this.state;
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
                                        scrollRef={scrollRef}
                                        loadMoreCastingCalls={this.loadMoreCastingCalls}
                                    />
                                    {/* {showLoadMoreBtn && <button className="btn btn-primary w76p mt10 mb20" onClick={this.loadMoreCastingCalls}>Load More...</button>} */}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="img-div h230 mb10">
                                    <div>
                                        <CastingCallFilters applyFilter={this.applyCastingCallFilters} />
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