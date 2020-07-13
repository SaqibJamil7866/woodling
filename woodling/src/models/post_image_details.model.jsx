import React from 'react';
import { ToastsStore } from 'react-toasts';
import { siteUrl } from '../public/endpoins';
import { Carousel } from 'react-bootstrap';
import Moment from 'react-moment';
import PostCommentComponent from '../components/common/post_comment.component';
import { ActivityStreamService } from '../services/ActivityStreamService';
 
class PostImageDetailsModelContent extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            activity: this.props.postData,
            activityMedia: [],
            dotPosition:'top',
            sliderLoad:false,
            postTaggedUsers:[],
        };
    }
    
    componentDidMount() {
        Promise.all([ActivityStreamService.getPostTaggedUsers( this.props.postData.post_id)])
        .then((res)=>{
            if(res[0].status != 'error'){
                if(res[0].data.tagged_users.length > 0){
                    this.setState({postTaggedUsers: res[0].data.tagged_users,sliderLoad:false});
                }
            }else {
                ToastsStore.error(res[1].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => console.log("Hide loader"));
    } 
    handlePositionChange = ({ target: { value: dotPosition } }) => this.setState({ dotPosition })
     
    render() {  
        const {activity,activityMedia,dotPosition,postTaggedUsers} = this.state;
        var postImage = '';
        var taggedUsers = '';
        if(activityMedia){
            // postImage = activityMedia.map((media,index)=>{  
            //     return <img src={siteUrl+""+media.path} />;
            // });
            postImage = <img src={siteUrl+""+this.props.postData.path} />;
        }

        taggedUsers = postTaggedUsers.map((tuser,index)=>{  
            return <span>@{tuser.username} </span>;
        });  
        return( 
            <div className="custom-modal-content">
                <div class="modal-header post-modal-header">
                    <div onClick={this.props.closeModal} className='modal-content close-btn'>
                        <button type='button' className='close'>
                            <i aria-hidden="true" className='fa fa-times fs30'></i>
                        </button>
                    </div>
                    <div className='post-like-btn'>
                        <a href="" class="post-like-top"><i className="fa fa-heart-o"></i></a>
                    </div>
                    <div class="attachment-share">
                        <div class="more-icon">
                            <a href="" class="more-optinon"><i className="fa fa-ellipsis-h" /></a>
                        </div>
                        <div className="share-icon">
                            <a href="" className="share-optinon"><i className="fa fa-share-alt" /></a>
                        </div>
                        <div className="link-icon">
                            <a href="" className="link-optinon"><i className="fa fa-link" /></a>
                        </div>
                    </div>
                </div>
                <div className="custom-modal-body">
                    <div className="fullpost-header">
                    <div className="update_user_profile">
                        <img src={require('../assets/account-circle.png')} alt="" />
                        <p>@{activity && activity.username}</p>
                    </div>
                    <div className="post-location">
                        <i className="fa fa-map-marker" />
                        <span>{activity && activity.address}</span>
                    </div>
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
                        <a href="">
                        <img src={require('../assets/account-circle.png')} alt="avatar" />
                        <img src={require('../assets/account-circle.png')} alt="avatar" />
                        <img src={require('../assets/account-circle.png')} alt="avatar" />
                        <img src={require('../assets/account-circle.png')} alt="avatar" />
                        </a>  
                    </div>
                    <div className="post-time">                        
                        <p>posted <Moment fromNow>{new Date(activity.date_created * 1000)}</Moment></p>
                    </div>    
                    </div>
                    <PostCommentComponent postData={activity}/>
                </div> 
            </div> 
        );
    }

}
 
export default PostImageDetailsModelContent
