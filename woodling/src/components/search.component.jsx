import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import { SearchService } from '../services/SearchService';
import InfiniteScroll from 'react-infinite-scroller';
import { showLoader, hideLoader } from '../public/loader';
import SearchResult from './common/search-result.component';
import { Toast } from 'react-bootstrap';

class Search extends Component {

    state = { 
        page: 1,
        peoplePage: 1,
        postPage: 1,
        castingcallPage: 1,
        productPage: 1,
        servicePage: 1,
        tagsPage: 1,
        eventPage: 1,
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
        peoples: [],
        post: [],
        castingCall: [],
        allProducts: [],
        allServices: [],
        allTags: [],
        tagPosts: [],
        tagName: '',
        allEvents: [],
        allPlace: [],
        scrollRef: React.createRef()
    }

    handleSearchInput = (e) => {
        this.setState({search: e.currentTarget.value});
    }

    handleSearch = async(e) => {
        e.preventDefault();      
        const { page, peoplePage} = this.state; 
        this.setState({page: 1, peoplePage: 1});
        showLoader();
        await SearchService.getEverything(this.state.page, this.state.search)
        .then((res) => {
            this.setState({everything: res.data.data, page: page+1, result: true}, () => {
                console.log('response', this.state.everything)
            });
        }).catch((ex) => {console.log(ex)})

        await SearchService.getPeople(this.state.peoplePage, this.state.search)
        .then((res) => {
            this.setState({peoples: res.data.people, peoplePage: peoplePage+1 });
        }).catch((ex) => console.log(ex))
        
        .then(() => hideLoader());
    }

    loadMoreLatest = async() => {
        const tempRef = this.state.scrollRef.current;
        await SearchService.getEverything(this.state.page, this.state.search)
        .then((res) => {
            this.setState({everything:[...this.state.everything, ...res.data.data], page: this.state.page+1, result: true}, () => {
                tempRef.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        }).catch((e) => {console.log(e)})
    }

    loadMorePeople = () => {
        const { peoplePage, search, peoples} = this.state;
        SearchService.getPeople(peoplePage, search)
        .then((res) => {
            if(res.data.people && res.data.people.length>0){
                this.setState({peoples:[...peoples, ...res.data.people], peoplePage: peoplePage+1});
            }
            else{
                ToastsStore.warning("No More Records");
            }
        }).catch((e) => {console.log(e)})
    }

    loadMoreCastingCalls = async () => {
        const tempRef = this.state.scrollRef.current;
        const { castingcallPage, castingCall } = this.state;
        this.setState({castingcallPage: 1});
        showLoader();
        await SearchService.getCastingCall(this.state.search, this.state.castingcallPage)
        .then((res)=>{
            if(res.data.status !== 'error'){
                if(res.data.casting_calls){
                    this.setState({castingCall: [...castingCall, ...res.data.casting_calls], castingcallPage: castingcallPage+1}, () => {
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

    loadMorePost = async () => {
        const tempRef = this.state.scrollRef.current;
        const {post, search, postPage} = this.state;
        await SearchService.getPost(postPage, search)
        .then((res) => {
            if(res.data.data && res.data.data.length>0) {
                this.setState({post: [...post, ...res.data.data], postPage: postPage+1}, () => {
                    tempRef.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                });
            }
            else{
                ToastsStore.warning("No More Records");
            }
        }).catch((e) => {console.log(e)})
    }

    loadMoreProducts = async() => {
        const tempRef = this.state.scrollRef.current;
        const { search, allProducts, productPage } = this.state;
        showLoader();
        await SearchService.getProduct(productPage, search)
        .then((res) => {
            if(res.data.data && res.data.data.length>0) {
                this.setState({allProducts: [...allProducts, ...res.data.data], productPage: productPage+1}, () => {
                    tempRef.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                });
            }
            else {
                ToastsStore.warning("No More Records");
            }
        }).catch((e) => {console.log(e)})
        .then(() => hideLoader());
    }

    loadMoreServices = async() => {
        const tempRef = this.state.scrollRef.current;
        const { search, allServices, servicePage } = this.state;
        showLoader();
        await SearchService.getServices(servicePage, search)
        .then((res) => {
            if(res.data.data && res.data.data.length>0) {
                this.setState({allServices: [...allServices, ...res.data.data], servicePage: servicePage+1}, () => {
                    tempRef.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                });
            }
            else {
                ToastsStore.warning("No More Records");
            }
        }).catch((e) => {console.log(e)})
        .then(() => hideLoader());
    }

    loadMoreEvents = async() => {
        const tempRef = this.state.scrollRef.current;
        const {search, allEvents, eventPage} = this.state;
        showLoader();
        await SearchService.getEvent(eventPage, search)
        .then((res) => {
            if(res.data.events && res.data.events.length>0) {
                this.setState({allEvents: [...allEvents, res.data.events], eventPage: eventPage+1}, () => {
                    tempRef.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                });
            }else {
                ToastsStore.warning("No More Records");
            }
        }).catch((e) => {console.log(e)})
        .then(() => hideLoader());
    }

    handleBack = () => {
        showLoader()
        this.setState({result: false});
        hideLoader()
    }

    handleLatestLink = () => {
        this.setState({latest: true, posts: false, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: false})
    }

    handlePostLink = () => {
        this.setState({latest: false, posts: true, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: false}, async() => {
            showLoader();
            
            await SearchService.getPost(this.state.postPage, this.state.search)
            .then((res) => {
                this.setState({post: res.data.data, postPage: this.state.postPage+1})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
        })
    }

    handleProductLink = () => {
        this.setState({latest: false, posts: false, products: true, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: false}, async() => {
            showLoader();
            const { productPage, allProducts, search } = this.state;
            await SearchService.getProduct(productPage, search)
            .then((res) => {
                this.setState({allProducts: res.data.data, productPage: productPage+1})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
        })
    }

    handleServiceLink = () => {
        this.setState({latest: false, posts: false, products: false, services: true, castingCalls: false, people: false, events: false, hashtags: false, places: false}, async() => {
            const { search, servicePage, allServices } = this.state;
            showLoader();

            await SearchService.getServices(1, search)
            .then((res) => {
                this.setState({allServices: res.data.data, servicePage: servicePage+1})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
        })
    }

    handleCastingCallLink = () => {
        const { castingcallPage, search } = this.state;
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: true, people: false, events: false, hashtags: false, places: false}, async() => {
            showLoader();
            await SearchService.getCastingCall(search, castingcallPage)
            .then((res) => {
                this.setState({castingCall: res.data.casting_calls, castingcallPage: castingcallPage+1})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
        })
    }

    handlePeopleLink = () => {
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: true, events: false, hashtags: false, places: false})
    }
    
    handleEventsLink = () => {
        const { eventPage, allEvents, search } = this.state;
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: false, events: true, hashtags: false, places: false}, async() => {
            showLoader();
            await SearchService.getEvent(eventPage, search)
            .then((res) => {
                this.setState({allEvents: res.data.events, eventPage: eventPage+1}, () => {
                    console.log('allEvents', allEvents)
                })
            })
        })
    }

    handleHashtagsLink = () => {
        const { search } = this.state;
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: true, places: false}, async() => {
            showLoader();
            await SearchService.getTags(search)
            .then((res) => {
                this.setState({allTags: res.data.data})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
        })
    }

    handlePlacesLink = () => {
        const { search } = this.state;
        this.setState({latest: false, posts: false, products: false, services: false, castingCalls: false, people: false, events: false, hashtags: false, places: true}, async() => {
            showLoader();
            await SearchService.getPlaces(search)
            .then((res) => {
                this.setState({allPlace: res.data.places}, () => {
                    console.log('place',res.data)
                })
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
        })
    }

    onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }

    handleHastagPost = (data) => {
        showLoader();
        this.setState({tagName: data.title}, () => {
            console.log(this.state.tagName)
        })
        SearchService.getTagPosts(data.id, 1)
        .then((res) => {
            this.setState({tagPosts: res.data.tag_posts, tagsPage: this.state.tagsPage+1})
        }).catch((e) => console.log(e))

        .then(() => hideLoader());
    }

    handleHastagBack = () => {
        this.setState({tagName: ''})
    }

    render() { 
        const { search, result, latest, posts, products, services, castingCalls, people, events, hashtags, places,
            peoples, everything, post, scrollRef, castingCall, allProducts, allServices, allTags, tagName, tagPosts,
            allEvents, allPlace
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
                        loadMoreLatest={this.loadMoreLatest}
                        scrollRef={scrollRef}
                        loadMorePeople={this.loadMorePeople}

                        post={post}
                        loadMorePost={this.loadMorePost}

                        castingCall={castingCall}
                        loadMoreCastingCalls={this.loadMoreCastingCalls}

                        allProducts={allProducts}
                        loadMoreProducts={this.loadMoreProducts}

                        allServices={allServices}
                        loadMoreServices={this.loadMoreServices}

                        allTags={allTags}
                        handleHastagPost={this.handleHastagPost}
                        tagName={tagName}
                        handleHastagBack={this.handleHastagBack}
                        tagPosts={tagPosts}

                        allEvents={allEvents}
                        loadMoreEvents={this.loadMoreEvents}

                        allPlace={allPlace}
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