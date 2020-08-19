import React, { Component } from 'react';
import { SearchService } from '../services/SearchService';
import InfiniteScroll from 'react-infinite-scroller';
import SearchR from './common/search-result.component';
import { showLoader, hideLoader } from '../public/loader';
import { ToastsStore } from 'react-toasts';
import SearchResult from './common/search-result.component';
class Search extends Component {

    state = { 
        page: 1,
        peoplePage: 1,
        result: false,
        latest: true,
        posts: false,
        people: false,
        castingCalls: false,
        events: false,
        products: false,
        services: false,
        hashtags: false,
        places: false,
        search: '',
        everything: [],
        peoples: []
    }

    handleSearchInput = (e) => {
        this.setState({search: e.currentTarget.value});
    }

    handleSearch = async(e) => {
        e.preventDefault();        
        this.setState({page: 1});
        showLoader();
        await SearchService.getEverything('1', this.state.search)
        .then((res) => {
            this.setState({everything: res.data.data, page: this.state.page+1, result: true});
        }).catch((e) => {console.log(e)})

        await SearchService.getPeople(this.state.peoplePage, this.state.search)
        .then((res) => {
            this.setState({peoples: res.data.people});
        }).catch((e) => console.log(e))
        
        .then(() => hideLoader());
    }

    // loadMorePosts = () => {
    //     ActivityStreamService.getActivityStreams(page).then((res)=>{
    //         if(res.status !== 'error'){
    //             if(res.data.data){
    //                 dispatch({field: 'posts', value: [...posts, ...res.data.data]});
    //                 dispatch({field: 'page', value: page+1});
    //             }
    //             else{
    //                 ToastsStore.warning('No more records.');
    //             }
    //         }else { 
    //             ToastsStore.error(res.message); 
    //         }
    //     });
    // }

    handleBack = () => {
        showLoader()
        this.setState({result: false});
        hideLoader()
    }

    handleLatestLink = () => {
        this.setState({latest: true, posts: false, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: false})
    }

    handlePostLink = () => {
        this.setState({latest: false, posts: true, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: false})
    }

    handleProductLink = () => {
        this.setState({latest: false, posts: false, products: true, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: false})
    }

    handleServiceLink = () => {
        this.setState({latest: false, posts: false, products: false, services: true, castingCalls: false, people: false, events: false, hashtags: false, places: false})
    }

    handleCastingCallLink = () => {
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: true, people: false, events: false, hashtags: false, places: false})
    }

    handlePeopleLink = () => {
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: true, events: false, hashtags: false, places: false})
    }
    
    handleEventsLink = () => {
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: false, events: true, hashtags: false, places: false})
    }

    handleHashtagsLink = () => {
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: true, places: false})
    }

    handlePlacesLink = () => {
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: true})
    }

    onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }


    render() { 
        const { search, result, latest, posts, products, services, castingCalls, people, events, hashtags, places,
            peoples, everything
        } = this.state;
        return ( 
            <div className='h100p scrolling'>
                <div className='row m0'>
                    {result ? <SearchResult 
                        heading={search}
                        goBack={this.handleBack}
                        latest={latest}
                        posts={posts}
                        services={services}
                        products={products}
                        castingCalls={castingCalls}
                        people={people}
                        events={events}
                        hashtags={hashtags}
                        places={places}
                        handleLatestLink={this.handleLatestLink}
                        handlePostLink={this.handlePostLink}
                        handlePlacesLink={this.handlePlacesLink}
                        handleServiceLink={this.handleServiceLink}
                        handleHashtagsLink={this.handleHashtagsLink}
                        handleEventsLink={this.handleEventsLink}
                        handlePeopleLink={this.handlePeopleLink}
                        handleProductLink={this.handleProductLink}
                        handleCastingCallLink={this.handleCastingCallLink}

                        onCrash={this.onCrash}
                        peoples={peoples}
                        everything={everything}
                    />
                    :
                    <div className='mt10 p20 ml20 w100p'>
                        <form onSubmit={this.handleSearch}>
                            <div className='form-group'>
                                <input value={search} onChange={this.handleSearchInput} type="text" name='search' className='w-animation fs30 p10 brdr-l-t-b outline' />
                                <label onClick={this.handleSearch} className='pointer'><i className='fa fa-search fs35 clr__red ml10 pointer' /></label>
                            </div>
                        </form>
                    </div>}
                </div>
            </div>
         );
    }
}
 
export default Search;