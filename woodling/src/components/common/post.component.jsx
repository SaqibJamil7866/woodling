/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { picUrl } from '../../public/endpoins';
import { ReactComponent as DotCircleIcon } from '../../assets/dot-circle.svg';
import { ReactComponent as ShareIcon } from '../../assets/share-alt.svg';
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import PostImageDetailsModelContent from '../../models/post_image_details.model';

function Post(props) {

    const [postDetailData, setPostDetailData] = useState({showModal:false, postData: 'love', postType: ''});

    function openDetailsModal(postData, type){
        setPostDetailData({...postDetailData, showModal:true, postData, postType:type });
    }

    function closeModal(){
        setPostDetailData({showModal:false, postData: '', postType: '' });
    }

    return(
        <div>
            {props.posts && 
                props.posts.map((prop, index, arr) => {
                return (
                    <div onClick={()=>openDetailsModal(prop,'single-image')} key={prop.post_id} className={`mt30 top-content-bar container row ${arr.length -1 === index ? "": "mb100"}`} style={{width: '700px'}}>
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
                                    <i className="fa fa-heart-o" title="Like" />
                                    <span className="badge">{prop.likes}</span>
                                </span>
                                <span className="mr20 navy">
                                    <i className="fa fa-comment-o" title="Comment" />
                                    <span className="badge  mr20">{prop.comments}</span>
                                </span>
                            </div>
                        </div>
                        <div className={prop.path ? "col-md-6 p0" : 'col-md-2'}>
                            <div className="">
                                {prop.path!==null ? <img onError={props.onCrash} className="brad-10 post-image absolute" src={picUrl+prop.path} alt="authore pic" /> : null}
                            </div>
                            <div className="float-right">
                                <DotCircleIcon className="profile-icons" />
                                <ShareIcon className="profile-icons" />
                                <LinkIcon className="profile-icons" />
                            </div>
                        </div>
                    </div>
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
                    <PostImageDetailsModelContent postData={postDetailData.postData} closeModal={closeModal} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Post;