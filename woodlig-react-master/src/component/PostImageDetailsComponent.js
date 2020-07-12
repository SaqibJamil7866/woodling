import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Modal, Button } from 'antd'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {ActivityStreamService} from '../services/ActivityStreamService';  
import {PostCommentsServices} from '../services/PostCommentsServices';  
import {Config} from '../services/Config';  
import PostCommentComponent from './PostCommentComponent';  
import { Carousel, Radio } from 'antd';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
 
class PostImageDetailsComponent extends React.Component {
  constructor(props) {
      super(props); 
      this.state = {  
          activity: this.props.activityData,
          activityMedia: [],
          dotPosition:'top',
          sliderLoad:true,
          postTaggedUsers:[],
      }; 
      
  }
  
  componentDidMount() {  
      console.log("activityData",this.state.activity);
      try{  
          ActivityStreamService.getActivityDetails( this.props.activityData.post_id).then(async (result) => {
             if(result.status){ 
                 
                  this.setState(
                    {activity: result.details,activityMedia:result.media,sliderLoad:false}
                  ); 
                    
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("jhere");
      } 
      try{  
          ActivityStreamService.getPostTaggedUsers( this.props.activityData.post_id).then(async (result) => {
             if(result.status){ 
                  if(result.tagged_users.length > 0){
                    this.setState(
                      {postTaggedUsers: result.tagged_users}
                    );
                  } 
                    
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("jhere");
      } 
      
  } 
  handlePositionChange = ({ target: { value: dotPosition } }) => this.setState({ dotPosition })
   
  render() {  
    const {activity,activityMedia,dotPosition,postTaggedUsers} = this.state;
    var postImage = '';
    var taggedUsers = '';
      postImage = activityMedia.map((media,index)=>{  
                    return <img src={Config.SITE_URL+""+media.path} />;
      });
      taggedUsers = postTaggedUsers.map((tuser,index)=>{  
                    return <span>@{tuser.username} </span>;
      });  
      console.log("postImage",postImage)            
      return ( <div class="custom-modal-content">
                              <div class="modal-header post-modal-header">
                                 
                                <a href="" class="post-like-top"><i class="fab fa-gratipay"></i></a>
                                <div class="attachment-share">
                                  <div class="more-icon">
                                    <a href="" class="more-optinon"><i class="fas fa-ellipsis-h"></i></a>
                                  </div>
                                  <div class="share-icon">
                                    <a href="" class="share-optinon"><i class="fas fa-share-alt"></i></a>
                                  </div>
                                  <div class="link-icon">
                                    <a href="" class="link-optinon"><i class="fas fa-link"></i></a>
                                  </div>
                                </div>
                              </div>
                              <div class="custom-modal-body">
                                <div class="fullpost-header">
                                  <div class="update_user_profile">
                                    <img src={require('../assets/img/ic_account_circle_24px.jpg')} alt="" />
                                    <p>@{activity.username}</p>
                                  </div>
                                  <div class="post-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>{activity.address}</span>
                                  </div>
                                </div>
                                <div class="full-post-img">
                                   {this.state.sliderLoad &&
                                        <div className="d-flex justify-content-center align-items-center" style={{ height:"100px" }}><Loader
                                               type="Oval"
                                               color="#f76b4c"
                                               height={80}
                                               width={80} 
                                        /></div>
                                    } 
                                   {!this.state.sliderLoad &&
                                      <Carousel dotPosition={dotPosition} autoplay>
                                         {postImage}
                                      </Carousel>
                                    }
                                </div> 
                                <div class="entry">
                                    <p>My cart hasoffically Become a daredevil rofl..<span>{taggedUsers}</span></p>
                                </div>
                                <div class="like_time">
                                  <div class="like-by">
                                    <p>Like by</p>  
                                    <a href="">
                                      <img src={require('../assets/img//account-circle.png')} />
                                      <img src={require('../assets/img//account-circle.png')}/>
                                      <img src={require('../assets/img//account-circle.png')}/>
                                      <img src={require('../assets/img//account-circle.png')}/>
                                    </a>  
                                  </div>
                                  <div class="post-time">
                                    <p>posted 2h ago</p>
                                  </div>    
                                </div>
                                 <PostCommentComponent activityData={activity}/>   
                              </div> 
                            </div> 
      );
  }
}
 
export default PostImageDetailsComponent
