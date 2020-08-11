import React, { useEffect, useReducer } from 'react';
import { ToastsStore } from 'react-toasts';
import InfiniteScroll from 'react-infinite-scroller';
import TopContentBar from './common/top_contentbar.component';
import Post from './common/post.component';
import { showLoader, hideLoader } from '../public/loader';
import { ReactComponent as AddButtonIcon } from '../assets/add-button.svg';
import OnlineStatusCard from './common/online_status_card.component';
import ExploreCard from './common/explore_card.component';
import { ActivityStreamService } from '../services/ActivityStreamService';
import { FollowService } from '../services/FollowService';
import StatusUpload from '../models/status-update-modal.component';

function Home() {
    const initialState ={
        posts:[],
        followers: [],
        tagPeople: [],
        showModal: false
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { posts, followers, showModal, tagPeople } = state;

    const openImageModal = () => {
        dispatch({field: 'showModal', value: true})
            
        console.log("Open image popup button clicked");
    }

    const openStatusUploadModal = () => {
        dispatch({field: 'showModal', value: true})
    }

    const closeStatusUploadModal = () => {
        dispatch({field: 'showModal', value: false})
    }

    useEffect(() => {
        showLoader();
        Promise.all([ActivityStreamService.getActivityStreams(1), FollowService.getUSerFollowiers(), ActivityStreamService.searchPeople()])
        .then((res)=>{
            if(res[0].status !== 'error'){
                dispatch({field: 'posts', value: res[0].data.data});
            }else { 
                ToastsStore.error(res[0].message); 
            }
            if(res[1].status !== 'error'){
                dispatch({field: 'followers', value: res[1].data.data});
            }else { 
                ToastsStore.error(res[1].message); 
            }
            if(res[2].status !== 'error'){
                dispatch({field: 'tagPeople', value: res[2].data.people});
            }else { 
                ToastsStore.error(res[2].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }, []);

    const loadMorePosts = () => {debugger
        console.log("Scroll called")
    }

    return (
        
        <div className="container h100p">
            <div className="row h100p">
                <div className="col-md-8 h90p">
                    <TopContentBar
                        openImagePopup={openImageModal}
                        openStatusUploadModal={openStatusUploadModal}
                    />
                    <div className="br-white scrolling h100p">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMorePosts}
                            hasMore={true || false}
                            useWindow={false}
                        >
                            <Post posts={posts} />
                        </InfiniteScroll>
                        <div className="fixedbutton">
                            <AddButtonIcon height="50px" width="50px" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 scrolling h100p">
                    <div className="img-div h230 mt30 mb10 ">
                        <img src={require('../assets/virtual-reality.png')} alt="virtual reality pic" />
                    </div>
                    <OnlineStatusCard />
                    <div className="mt10 mb10">
                        <ExploreCard followers={followers} />
                    </div>
                </div>
            </div>
            <div>{showModal ? <StatusUpload
                                openStatusUploadModal={openStatusUploadModal}
                                closeStatusUploadModal={closeStatusUploadModal}
                                posts={posts}
                                tagPeople={tagPeople}
                            /> : null}</div>
        </div>
    );
}

export default Home;
