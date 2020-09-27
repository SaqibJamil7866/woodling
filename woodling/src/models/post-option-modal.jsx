import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastsStore } from 'react-toasts';
import { AuthService } from '../services/AuthService';
import { FollowService } from '../services/FollowService';
import { PostCommentsService } from '../services/PostCommentService';
import { showLoader, hideLoader } from '../public/loader';
import ReportPostModal from '../models/report-modal';


const PostOptionModal = (props) => {
    const [showReportModal, setShowReportModal] = useState(false);
    const { showModal, hideModel, updatePosts, post } = props;

    const ownPost = () =>{
        return (post?.post_user_id === AuthService.getUserId());
    }

    const deletePost = () =>{
        const data = { id: post.post_id, user_id: AuthService.getUserId()};
        showLoader();
        PostCommentsService.deletePost(data).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                ToastsStore.success(res.data.message);
                updatePosts();
                hideModel();
            }
            else{
                ToastsStore.error(res.data.message)
            }
        });
    }

    const promotePost = () => {

    }

    const UnfollowUser = () =>{
        const data = { user_id: AuthService.getUserId(), follower_id: post.post_user_id};
        showLoader();
        FollowService.unfollowUser(data).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                hideModel();
                ToastsStore.success(res.data.message);
            }
            else{
                ToastsStore.error(res.data.message)
            }
        });
    }

    const reportPost = (reason) => {
        const data = { id: post.post_id, user_id: AuthService.getUserId(), report: reason};
        showLoader();
        PostCommentsService.reportPost(data).then((res)=>{
            hideLoader();debugger
            if(res.data.status !== 'error'){
                ToastsStore.success(res.data.message);
                hideModel();
            }
            else{
                ToastsStore.error(res.data.message)
            }
        });
    }

    return (
        <>
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={hideModel}
                className="hide-close-btn"
            >
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="forced_center">Options</h3>
                        </div>
                        {/* If personal post */}
                        {ownPost() ? (
                            <>
                                <div className='col-md-12'>
                                    <button className="post_options_btn" onClick={()=>promotePost()}>
                                        Promote
                                    </button>
                                </div>
                                <div className='col-md-12'>
                                    <button className="post_options_btn red fw700" onClick={()=>deletePost()}>
                                        Delete this Post
                                    </button>
                                </div>
                            </>
                        ): null }

                        {/* if other's post  */}
                        {!ownPost() ? (
                            <>
                                <div className='col-md-12'>
                                    <button className="post_options_btn" onClick={()=>UnfollowUser()}>
                                        Unfollow @<b>{post?.username}</b>
                                    </button>
                                </div>
                                <div className='col-md-12'>
                                    <button className="post_options_btn red fw700" onClick={()=>setShowReportModal(true)}>
                                        Report this Post
                                    </button>
                                </div>
                            </>
                        ): null }
                    </div>
                </Modal.Body>
            </Modal>

            <ReportPostModal showModal={showReportModal} hideModel={()=>setShowReportModal(false)} reportPost={(reason)=>{reportPost(reason);setShowReportModal(false)}} />
        </>
    );
}
 
export default PostOptionModal;