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
            PostCommentsService.getPostComments( this.state.postData.post_id).then(async (res) => {
                if(res.data.status == "success"){
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
            let commentData = {
                user_id: AuthService.getUserId(),
                post_id: this.state.postData.post_id,
                comment: this.state.comment, 
            }
            
            PostCommentsService.addPostComments(commentData).then(async (res) => {
                if(res.data.status == "success"){ 
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
    
    render() {  
            const {postData} = this.state;   
            var commentsList = '';
            if(this.state.comments.length > 0 ){
                commentsList  = this.state.comments.map((item,index)=>{ 
                    return <li>
                        <div class="comment-main">
                            <div class="posst_user_profile">
                                <img src={require('../../assets/account-circle.png')} />
                                <p>{item.username}</p><span class="comment-time"><Moment fromNow>{new Date(item.date_created * 1000)}</Moment></span>
                            </div>
                            <div class="comment-dec">
                                <p>{ item.comment }</p>
                            </div>  
                            <div class="reply-like">
                                <a href="" class="reply">Reply</a>
                                <a href="" class="like-count"><i class="fa fa-heart"></i><span>Like ({item.likes})</span></a>
                            </div>    
                        </div> 
                    </li>;
                });
            }
            return (
                <div class="post-comment">
                    <div class="post-comment-count"> 
                        <p>comment<span>({ postData.total_comments ? (postData.total_comments) : (0)})</span></p>
                    </div>
                    <div class="post-comment-list">
                        <div class="posst_user_profile">
                            <img src={require('../../assets/account-circle.png')} />
                            <p>{AuthService.getUserName()}</p>
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
