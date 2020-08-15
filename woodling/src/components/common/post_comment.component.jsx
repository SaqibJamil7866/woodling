/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Moment from 'react-moment';
import { picUrl } from '../../public/endpoins';
import { PostCommentsService } from '../../services/PostCommentService';  
import { AuthService } from '../../services/AuthService';
import convertToFloat from '../../public/helperFunctions';
 
class PostCommentComponent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            showReply: '',
            postData: this.props.postData, 
            comment: '',
            commentId: '',
            commentReply: '',
            commentReplies: [],
            comments: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleCommentReply = this.handleCommentReply.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }
  
    componentDidMount() {  
        this.getCooments();
    }

    getCooments(){
        try{  
            PostCommentsService.getPostComments( this.state.postData.post_id).then(async (res) => {
                if(res.data.status === "success"){
                    this.setState({ comments:res.data.comments});
                }else {
                    console.log(res); 
                }
            });
        }catch(e){
            console.log('error', e);
        } 
    }

    getPostCommentReplies(){
        try{
            PostCommentsService.getPostCommentReplies( this.state.postData.post_id, this.state.commentId).then(async (res) => {
                if(res.data.status === "success"){
                    this.setState({ commentReplies: res.data.replies});
                }else {
                    console.log(res); 
                }
            });
        }catch(e){
            console.log('error', e);
        } 
    }

    addCooment(){
        try{  
            const commentData = {
                user_id: AuthService.getUserId(),
                post_id: this.state.postData.post_id,
                comment: this.state.comment, 
            }
            
            PostCommentsService.addPostComments(commentData).then(async (res) => {
                if(res.data.status === "success"){ 
                    this.getCooments();
                    this.setState({ comment:''});
                }else {
                    console.log(res);  
                } 
            });
        }catch(e){
            console.log('error', e);
        } 
    }

    addCommentReply(){
        try{  
            const data = {
                user_id: AuthService.getUserId(),
                post_id: this.state.postData.post_id,
                comment: this.state.commentReply,
                comment_id: this.state.commentId
            }
            
            PostCommentsService.addCommentReply(data).then(async (res) => {
                if(res.data.status === "success"){
                    this.getPostCommentReplies();
                    this.setState({ commentReply:''});
                }else {
                    console.log(res);  
                } 
            });
        }catch(e){
            console.log('error', e);
        } 
    }
    
    handleChange(e) {
        this.setState({ comment: e.target.value });
    }

    handleCommentReply(e){
        this.setState({ commentReply: e.target.value });
    }

    keyPress(e){
        if(e.keyCode === 13 &&  e.target.value !== ''){
            if(e.target.name === 'comment'){
                this.addCooment();
            }
            else if(e.target.name === 'comment-reply'){
                this.addCommentReply();
            }
        }
    }

    likeDislikeComment(comment){
        try{
            const data = {
                user_id: AuthService.getUserId(),
                post_id: this.state.postData.post_id,
                comment_id: comment.comment_id,
                reaction:  convertToFloat(comment.like_status) ? 'dislike' : 'like'
            }
            
            PostCommentsService.addCommentReaction(data).then(async (res) => {
                if(res.data.status === "success"){
                    this.getCooments();
                }else {
                    console.log(res);
                }
            });
        }catch(e){
            console.log('error', e);
        } 
    }

    render(){
        let commentsList = '';
        if(this.state.comments.length > 0 ){
            commentsList  = this.state.comments.map((item, index)=>{ 
                return( 
                    <li key={item.comment_id}>
                        <div className="comment-main">
                            <div className="posst_user_profile">
                                <img className="brad-19" src={picUrl+item.profile_thumb} alt="profile" />
                                <p>{item.username}</p><span className="comment-time"><Moment fromNow>{new Date(item.date_created * 1000)}</Moment></span>
                            </div>
                            <div className="comment-dec">
                                <p>{ item.comment }</p>
                            </div>  
                            <div className="reply-like">
                                <a className="reply" onClick={()=>{this.setState({showReply: index, commentId: item.comment_id},()=>this.getPostCommentReplies())}}>Reply</a>
                                <span className="like-count"><i onClick={()=>this.likeDislikeComment(item)} className={`red fa ${ convertToFloat(item.like_status) ? 'fa-heart': 'fa-heart-o'}`} /><span className="ml5">Like ({item.likes})</span></span>
                            </div>
                            { this.state.showReply === index && (
                                <div className="form-group comment-input">
                                    <input type="text" name="comment-reply" id="comment-reply" className="form-control input-sm" placeholder="Say something about this" value={this.state.commentReply} onChange={this.handleCommentReply} onKeyDown={this.keyPress} />
                                    {this.state.commentReplies && this.state.commentReplies.map((obj)=>{
                                        return (
                                            <div key={obj.id} className="ml10">
                                                <div className="posst_user_profile">
                                                    <img className="brad-19" src={picUrl+obj.profile_thumb} alt="profile" />
                                                    <p>{obj.username}</p>
                                                </div>
                                                <div className="comment-dec">
                                                    <p>{ obj.reply }</p>
                                                </div>  
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </li>
            )});
        }
        return (
            <div className="post-comment">
                <div className="post-comment-count"> 
                    <p>comment<span>({ this.state.comments.length > 0 ? (this.state.comments.length) : (0)})</span></p>
                </div>
                <div className="post-comment-list">
                    <div className="posst_user_profile">
                        <img className="brad-19" src={AuthService.getUserProfileImage()} alt="img" />
                        <p>{AuthService.getUserName()}</p>
                    </div>
                    <div className="form-group comment-input">
                        <input type="text" name="comment" id="comment-text" className="form-control input-sm" placeholder="Say something about this" value={this.state.comment} onChange={this.handleChange} onKeyDown={this.keyPress} />
                    </div>
                    <div className="comment-list">
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
