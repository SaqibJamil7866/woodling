import React from 'react'
import Post from './post.component';

const SearchPost = (props) => {
    const {post} = props;
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <Post posts={post} />
                </div>
            </div>
        </div>
     );
}
 
export default SearchPost;