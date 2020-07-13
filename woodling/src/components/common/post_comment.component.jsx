/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Moment from 'react-moment';
import { PostCommentsService } from '../../services/PostCommentService';  
import { AuthService } from '../../services/AuthService';  
 
class PostCommentComponent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {  
            postData: this.props.postData, 
            comment:'',
            comments:[]
        };
        
        this.handleChange = this.handleChange.bind(this);
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
    
    handleChange(e) {
        this.setState({ comment: e.target.value });
    }

    keyPress(e){
        if(e.keyCode === 13 &&  e.target.value !== ''){
            this.addCooment();
        }
    }

    render(){  
        const {postData} = this.state;   
        let commentsList = '';
        if(this.state.comments.length > 0 ){
            commentsList  = this.state.comments.map((item)=>{ 
                return( 
                    <li key={item.comment_id}>
                        <div className="comment-main">
                            <div className="posst_user_profile">
                                <img src={require('../../assets/account-circle.png')} alt="profile" />
                                <p>{item.username}</p><span className="comment-time"><Moment fromNow>{new Date(item.date_created * 1000)}</Moment></span>
                            </div>
                            <div className="comment-dec">
                                <p>{ item.comment }</p>
                            </div>  
                            <div className="reply-like">
                                <a href="" className="reply">Reply</a>
                                <a href="" className="like-count"><i className="fa fa-heart"></i><span>Like ({item.likes})</span></a>
                            </div>    
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
                        <img src={require('../../assets/account-circle.png')} alt="img"/>
                        <p>{AuthService.getUserName()}</p>
                    </div>
                    <div className="form-group comment-input">
                        <input type="text" name="comment" id="comment-text" className="form-control input-sm" placeholder="Say something about this" value={this.state.comment} onChange={this.handleChange} onKeyDown={this.keyPress}/>
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
