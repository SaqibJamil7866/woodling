import React from 'react'
import Post from './post.component';

const SearchPost = (props) => {
    const {post, scrollRef, loadMorePost} = props;
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <Post posts={post} scrollRef={scrollRef}/>
                    {post && post.length!==0 ? (
                        <div className='d-flex justify-content-center w80'>
                            <button onClick={loadMorePost} className='load-btn'>Load More</button>
                        </div>
                    ): null}
                </div>
            </div>
        </div>
     );
}
 
export default SearchPost;