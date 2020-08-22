import React, {Component} from 'react';
import LargeSubmissionCard from './large_submission_card.component';
import { showLoader, hideLoader } from '../../public/loader';
import { ToastsStore } from 'react-toasts';
import { CastingCallService } from '../../services/CastingCallsService';
import { AuthService } from '../../services/AuthService';
import CastingCallModal from '../../models/casting-call-modal.component';


class SearchCastingCalls extends Component {
    state = {
        cardShown: false,
        showModel: false,
        postingForm: false,
        popupData: "",
        applyBtns: []
    }
    showCards = () => {
        this.setState({cardShown: true})
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
        const { cardShown, showModel, popupData, applyBtns } = this.state;
        const { castingCall, castingSwitch, scrollRef, loadMoreCastingCalls } = this.props;
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <LargeSubmissionCard
                            castingSwitch={castingSwitch}
                            data={castingCall}
                            textlimit={200}
                            headinglimit={30}
                            countrylimit={15}
                            cardShown={cardShown}
                            showCards={this.showCards}
                            noRecord='No Record found'
                            handleShowModel={this.handleShowModel}
                            scrollRef={scrollRef}
                            loadMoreCastingCalls={loadMoreCastingCalls}
                            //postingCallForm={this.postingCallForm}
                        />
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
            </div>
        );
    }
}
 
export default SearchCastingCalls;