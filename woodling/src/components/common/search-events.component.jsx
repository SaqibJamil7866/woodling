import React from 'react';
import Post from './post.component';

const SearchEvents = (props) => {
    const { allEvents, loadMoreEvents, scrollRef } = props;
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <Post 
                        posts={allEvents}
                        scrollRef={scrollRef}
                    />
                    {allEvents && allEvents.length!==0 ? (
                        <div className='d-flex justify-content-center w80'>
                            <button onClick={loadMoreEvents} className='load-btn'>Load More</button>
                        </div>
                    ): null}
                </div>
            </div>
        </div>
     );
}
 
export default SearchEvents;