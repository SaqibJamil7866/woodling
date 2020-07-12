import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';   
import PostActionComponent from '../component/PostActionComponent';   
import SimplePostModel from '../component/models/SimplePostModel';  
import ImagePostModel from '../component/models/ImagePostModel'; 

import {ActivityStreamService} from '../services/ActivityStreamService';  
import {AuthServices} from '../services/AuthServices';  
import PostImageDetailsModel from './models/PostImageDetailsModel';  

import {Config} from '../services/Config';
  

class ActivityStremComponent extends React.Component {
    constructor(props){  
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            activityStreams:[],
            activityType:'', 
            showModal:false,
            activityData:[],
            followings:[]
        }  
        this.callBackOpenModel = this.callBackOpenModel.bind(this);
        this.callBackCloseModel = this.callBackCloseModel.bind(this);
    } 

    componentDidMount() {  
        try{ 
            console.log("reload"+this.props.listReload); 
            this.getActivityStream();
            AuthServices.getUSerFollowings().then(async (result) => {
               if(result.status == 'success'){
                //localStorage.setItem('user', JSON.stringify(result));
                    var data = result.data;
                    var followingOptions = [];
                    data.map(function(following){
                        var temp = {
                             value:following.id,
                             label:"@"+following.username               
                        };
                        followingOptions.push(temp);
                    }); 
                     this.setState({ followings:followingOptions });  

                    console.log('followings'+result);
                  }else {
                      console.log(result);  
                  } 
            }); 
        }catch(e){
             console.log('error', e);
              alert("jhere");
      } 
    } 
    componentWillUnmount() {
         console.log("reload2="+this.props.listReload); 
    }
    componentWillReceiveProps(nextProps){
 /* if(nextProps.listReload!==this.props.listReload){
    console.log("reload3="+this.props.listReload); 
     
  }*/
  if(nextProps.listReload){
    console.log("reload4="+nextProps.listReload);
    this.getActivityStream();
  }
  
}
    getActivityStream(){
        ActivityStreamService.getActivityStreams().then(async (result) => {
             if(result.status){ 
                 
                  this.setState(
                    {activityStreams: result.data}
                  ); 
                    
                }else {
                    console.log(result); 
                  
                } 
          });
    }
    callBackOpenModel(modelType){
        this.setState({ modelType:modelType }); 
    } 
    openDetailsModal(activity,activityType){
       
        this.setState({activityType:activityType});
        this.setState({showModal:true,activityData:activity});
    }
    callBackCloseModel(){
        this.setState({activityType:'',showModal:false});
    }    
    render() { 
        const { activityStreams, } = this.state;
        var activitys = '';
         activitys = activityStreams.map((activity,index)=>{ 
                     var imgSrc = false;

                     if(activity.profile_thumb != ''){
                        imgSrc = true;
                     }
                    if(activity.type == "photo") { 
                    return  <div className="article-card single_images" onClick={this.openDetailsModal.bind(this,activity,'single-image')}> 
                                <div className="article-card-bar pt-2 pb-2">
                                    <div className="avatar-user">
                                        {  activity.profile_thumbl ? (
                                             <img src={Config.SITE_URL+''+activity.profile_thumbl} alt="Avatar" className="avatar" />
                                        ):(
                                           <img src={require('../assets/img/img_avatar.png')} alt="Avatar" className="avatar" />
                                        )}
                                        <div className="article-title ml-2">
                                            @{activity.username}
                                        </div>
                                    </div>

                                    <div className="article-details">
                                        <p>{activity.body}</p>
                                    </div>
                                    <div className="artile-bar-info">
                                        <span className="story_like">
                                            <span><i className="fas fa-heart"></i>{activity.likes}</span>                            
                                        </span>
                                        <span className="story_comment">
                                            <span><i className="far fa-comment"></i> {activity.comments}</span>
                                        </span>
                                        <span className="story-time">
                                            <span>1m</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="article-card-img-bar pt-2 pb-2">
                                    <img src={Config.SITE_URL+''+activity.path} alt="" />
                                </div>
                                <div className="article-card-setting-bar pt-2 pb-2">
                                    <div className="article-setting">
                                        <a href="" className="story_more">
                                            <i className="fas fa-ellipsis-h"></i>

                                        </a>
                                        <a href="" className="story_more">
                                            <i className="fas fa-share-alt"></i>                                    
                                        </a>
                                        <a href="" className="story_more">
                                            <i className="fas fa-paperclip"></i>                                    
                                        </a>
                                    </div>
                                </div>
                            </div>;
                    }else if(activity.type == "video") { 
                    return  <div className="article-card single_images"> 
                                <div className="article-card-bar pt-2 pb-2">
                                    <div className="avatar-user">
                                        {  activity.profile_thumbl ? (
                                             <img src={Config.SITE_URL+''+activity.profile_thumbl} alt="Avatar" className="avatar" />
                                        ):(
                                           <img src={require('../assets/img/img_avatar.png')} alt="Avatar" className="avatar" />
                                        )}
                                        <div className="article-title ml-2">
                                            @{activity.username}
                                        </div>
                                    </div>

                                    <div className="article-details">
                                        <p>{activity.body}</p>
                                    </div>
                                    <div className="artile-bar-info">
                                        <span className="story_like">
                                            <span><i className="fas fa-heart"></i>{activity.likes}</span>                            
                                        </span>
                                        <span className="story_comment">
                                            <span><i className="far fa-comment"></i> {activity.comments}</span>
                                        </span>
                                        <span className="story-time">
                                            <span>1m</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="article-card-img-bar pt-2 pb-2">
                                    <img src={Config.SITE_URL+''+activity.path} alt="" />
                                </div>
                                <div className="article-card-setting-bar pt-2 pb-2">
                                    <div className="article-setting">
                                        <a href="" className="story_more">
                                            <i className="fas fa-ellipsis-h"></i>

                                        </a>
                                        <a href="" className="story_more">
                                            <i className="fas fa-share-alt"></i>                                    
                                        </a>
                                        <a href="" className="story_more">
                                            <i className="fas fa-paperclip"></i>                                    
                                        </a>
                                    </div>
                                </div>
                            </div>;
                        }else{
                        return  <div className="article-card single_contain"> 
                                <div className="article-card-bar pt-2 pb-2">
                                    <div className="avatar-user">
                                        {  activity.profile_thumbl ? (
                                             <img src={Config.SITE_URL+''+activity.profile_thumbl} alt="Avatar" className="avatar" />
                                        ):(
                                           <img src={require('../assets/img/img_avatar.png')} alt="Avatar" className="avatar" />
                                        )}
                                        <div className="article-title ml-2">
                                            @{activity.username}
                                        </div>
                                    </div>

                                    <div className="article-details">
                                        <p>{activity.body}</p>
                                    </div> 
                                </div> 
                                <div className="article-card-setting-bar pt-2 pb-2">
                                    <div className="article-setting">
                                        <a href="" className="story_more">
                                            <i className="fas fa-ellipsis-h"></i>

                                        </a>
                                        <a href="" className="story_more">
                                            <i className="fas fa-share-alt"></i>                                    
                                        </a>
                                        <a href="" className="story_more">
                                            <i className="fas fa-paperclip"></i>                                    
                                        </a>
                                    </div>
                                </div>
                            </div>;
                    }        
              }); 
        return (
            <div>
             <div className="activity-stream-wrap">
                   {activitys}
             </div> 
             {this.state.showModal && 
                <PostImageDetailsModel activityData={this.state.activityData} activityType={this.state.activityType} showModal={this.state.showModal} sendCallBackCloseModel={this.callBackCloseModel} />
             }
            </div> 
        );
    }
} 
export default ActivityStremComponent