import React from 'react';
import { ToastsStore } from 'react-toasts';
import TalentBar from './common/talent_bar.component';
import TalentCard from './common/talent_card.component';
import StaredTalent from './common/star-talent.component';
import Filters from './common/filters.component';
import HeaderSearch from './common/header-searchbar';
import { showLoader, hideLoader } from '../public/loader';
import { AuthService } from '../services/AuthService';
import { TalentService } from '../services/TalentService';

class SearchTalent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            featuredTalents: [],
            allTalents: [],
            starredTalents: [],
            modalData: { showModal: false, notes:''}
        }
        this.talentSearch = this.talentSearch.bind(this);
    }

    componentDidMount(){
        showLoader();
        Promise.all([TalentService.getAllTalents(1), TalentService.getStarredTalents(), TalentService.getFeaturedTalents(1)])
        .then((res)=>{
            if(res[0].data.status !== 'error'){
                this.setState({allTalents: res[0].data.talents});
            }else {
                ToastsStore.error(res[0].message); 
            }
            if(res[1].data.status !== 'error'){
                this.setState({starredTalents: res[1].data.starred_talents});
            }else { 
                ToastsStore.error(res[1].message); 
            }
            if(res[2].data.status !== 'error'){
                this.setState({featuredTalents: res[2].data.featured_talents});
            }else { 
                ToastsStore.error(res[2].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }

    handleShowModel = (data) => {
        showLoader();
        TalentService.getStarredTalentNotes(data).then((res)=>{
            if(res.data.status !== 'error'){
                this.setState({modalData:{showModal: true, talent: data, notes: res.data.starred_note.notes}});
                // setModalData({showModal: true, talent: data, notes: res.data.starred_note.notes})
            }else{
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
        .then(() => hideLoader());
    }

    handleHideModel = () => {
        this.setState({modalData:{showModal: false, talent: '', notes: ''}});
    }

    saveNotes = (params) => {
        const data = { user_id: AuthService.getUserId(), starred_user_id: params.talent.id ,notes: params.notes };
        TalentService.addStarredTalentNotes(data).then((res)=>{
            if(res.data.status !== 'error'){
                ToastsStore.success(res.data.message); 
            }else{
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
        .then(() => hideLoader());
    }

    unstarTalent = (data) => {
        showLoader();
        TalentService.unstarTalent(data.id).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                const { starredTalents } = this.state;
                const filtered = starredTalents.filter(function(obj){
                    return obj.id !== data.id;
                });
                this.setState(({starredTalents: filtered}));
                this.handleHideModel();
                ToastsStore.success(res.data.message); 
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
    }

    talentSearch(keyword){
        showLoader();
        TalentService.searchTalent({name:keyword}).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                this.setState({allTalents: res.data.talents});
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
    }

    render() {
        const { allTalents, starredTalents, featuredTalents, modalData } = this.state;
        return (
            <div className='h100p scrolling'>
                <div className="row m0">
                    <div className="col-md-12 p0">
                        <HeaderSearch 
                            img={require('../assets/find-talent-cover.png')} 
                            mainText='Find Talents'
                            placeholder='Who are you looking for?'
                            paraText1='Explore our talent database'
                            paraText2='Hunting down the perfect star has never been easier. Try it.'
                            onSearch={this.talentSearch}
                        />
                    </div>
                </div>

                <div className="row d-flex m0">
                    <div className="col-md-8 br-white pl100">
                        <TalentBar title="Featured Talents of the week" featuredTalents={featuredTalents} />
                        <div className='mt20'>
                            {allTalents && allTalents.map((talent)=>{
                                return <TalentCard key={talent.id} talent={talent} />
                            })}

                            {allTalents && allTalents.length === 0 ? 'No Talent find' : ''}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="img-div h230 mt30 mb10">
                            <div>
                                <StaredTalent 
                                    starredTalents={starredTalents} 
                                    unstarTalent={this.unstarTalent}
                                    saveNotes={this.saveNotes}
                                    handleShowModel={this.handleShowModel}
                                    handleHideModel={this.handleHideModel}
                                    modalData={modalData}
                                />
                                <Filters />
                            </div>
                            <img style={{width: '80%', marginTop: '20px'}} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="authore pic" />
                        </div>
    
                        <div className="mt10 mb10">
                            {/* <ExploreCard /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchTalent;