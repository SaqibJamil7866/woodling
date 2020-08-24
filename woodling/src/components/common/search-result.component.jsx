import React from 'react';
import LatestSearch from './latest-search.component';
import SearchPost from './search-post.component';
import SearchPeople from './search-people.component';
import SearchCastingCalls from './search-castingCalls.component';
import SearchProduct from './search-product.component';
import SearchService from './search-service.component';
import SearchTags from './search-tags.component';
import SearchTagPosts from './search-tags-post.component';
import SearchEvents from './search-events.component';
import SearchPlace from './search-place.component';

const SearchResult = (props) => {
    const { heading, goBack, latest, posts, products, services, castingCalls, people, events, hashtags, places,
        handleLatestLink, handlePostLink, handlePlacesLink, handleServiceLink, handleHashtagsLink, handleEventsLink,
        handlePeopleLink, handleProductLink, handleCastingCallLink, onCrash,
        peoples, everything, loadMoreLatest, loadMorePeople, scrollRef, post, loadMorePost, castingCall, loadMoreCastingCalls,
        allProducts, loadMoreProducts, allServices, loadMoreServices, allTags, handleHastagPost, tagName, handleHastagBack, tagPosts,
        allEvents, loadMoreEvents, allPlace
    } = props;
    return ( 
        <div className='ml100 mt10 p20 w100p'>
            <div className='d-flex'>
                <i onClick={goBack} className='fa fa-times fs40 pointer' />
                <h1 className='ml10'><b>{heading ? heading : 'All'}</b></h1>
            </div>
            <div>
               {tagName==='' ? <div className='border-bottom mt20'>
                    <ul className='no-text-decoration d-flex space-evenly p0 mb0'>
                        <li className={latest ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handleLatestLink}>Latest</li>
                        <li className={posts ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handlePostLink}> Posts</li>
                        <li className={people ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handlePeopleLink}> People</li>
                        <li className={castingCalls ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handleCastingCallLink}> CastingCalls</li>
                        <li className={events ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handleEventsLink}>Events</li>
                        <li className={products ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handleProductLink}>Products</li>
                        <li className={services? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handleServiceLink}> Services</li>
                        <li className={hashtags? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handleHashtagsLink}> Hashtags</li>
                        <li className={places ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={handlePlacesLink}> Places</li>
                    </ul>
                </div> : <div className='d-flex mt20 align-item'>
                            <i onClick={handleHastagBack} className='fa fa-arrow-left fs20 pointer' />
                            <h4 className='red mb0 ml5'><b>Hastags</b></h4>
                            <i className='fa fa-chevron-right gray ml5' />
                            <h4 className='gray mb0 ml5 italic'><b>#{tagName}</b></h4>
                        </div>}
                {tagName==='' ? <div>
                    {latest ? (
                        <LatestSearch
                            everything={everything}
                            loadMoreLatest={loadMoreLatest}
                            loadMorePeople={loadMorePeople}
                            scrollRef={scrollRef}
                            peoples={peoples}
                            onCrash={onCrash}
                        />
                    )  : null}
                    {posts ? (
                        <SearchPost 
                            post={post} 
                            scrollRef={scrollRef}
                            loadMorePost={loadMorePost}
                        />
                    ) : null}
                    {people ? (
                        <SearchPeople
                            peoples={peoples}
                            scrollRef={scrollRef}
                            onCrash={onCrash}
                            people={people}
                            loadMorePeople={loadMorePeople}
                            scrollRef={scrollRef}
                        />
                    ) : null}

                    {castingCalls ? (
                        <SearchCastingCalls 
                            castingCall={castingCall}
                            castingSwitch={castingCalls}
                            loadMoreCastingCalls={loadMoreCastingCalls}
                            scrollRef={scrollRef}
                        />
                    ) : null}

                    {products ? (
                        <SearchProduct 
                            allProducts={allProducts}
                            loadMoreProducts={loadMoreProducts}
                            scrollRef={scrollRef}
                        />
                    ) : null}

                    {services ? (
                        <SearchService 
                            allServices={allServices}
                            scrollRef={scrollRef}
                            loadMoreServices={loadMoreServices}
                        />
                    ) : null}

                    {hashtags ? (
                        <SearchTags 
                            allTags={allTags}
                            handleHastagPost={handleHastagPost}
                        />
                    ) : null}

                    {events ? (
                        <SearchEvents 
                            allEvents={allEvents}
                            scrollRef={scrollRef}
                            loadMoreEvents={loadMoreEvents}
                        />
                    ) : null}

                    {places ? (
                        <SearchPlace 
                            allPlace={allPlace}
                        />
                    ) : null}
                </div> 
                    : 
                        <div>
                            <SearchTagPosts 
                                tagPosts={tagPosts}
                            />
                        </div>}
            </div>
        </div>
     );
}
 
export default SearchResult;