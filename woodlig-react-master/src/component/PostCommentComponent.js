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
import {AuthServices} from '../services/AuthServices';  
import { Carousel, Radio } from 'antd';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
 
class PostCommentComponent extends React.Component {
  constructor(props) {
      super(props); 
      this.state = {  
          activityData: this.props.activityData, 
          comment:'',
          comments:[]
      }; 
      
      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
  }
  
  componentDidMount() {  
      this.getCooments();
      
  } 
 handleChange(e) {
      this.setState({ comment: e.target.value });
   }
keyPress(e){
      if(e.keyCode == 13 &&  e.target.value != ''){
        this.addCooment();
      }
}

getCooments(){
  try{  
          PostCommentsServices.getPostComments( this.state.activityData.post_id).then(async (result) => {
             if(result.status == "success"){ 
                   this.setState({ comments:result.comments});
                    console.log("comments"+JSON.stringify(result.comments));
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("getPostComments:: Error");
      } 
}
   addCooment(){
      try{  
          
          //var commentData = 'user_id=172&post_id='+this.props.activityData.post_id+'&comment='+this.state.comment
          let commentData = {
                user_id:AuthServices.getUserId(),
                post_id:this.state.activityData.post_id,
                comment: this.state.comment, 
            }

          PostCommentsServices.addPostComments( commentData).then(async (result) => {
             if(result.status == "success"){ 
                   this.getCooments();
                    
                }else {
                    console.log(result);  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("getPostComments:: Error");
      } 
   }
    
  render() {  
          const {activityData} = this.state;   
          var commentsList = '';
          if(this.state.comments.length > 0 ){
           commentsList  = this.state.comments.map((item,index)=>{ 
                    return <li>
                              <div class="comment-main">
                                <div class="posst_user_profile">
                                  <img src={require('../assets/img/ic_account_circle_24px.jpg')} />
                                  <p>{item.username}</p><span class="comment-time">{item.date_created}</span>
                                </div>
                                <div class="comment-dec">
                                  <p>{ item.comment }</p>
                                </div>  
                                <div class="reply-like">
                                  <a href="" class="reply">Reply</a>
                                  <a href="" class="like-count"><i class="fas fa-heart"></i><span>Like ({item.likes})</span></a>
                                </div>    
                              </div> 
                            </li>;
              });   
          }
return (<div class="post-comment">
          <div class="post-comment-count"> 
            <p>comment<span>({ activityData.total_comments ? (activityData.total_comments) : (0)})</span></p>
          </div>
          <div class="post-comment-list">
            <div class="posst_user_profile">
              <img src={require('../assets/img/IMG_4620.png')} />
              <p>mayur_patel</p>
            </div>
            <div class="form-group comment-input">
                <input type="text" name="comment" id="comment-text" class="form-control input-sm" placeholder="Say something about this" value={this.state.comment} onChange={this.handleChange} onKeyDown={this.keyPress}/>
            </div>
            <div class="comment-list">
              <ul> 
                 {commentsList}
              </ul>
            </div>
          </div>
        </div>
      );
  }     
}
 
export default PostCommentComponent
