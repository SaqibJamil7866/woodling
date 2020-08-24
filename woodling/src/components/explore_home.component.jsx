import React, { useEffect, useReducer } from 'react';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../public/loader';
import TopContentBar from './common/top_contentbar.component';
import { picUrl } from '../public/endpoins';
import RatingStar from './common/rating-stars.component';
import convertToFloat from '../public/helperFunctions';
import StatusUpload from '../models/status-update-modal.component';
import HashTags from './common/hastags.component';
import { FollowService } from '../services/FollowService';
import { AuthService } from '../services/AuthService';
import { ActivityStreamService } from '../services/ActivityStreamService';

function ExploreHome(){
    const initialState ={
        explorePage: 1,
        exploreUsers:[],
        explorePremiumUsers: [],
        followers: [],
        tags: [],
        tagPeople: [],
        
        showModal: false
    }

    function reducer(state, { field, value}){
        switch (field) {
            case 'update_explore_users':debugger
            return{
                ...state,
                city: value.address[value.address.length-2]
            };
            default: 
            return{
                ...state,
                [field] : value
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { explorePage, exploreUsers, tags, explorePremiumUsers, showModal, tagPeople } = state;

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
        Promise.all([ActivityStreamService.getExploreUsers(), ActivityStreamService.getPremiumUsers(), ActivityStreamService.getTags()])
        .then((res)=>{
            if(res[0].status !== 'error'){
                dispatch({field: 'exploreUsers', value: res[0].data.data});
            }else { 
                ToastsStore.error(res[0].message); 
            }
            if(res[1].status !== 'error'){
                dispatch({field: 'explorePremiumUsers', value: res[1].data.data});
            }else { 
                ToastsStore.error(res[1].message); 
            }
            if(res[2].status !== 'error'){
                dispatch({field: 'tags', value: res[2].data.people});
            }else { 
                ToastsStore.error(res[2].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }, []);

    const toggleFollowUser = (user) => {debugger
        const data = { user_id: AuthService.getUserId(), follower_id: user.id}
        showLoader();
        FollowService.followUser(data).then((res)=>{
            hideLoader();debugger
            if(res.data.status !== 'error'){
                dispatch({field: 'update_explore_users', value: user});
            }
        });
    }

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
                        <h3>Explore</h3>
                        <p className="mb0">Lift your feed with interesting contents</p>
                        <h5 className="alignCenter">For You</h5>
                        <div className='d-flex clr__white scrolling-x'>
                            {exploreUsers.map((i, index) => {
                                return (
                                    <div key={index} className='d-flex flex-dir-col align-items-center justify-content-center p5'>  
                                        <div className='d-flex justify-content-center'>
                                            <img onError={onCrash} className='border-radius60 w55 h55' src={picUrl+""+i.profile_thumb} alt='thumbnail pic' />
                                        </div>
                                        <p style={{width: '108px', height: '30px'}} className='mb0 fs12 alignCenter'>{i.full_name}</p>
                                        <div style={{width: '108px', textAlign: 'center'}}>
                                            <RatingStar rating={convertToFloat(i.rating)} />
                                            <button className="follow-sm-btn" onClick={()=>toggleFollowUser(i)}>{i.follow_status ? 'Following' : 'Follow'}</button>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* {exploreUsers.length>9 ? <i className='fa fa-arrow-right right-arrow pointer' /> : null} */}
                        </div>
                    </div>

                    <div className='col-md-12 p0 pt10'>
                        <h5 className="alignCenter">Get in touch with...</h5>
                        <div className='d-flex clr__white scrolling-x'>
                            {explorePremiumUsers.map((i, index) => {
                                return (
                                    <div key={index} className='d-flex flex-dir-col align-items-center justify-content-center p5'>  
                                        <div className='d-flex justify-content-center'>
                                            <img onError={onCrash} className='border-radius60 w55 h55' src={picUrl+""+i.profile_thumb} alt='thumbnail pic' />
                                        </div>
                                        <p style={{width: '108px', height: '30px'}} className='mb0 fs12 alignCenter'>
                                            {i.full_name} {i.premium==='1' ? <img className='h20' src={require('../assets/Group 1977.svg')} alt="premium" /> : null}
                                        </p>
                                        <div style={{width: '108px', textAlign: 'center'}}>
                                            <RatingStar rating={convertToFloat(i.rating)} />
                                            <button className="follow-sm-btn" onClick={()=>toggleFollowUser(i)}>{i.follow_status ? 'Following' : 'Follow'}</button>
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
                    <div className="img-div h170 mt30 mb10 ">
                        <img src={require('../assets/map_network.png')} alt="network pic" />
                    </div>
                    <div className="mt10 mb10">
                        <HashTags />
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