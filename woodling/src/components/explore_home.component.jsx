import React, { useEffect, useReducer } from 'react';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../public/loader';
import TopContentBar from './common/top_contentbar.component';
import { picUrl } from '../public/endpoins';
import RatingStar from './common/rating-stars.component';
import convertToFloat from '../public/helperFunctions';
import StatusUpload from '../models/status-update-modal.component';
import { ActivityStreamService } from '../services/ActivityStreamService';

function ExploreHome(){
    const initialState ={
        explorePage: 1,
        exploreUsers:[],
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
    const { explorePage, exploreUsers, showModal, tagPeople } = state;

    const openImageModal = () => {
        dispatch({field: 'showModal', value: true})
    }

    const openStatusUploadModal = () => {
        dispatch({field: 'showModal', value: true})
    }

    const closeStatusUploadModal = () => {
        dispatch({field: 'showModal', value: false})
    }

    const onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }

    useEffect(() => {
        showLoader();
        Promise.all([ActivityStreamService.getExploreUsers()])
        .then((res)=>{debugger
            if(res[0].status !== 'error'){
                dispatch({field: 'exploreUsers', value: res[0].data.data});
            }else { 
                ToastsStore.error(res[0].message); 
            }
            // if(res[1].status !== 'error'){
            //     dispatch({field: 'followers', value: res[1].data.data});
            // }else { 
            //     ToastsStore.error(res[1].message); 
            // }
            // if(res[2].status !== 'error'){
            //     dispatch({field: 'tagPeople', value: res[2].data.people});
            // }else { 
            //     ToastsStore.error(res[2].message); 
            // }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }, []);

    // const loadMorePosts = () => {
    //     ActivityStreamService.getActivityStreams(explorePage).then((res)=>{
    //         if(res.status !== 'error'){
    //             if(res.data.data){
    //                 dispatch({field: 'posts', value: [...posts, ...res.data.data]});
    //                 dispatch({field: 'explorePage', value: explorePage+1});
    //             }
    //             else{
    //                 ToastsStore.warning('No more records.');
    //             }
    //         }else { 
    //             ToastsStore.error(res.message); 
    //         }
    //     });
    // }

    return(
        <div className="container h100p">
            <div className="row h100p">
                <div className="col-md-8 h90p">
                    <TopContentBar
                        openImagePopup={openImageModal}
                        openStatusUploadModal={openStatusUploadModal}
                    />
                    <div className='col-md-12 p0 pt10'>
                        <div className='d-flex clr__white scrolling-x'>
                            {exploreUsers.map((i, index) => {
                                return (
                                    <div key={index} className='d-flex flex-dir-col align-items-center justify-content-center p5'>  
                                        <div className='d-flex justify-content-center'>
                                            <img onError={onCrash} className='border-radius60 w108 h108' src={picUrl+""+i.profile_thumb} alt='thumbnail pic' />
                                        </div>
                                        <p style={{width: '108px', height: '30px'}} className='mb0 fs12 alignCenter'>{i.full_name}</p>
                                        <div style={{width: '108px'}}>
                                            <RatingStar rating={convertToFloat(i.rating)} />
                                            <button className="profile-btn p0 mt10">Following</button>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* {exploreUsers.length>9 ? <i className='fa fa-arrow-right right-arrow pointer' /> : null} */}
                        </div>
                    </div>
                    <div className="br-white scrolling h100p">
                        {/* <InfiniteScroll
                            pageStart={1}
                            initialLoad={false}
                            loadMore={loadMorePosts}
                            hasMore={true || false}
                            useWindow={false}
                            threshold={10}
                        >
                            <Post posts={posts} />
                        </InfiniteScroll> */}
                    </div>
                </div>
                <div className="col-md-4 scrolling h100p">
                    <div className="img-div h230 mt30 mb10 ">
                        <img src={require('../assets/virtual-reality.png')} alt="virtual reality pic" />
                    </div>
                    {/* <OnlineStatusCard /> */}
                    <div className="mt10 mb10">
                        {/* <ExploreCard followers={followers} /> */}
                    </div>
                </div>
            </div>
            <div>{showModal ? (
                <StatusUpload
                    openStatusUploadModal={openStatusUploadModal}
                    closeStatusUploadModal={closeStatusUploadModal}
                    // posts={posts}
                    tagPeople={tagPeople}
                />
                ) : null}
            </div>
        </div>
    )
}
export default ExploreHome;