/* eslint-disable array-callback-return */
import React from 'react';
import { ToastsStore } from 'react-toasts';
import { Carousel } from 'react-bootstrap';
import Moment from 'react-moment';
import { picUrl } from '../public/endpoins';
import PostCommentComponent from '../components/common/post_comment.component';
import { AuthService } from '../services/AuthService';
import { ActivityStreamService } from '../services/ActivityStreamService';
import { PostCommentsService } from '../services/PostCommentService';
import { MarketPlaceService } from '../services/MarketPlace';
import { showLoader, hideLoader } from '../public/loader';
 
class PostImageDetailsModelContent extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            activity: this.props.postData,
            activityMedia: [],
            dotPosition:'top',
            postTaggedUsers:[],
            likes: []
        };
    }
    
    async componentDidMount() {
        Promise.all([ActivityStreamService.getPostTaggedUsers( this.props.postData.post_id)])
        .then((res)=>{
            if(res[0].status !== 'error'){
                if(res[0].data.tagged_users.length > 0){
                    this.setState({postTaggedUsers: res[0].data.tagged_users});
                }
            }else {
                ToastsStore.error(res[1].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))

        await MarketPlaceService.getPostLike(this.props.postData.post_id)
        .then((res) => {
            this.setState({likes: res.data.data})
        }).catch((e)=>console.error("error: "+ e))

        .then(() => console.log("Hide loader"));
    }

    handlePositionChange = ({ target: { value: dotPosition } }) => this.setState({ dotPosition });

    addPostReaction = () =>{
        const {activity: { post_id, like_status }} = this.state;debugger
        const reaction = (like_status ? like_status : 0);
        const data = { user_id: AuthService.getUserId(), post_id , reaction: (reaction === '1' ? 'like':'dislike') };debugger
        showLoader();
        PostCommentsService.addPostReaction(data).then(()=>{
            hideLoader();
        })
    }

    sharePost = () => {
        const {activity: { post_id }} = this.state;
        showLoader();
        PostCommentsService.sharePost(post_id).then((res)=>{
            hideLoader();
            if(res.status !== 'error'){
                ToastsStore.success(res.data.message);
            }
        })
    }
     
    render() {  
        const {activity, activityMedia,dotPosition,postTaggedUsers, likes} = this.state;
        var postImage = '';
        var taggedUsers = '';
        if(activityMedia){
            // postImage = activityMedia.map((media,index)=>{  
            //     return <img src={siteUrl+""+media.path} />;
            // });
            postImage = <img src={picUrl+""+this.props.postData.path} />;
        }

        taggedUsers = postTaggedUsers.map((tuser)=>{  
            return <span key={tuser.id}>@{tuser.username} </span>;
        });  
        return( 
            <div className="custom-modal-content">
                <div className="modal-header post-modal-header">
                    <div onClick={this.props.closeModal} className='modal-content close-btn'>
                        <button type='button' className='close'>
                            <i aria-hidden="true" className='fa fa-times fs30'></i>
                        </button>
                    </div>
                    <div className='post-like-btn'>
                        <a onClick={this.addPostReaction} className="post-like-top" ><i className={`fa ${ (activity.like_status && activity.like_status !== '0') ? 'fa-heart' : 'fa-heart-o'}`} /></a>
                    </div>
                    <div className="attachment-share">
                        <div className="more-icon">
                            <a className="more-optinon"><i className="fa fa-ellipsis-h" /></a>
                        </div>
                        <div className="share-icon">
                            <a onClick={this.sharePost} className="share-optinon"><i className="fa fa-share-alt" /></a>
                        </div>
                        <div className="link-icon">
                            <a href="" className="link-optinon"><i className="fa fa-link" /></a>
                        </div>
                    </div>
                </div>
                <div className="custom-modal-body">
                    <div className="fullpost-header">
                    <div className="update_user_profile">
                        <img className="brad-40" src={activity.profile_thumb ? picUrl+activity.profile_thumb: 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} alt="" />
                        <p>@{activity && activity.username}</p>
                    </div>
                    {activity.address ? <div className="post-location">
                        <i className="fa fa-map-marker" />
                        <span>{activity && activity.address}</span>
                    </div> : null}
                    </div>
                    <div className="full-post-img">
                        <Carousel>
                            <Carousel.Item>
                                {postImage}
                            </Carousel.Item>
                        </Carousel>
                    </div> 
                    <div className="entry">
                        <p>{activity.caption}<span>{taggedUsers}</span></p>
                    </div>
                    <div className="like_time">
                    <div className="like-by">
                        <p>Like by</p>  
                        {likes && likes.map((i, index) => {
                            return i.profile_thumb ? <img key={index} style={{borderRadius:'20px', marginRight: '-15px'}} src={picUrl+""+i.profile_thumb} alt="avatar" /> : null;
                        })}
                    </div>
                    <div className="post-time">                        
                        <p>posted <Moment fromNow>{new Date(activity.date_created * 1000)}</Moment></p>
                    </div>    
                    </div>
                    <PostCommentComponent postData={activity} />
                </div> 
            </div> 
        );
    }

}
 
export default PostImageDetailsModelContent
