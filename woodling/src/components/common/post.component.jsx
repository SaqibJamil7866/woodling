/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { picUrl } from '../../public/endpoins';
import { AuthService } from '../../services/AuthService';
import { PostCommentsService } from '../../services/PostCommentService';
import { showLoader, hideLoader } from '../../public/loader';
import { ReactComponent as DotCircleIcon } from '../../assets/dot-circle.svg';
import { ReactComponent as ShareIcon } from '../../assets/share-alt.svg';
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import SharePostModal from '../../models/share-post-modal';
import { copyToClipboard } from '../../public/helperFunctions';
import PostOptionModal from '../../models/post-option-modal';
import PostImageDetailsModelContent from '../../models/post_image_details.model';

function Post(props) {

    const [postDetailData, setPostDetailData] = useState({showModal:false, postData: 'love', postType: ''});
    const [showSharePostModel, setShowSharePostModel] = useState(false);
    const [showPostOptonsModel, setShowPostOptonsModel] = useState(false);

    function openDetailsModal(postData, type){
        setPostDetailData({...postDetailData, showModal:true, postData, postType:type });
    }

    function openPostOptonsModel(post){
        postDetailData.selectedPost = post;
        setPostDetailData({...postDetailData});
        setShowPostOptonsModel(true);
    }

    function closeModal(){
        setPostDetailData({showModal:false, postData: '', postType: '' });
    }

    function updateOnDeletePost(){
        props.updatePosts();
        if(postDetailData?.showModal){
            closeModal();
        }
    }

    const sharePost = () => {
        setShowSharePostModel(true);
    }
    const copy_to_clipboard = (text) =>{
        copyToClipboard(text);
    }

    const addPostReaction = (postData) =>{
        const { post_id, like_status } = postData;
        const reaction = (like_status ? like_status : '0');
        const data = { user_id: AuthService.getUserId(), post_id , reaction: (reaction === '1' ? 'dislike':'like') };
        showLoader();
        PostCommentsService.addPostReaction(data).then((res)=>{
            hideLoader();
            postData.like_status = reaction === '1' ? '0' : '1';
            if(postData.like_status === '0'){
                postData.likes--;
            }
            else{
                postData.likes++;
            }
            setPostDetailData({...postDetailData, postData});
        })
    }

    return(
        <div>
            {props.posts && 
                props.posts.map((prop, index, arr) => {
                return (
                    arr.length-1 === index ?(
                        <div key={prop.post_id} className={`mt30 top-content-bar container row ${arr.length -1 === index ? "mb100": "mb100"}`} style={{width: '700px'}}>
                            <div className={prop.path ? "col-md-6" : 'col-md-10'}>
                                <div className="p-3-0">
                                    <img style={{width: '15%'}} className="brad-40 h45" src={prop.profile_thumb ? picUrl+prop.profile_thumb : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} alt="authore pic" />
                                    <span>@{prop.username}</span>
                                </div>
                                <div className="min-h80">
                                    <p><b>{prop.caption}</b></p>
                                    <p>{prop.body}</p>
                                </div>
                                <div className="border-top">
                                    <span className="mr20 red">
                                        <i className={`fa ${ (postDetailData && postDetailData.postData && ( postDetailData.postData.like_status !== '1' && postDetailData.postData.like_status !== 1)) ? 'fa-heart-o' : 'fa-heart'}`} title="Like" onClick={()=>addPostReaction(prop)} />
                                        <span className="badge">{prop.likes}</span>
                                    </span>
                                    <span className="mr20 navy">
                                        <i className="fa fa-comment-o" title="Comment" />
                                        <span className="badge  mr20">{prop.comments}</span>
                                    </span>
                                    <span className="mr20 gray">
                                        <Moment fromNow>{new Date(prop.date_created * 1000)}</Moment>
                                    </span>
                                </div>
                            </div>
                            <div className={prop.path ? "col-md-6 p0" : 'col-md-2'}>
                                <div className="" onClick={()=>openDetailsModal(prop,'single-image')}>
                                    {prop.path!==null ? <img onError={props.onCrash} className="brad-10 post-image absolute" src={picUrl+prop.path} alt="authore pic" /> : null}
                                </div>
                                <div className="float-right">
                                    <DotCircleIcon onClick={()=>openPostOptonsModel(prop)} className="profile-icons" />
                                    <ShareIcon onClick={sharePost} className="profile-icons" />
                                    <LinkIcon onClick={()=>{copy_to_clipboard(prop.caption+' '+prop.body)}} className="profile-icons" />
                                </div>
                            </div>
                        </div>
                    ):(
                        <div ref={props.scrollRef} key={prop.post_id} className={`mt30 top-content-bar container row ${arr.length -1 === index ? "mb100": "mb100"}`} style={{width: '700px'}}>
                            <div className={prop.path ? "col-md-6" : 'col-md-10'}>
                                <div className="p-3-0">
                                    <img style={{width: '15%'}} className="brad-40 h45" src={prop.profile_thumb ? picUrl+prop.profile_thumb : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} alt="authore pic" />
                                    <span>@{prop.username}</span>
                                </div>
                                <div className="min-h80">
                                    <p><b>{prop.caption}</b></p>
                                    <p>{prop.body}</p>
                                </div>
                                <div className="border-top">
                                    <span className="mr20 red">
                                        <i className={`fa ${ (postDetailData && postDetailData.postData && ( postDetailData.postData.like_status !== '1' && postDetailData.postData.like_status !== 1)) ? 'fa-heart-o' : 'fa-heart'}`} title="Like" onClick={()=>addPostReaction(prop)} />
                                        <span className="badge">{prop.likes}</span>
                                    </span>
                                    <span className="mr20 navy">
                                        <i className="fa fa-comment-o" title="Comment" />
                                        <span className="badge  mr20">{prop.comments}</span>
                                    </span>
                                    <span className="mr20 gray">
                                        <Moment fromNow>{new Date(prop.date_created * 1000)}</Moment>
                                    </span>
                                </div>
                            </div>
                            <div className={prop.path ? "col-md-6 p0" : 'col-md-2'}>
                                <div className="" onClick={()=>openDetailsModal(prop,'single-image')}>
                                    {prop.path!==null ? <img onError={props.onCrash} className="brad-10 post-image absolute" src={picUrl+prop.path} alt="authore pic" /> : null}
                                </div>
                                <div className="float-right">
                                    <DotCircleIcon onClick={()=>openPostOptonsModel(prop)} className="profile-icons" />
                                    <ShareIcon onClick={sharePost} className="profile-icons" />
                                    <LinkIcon onClick={()=>{copy_to_clipboard(prop.caption+' '+prop.body)}} className="profile-icons" />
                                </div>
                            </div>
                        </div>
                    )
                )})
            }


            <Modal
                // {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={postDetailData.showModal}
                onHide={closeModal}
            >
                <Modal.Body>
                    <PostImageDetailsModelContent 
                        postData={postDetailData.postData} 
                        addPostReaction={addPostReaction} 
                        closeModal={closeModal} 
                        sharePost={sharePost}
                        copy_to_clipboard={copy_to_clipboard}
                        openPostOptonsModel={openPostOptonsModel}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <SharePostModal title="Share Post" sharedUrl={window.location.href} showModel={showSharePostModel} hideShareModel={()=> setShowSharePostModel(false)} />
            <PostOptionModal
                showModal={showPostOptonsModel}
                hideModel={()=>setShowPostOptonsModel(false)}
                post={postDetailData?.selectedPost}
                updatePosts={updateOnDeletePost}
            />
        </div>
    );
}

export default Post;