import React, { Component } from 'react';
import Post from './post.component';

const SearchTagPosts = (props) => {
    const { tagPosts } = props;
        return ( 
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 mt20'>
                        {tagPosts.length===0 ?
                         <h1>No Post Available</h1> 
                         : <Post posts={tagPosts}/>}
                    </div>
                </div>
            </div>
         );
}
 
export default SearchTagPosts;