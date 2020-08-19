import React from 'react';
import LatestSearch from './latest-search.component';
import SearchPost from './search-post.component';

const SearchResult = (props) => {
    const { heading, goBack, latest, posts, products, services, castingCalls, people, events, hashtags, places,
        handleLatestLink, handlePostLink, handlePlacesLink, handleServiceLink, handleHashtagsLink, handleEventsLink,
        handlePeopleLink, handleProductLink, handleCastingCallLink, onCrash,
        peoples, everything, loadMoreLatest, post
    } = props;
    return ( 
        <div className='ml100 mt10 p20 w100p'>
            <div className='d-flex'>
                <i onClick={goBack} className='fa fa-times fs40 pointer' />
                <h1 className='ml10'><b>{heading ? heading : 'All'}</b></h1>
            </div>
            <div>
                <div className='border-bottom mt20'>
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
                </div>
                <div>
                    {latest ? <LatestSearch
                                everything={everything}
                                loadMoreLatest={loadMoreLatest}
                                peoples={peoples}
                                onCrash={onCrash}
                    />  : null}
                    {posts ? <SearchPost 
                                post={post}
                    /> : null}
                </div>
            </div>
        </div>
     );
}
 
export default SearchResult;