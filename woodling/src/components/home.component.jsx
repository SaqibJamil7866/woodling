import React, { useEffect, useReducer } from 'react';
import { ToastsStore } from 'react-toasts';
import TopContentBar from './common/top_contentbar.component';
import Post from './common/post.component';
import { showLoader, hideLoader } from '../public/loader';
import { ReactComponent as AddButtonIcon } from '../assets/add-button.svg';
import OnlineStatusCard from './common/online_status_card.component';
import ExploreCard from './common/explore_card.component';
import { ActivityStreamService } from '../services/ActivityStreamService';
import { FollowService } from '../services/FollowService';

function Home() {
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

    useEffect(() => {
        showLoader();
        Promise.all([ActivityStreamService.getActivityStreams(1), FollowService.getUSerFollowiers()])
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
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }, []);

    return (
        <div className="container h100">
            <div className="row h100">
                <div className="col-md-8 br-white scrolling">
                    <TopContentBar />
                    <Post posts={posts}/>
                    <div className="fixedbutton">
                        <AddButtonIcon height="50px" width="50px" />
                    </div>
                </div>
                <div className="col-md-4 scrolling">
                    <div className="img-div h230 mt30 mb10 ">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="authore pic" />
                    </div>
                    <OnlineStatusCard />
                    <div className="mt10 mb10">
                        <ExploreCard followers={followers} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
