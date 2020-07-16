import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import TalentBar from './common/talent_bar.component';
import TalentCard from './common/talent_card.component';
import StaredTalent from './common/star-talent.component';
import Filters from './common/filters.component';
import HeaderSearch from './common/header-searchbar';

let likedPeople = [
    {
        index: 1,
        img: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Aqil Khan',
        username: '@khan.aqil',
        starTalent: true,
        created: '07/Jun/20 20:73',
        lastEdit: '07/Jun/20 20:73'
    },
    {
        index: 2,
        img: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Aqil Khan',
        username: '@khan.aqil',
        starTalent: true,
        created: '07/Jun/20 20:73',
        lastEdit: '07/Jun/20 20:73'
    },
    {
        index: 3,
        img: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Aqil Khan',
        username: '@khan.aqil',
        starTalent: true,
        created: '07/Jun/20 20:73',
        lastEdit: '07/Jun/20 20:73'
    },
    {
        index: 4,
        img: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Aqil Khan',
        username: '@khan.aqil',
        starTalent: true,
        created: '07/Jun/20 20:73',
        lastEdit: '07/Jun/20 20:73'
    },
    {
        index: 5,
        img: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Aqil Khan',
        username: '@khan.aqil',
        starTalent: true,
        created: '07/Jun/20 20:73',
        lastEdit: '07/Jun/20 20:73'
    },
    {
        index: 6,
        img: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Aqil Khan',
        username: '@khan.aqil',
        starTalent: true,
        created: '07/Jun/20 20:73',
        lastEdit: '07/Jun/20 20:73'
    }
];

class SearchTalent extends React.Component {
    state = {
        likedPeople: [...likedPeople],
        showModel: false,
        notes:{},
        openDropdown: false,
    }

    handleShowModel = (data) => {
        this.setState({showModel: true, notes: data});
    }

    handleHideModel = () => {
        this.setState({showModel: false});
    }

    unselectStarTalent = (data) => {
        const unstar = {...this.state.likedPeople};
        let arr = this.state.likedPeople.map(el=>el.index===data.index ? {...el, starTalent: false}: el)
        this.setState({likedPeople: arr});
    }

    toggleOpen = () => {
        this.setState({openDropdown: true});
    }

    toggleClose = () => {
        this.setState({openDropdown: false});
    }

    copyCodeToClipboard = () => {
        const el = document.getElementsByClassName('notes')[0].innerHTML;
        console.log(el)
        // el.select()
        //document.exceCommand('copy')
    }

    render() {
        return (
            <div className='h100 scrolling'>
                <div className="row m0">
                    <div className="col-md-12 p0">
                        <HeaderSearch 
                            img={require('../assets/find-talent-cover.png')} 
                            mainText='Find Talents'
                            placeholder='Who are you looking for?'
                            paraText1='Explore our talent database'
                            paraText2='Hunting down the perfect star has never been easier. Try it.'
                        />
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
                            <div>
                                <StaredTalent 
                                    likedPeople={this.state.likedPeople} 
                                    showModel={this.state.showModel}
                                    handleShowModel={this.handleShowModel}
                                    handleHideModel={this.handleHideModel}
                                    starTalent={this.state.starTalent}
                                    unselectStarTalent={this.unselectStarTalent}
                                    notes={this.state.notes}
                                    openDropdown={this.state.openDropdown}
                                    toggleOpen={this.toggleOpen}
                                    toggleClose={this.toggleClose}
                                    setCopyRef={this.setCopyRef}
                                    copyCodeToClipboard={this.copyCodeToClipboard}
                                />
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
        );
    }
}

export default SearchTalent;