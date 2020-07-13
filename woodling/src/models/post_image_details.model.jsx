import React from 'react';
import { ToastsStore } from 'react-toasts';
import { siteUrl } from '../public/endpoins';
import Loader from 'react-loader-spinner';
import { Carousel } from 'react-bootstrap';
import Moment from 'react-moment';
import PostCommentComponent from '../components/common/post_comment.component';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
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
            <div class="custom-modal-content">
                <div class="modal-header post-modal-header">
                    <div onClick={this.props.closeModal} className='modal-content close-btn'>
                        <button type='button' className='close'>
                            <i aria-hidden="true" className='fa fa-times fs30'></i>
                        </button>
                    </div>
                    <div className='post-like-btn'>
                        <a href="" class="post-like-top"><i class="fa fa-heart-o"></i></a>
                    </div>
                    <div class="attachment-share">
                        <div class="more-icon">
                            <a href="" class="more-optinon"><i class="fa fa-ellipsis-h"></i></a>
                        </div>
                        <div class="share-icon">
                            <a href="" class="share-optinon"><i class="fa fa-share-alt"></i></a>
                        </div>
                        <div class="link-icon">
                            <a href="" class="link-optinon"><i class="fa fa-link"></i></a>
                        </div>
                    </div>
                </div>
                <div class="custom-modal-body">
                    <div class="fullpost-header">
                    <div class="update_user_profile">
                        <img src={require('../assets/account-circle.png')} alt="" />
                        <p>@{activity && activity.username}</p>
                    </div>
                    <div class="post-location">
                        <i class="fa fa-map-marker"></i>
                        <span>{activity && activity.address}</span>
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
                            <Carousel>
                                <Carousel.Item>
                                    {postImage}
                                </Carousel.Item>
                            </Carousel>
                        }
                    </div> 
                    <div class="entry">
                        <p>{activity.caption}<span>{taggedUsers}</span></p>
                    </div>
                    <div class="like_time">
                    <div class="like-by">
                        <p>Like by</p>  
                        <a href="">
                        <img src={require('../assets/account-circle.png')} />
                        <img src={require('../assets/account-circle.png')}/>
                        <img src={require('../assets/account-circle.png')}/>
                        <img src={require('../assets/account-circle.png')}/>
                        </a>  
                    </div>
                    <div class="post-time">                        
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
