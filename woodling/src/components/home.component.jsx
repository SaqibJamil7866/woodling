import React, { useEffect, useState, useReducer } from 'react';
import TopContentBar from './common/top_contentbar.component';
import Post from './common/post.component';
import { ReactComponent as AddButtonIcon } from '../assets/add-button.svg';
import OnlineStatusCard from './common/online_status_card.component';
import ExploreCard from './common/explore_card.component';
import { ActivityStreamService } from '../services/ActivityStreamService';
import { FollowService } from '../services/FollowService';
import { ToastsStore } from 'react-toasts';

function Home(props) {
    const initialState ={
        posts:[],
        followers: []
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { posts, followers } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    useEffect(() => {
        Promise.all([ActivityStreamService.getActivityStreams(1), FollowService.getUSerFollowiers()])
        .then((res)=>{
            if(res[0].status != 'error'){
                dispatch({field: 'posts', value: res[0].data.data});
            }else { 
                ToastsStore.error(res[0].message); 
            }
            if(res[1].status != 'error'){debugger
                dispatch({field: 'followers', value: res[1].data.data});
            }else { 
                ToastsStore.error(res[1].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => console.log("Hide loader"));
    }, []);

    const handleCancel = () => {
        props.history.goBack();
    };


    // const handleAdd = () => {
    //     setIsFormSubmitted(true);
    //     if(qty){
    //         const params = { buId, itemId, qty };
    //         axios.post(addBuInventoryUrl, params).then(res => {
    //             if (res.data.success) {
    //                 console.log('response after adding item', res);
    //                 props.history.goBack();
    //             }
    //             else if (!res.data.success) {
    //                 setOpenNotification(true);
    //             }
    //         }).catch(e => {
    //                 console.log('error after adding bu inventory', e);
    //                 setOpenNotification(true)
    //                 setErrorMsg("Error while adding the item")
    //         });
    //     }
    // };

    // const handleEdit = () => {
    //     setIsFormSubmitted(true);
    //     if(qty){
    //         const params = { _id, buId, itemId, qty };
    //         axios.put(updateBuInventoryUrl, params).then(res => {
    //             if (res.data.success) {
    //                 console.log('response after adding item', res);
    //                 props.history.goBack();
    //             }
    //             else if (!res.data.success) {
    //                 setOpenNotification(true);
    //             }
    //         }).catch(e => {
    //             console.log('error after adding bu inventory', e);
    //             setOpenNotification(true);
    //             setErrorMsg("Error while editing the item")
    //         });
    //     }
    // };

    return (
        <div className="container h100">
            <div className="row h100">
                <div className="col-md-8 br-white scrolling">
                    <TopContentBar />
                    <Post posts={posts}/>
                    <div className="fixedbutton">
                        <AddButtonIcon  height="50px" width="50px"/>
                    </div>
                </div>
                <div className="col-md-4 scrolling">
                    <div className="img-div h230 mt30 mb10 ">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                    </div>
                    <OnlineStatusCard />
                    <div className="mt10 mb10">
                        <ExploreCard  followers={followers}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
