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
import PictureModal from '../models/picture-upload-modal.component';
import VideoModal from '../models/video-upload-modal.component';
import ScriptModal from '../models/script-upload-modal.component';
import EventModal from '../models/event-upload-modal.component';
import PostProduct from '../models/post-product-modal.component';

function Home() {
    const initialState ={
        page: 1,
        posts:[],
        followers: [],
        tagPeople: [],
        showModal: false,
        showPictureModal: false,
        showVideoModal: false,
        showScriptModal: false,
        showEventModal: false,
        showProductModal: false
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { page, posts, followers, showModal, tagPeople, showPictureModal, showVideoModal, 
        showScriptModal, showEventModal, showProductModal } = state;

    const openStatusUploadModal = () => {
        dispatch({field: 'showModal', value: true});
    }

    const closeStatusUploadModal = () => {
        dispatch({field: 'showModal', value: false});
    }

    const openPictureUploadModal = () => {
        dispatch({field: 'showPictureModal', value: true});
    }

    const closePictureUploadModal = () => {
        dispatch({field: 'showPictureModal', value: false});
    }

    const openVideoUploadModal = () => {
        dispatch({field: 'showVideoModal', value: true});
    }

    const closeVideoUploadModal = () => {
        dispatch({field: 'showVideoModal', value: false});
    }

    const openScriptModal = () => {
        dispatch({field: 'showScriptModal', value: true});
    }
    
    const closeScriptModal = () => {
        dispatch({field: 'showScriptModal', value: false});
    }
    
    const openEventModal = () => {
        dispatch({field: 'showEventModal', value: true});
    }

    const closeEventModal = () => {
        dispatch({field: 'showEventModal', value: false});
    }

    const openProductModal = () => {
        dispatch({field: 'showProductModal', value: true});
    }
    
    const closeProductModal = () => {
        dispatch({field: 'showProductModal', value: false});
    }

    useEffect(() => {
        showLoader();
        Promise.all([ActivityStreamService.getActivityStreams(1), FollowService.getUSerFollowiers(), ActivityStreamService.searchPeople()])
        .then((res)=>{
            if(res[0].status !== 'error'){
                dispatch({field: 'posts', value: res[0].data.data});
                dispatch({field: 'page', value: page+1});
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

    const loadMorePosts = () => {
        ActivityStreamService.getActivityStreams(page).then((res)=>{
            if(res.status !== 'error'){
                if(res.data.data){
                    dispatch({field: 'posts', value: [...posts, ...res.data.data]});
                    dispatch({field: 'page', value: page+1});
                }
                else{
                    ToastsStore.warning('No more records.');
                }
            }else { 
                ToastsStore.error(res.message); 
            }
        });
    }

    return (
        
        <div className="container h100p">
            <div className="row h100p">
                <div className="col-md-8 h90p">
                    <TopContentBar
                        openStatusUploadModal={openStatusUploadModal}
                        openPictureUploadModal={openPictureUploadModal}
                        openVideoUploadModal={openVideoUploadModal}
                        openScriptModal={openScriptModal}
                        openEventModal={openEventModal}
                        openProductModal={openProductModal}
                    />
                    <div className="br-white scrolling h100p">
                        <InfiniteScroll
                            pageStart={1}
                            initialLoad={false}
                            loadMore={loadMorePosts}
                            hasMore={true || false}
                            useWindow={false}
                            threshold={10}
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
                    {/* <OnlineStatusCard /> */}
                    <div className="mt10 mb10">
                        <ExploreCard followers={followers} />
                    </div>
                </div>
            </div>
            <div>{showModal ? (
                <StatusUpload
                    openStatusUploadModal={openStatusUploadModal}
                    closeStatusUploadModal={closeStatusUploadModal}
                    posts={posts}
                    tagPeople={tagPeople}
                />
                ) : null}
                {showPictureModal ? (
                    <PictureModal 
                        openPictureUploadModal={openPictureUploadModal}
                        closePictureUploadModal={closePictureUploadModal}
                        posts={posts}
                        tagPeople={tagPeople}
                    />
                ) : null}
                {showVideoModal ? (
                    <VideoModal 
                        openVideoUploadModal={openVideoUploadModal}
                        closeVideoUploadModal={closeVideoUploadModal}
                        posts={posts}
                        tagPeople={tagPeople}
                    />
                ) : null}

                {showScriptModal ? (
                    <ScriptModal 
                        openScriptModal={openScriptModal}
                        closeScriptModal={closeScriptModal}
                    />
                ) : null}

                {showEventModal ? (
                    <EventModal 
                        openEventModal={openEventModal}
                        closeEventModal={closeEventModal}
                    />
                ) : null}
                {showProductModal ? (
                    <PostProduct 
                        openProductModal={openProductModal}
                        closeProductModal={closeProductModal}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default Home;
