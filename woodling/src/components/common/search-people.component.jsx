import React from 'react';
import FollowersAndFollowingCard from './followers_and_following-card.component';

const SearchPeople = (props) => {
    const { onCrash, peoples, people, scrollRef, loadMorePeople } = props;
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                {peoples.map((i, index) => {
                    return <FollowersAndFollowingCard
                                scrollRef={scrollRef}
                                onCrash={onCrash}
                                premium={i.premium}
                                profile_picture={i.profile_thumb}
                                rating={i.rating}
                                full_name={i.full_name}
                                username={i.username}
                                bio={i.bio}
                                people={people}
                            />;
                })}
                {peoples && peoples.length!==0 ? (
                        <div className='d-flex justify-content-center w80'>
                            <button onClick={loadMorePeople} className='load-btn'>Load More</button>
                        </div>
                    ): null}
                </div>
            </div>
        </div>
     );
}
 
export default SearchPeople;