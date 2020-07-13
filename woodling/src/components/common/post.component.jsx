/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
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

    return (
        <div>
            {props.posts && 
                props.posts.map((prop, index, arr) => {
                return (
                    <div onClick={()=>openDetailsModal(prop,'single-image')} key={prop.post_id} className={`mt30 top-content-bar container row ${arr.length -1 === index ? "": "mb100"}`} style={{width: '700px'}}>
                        <div className="col-md-6">
                            <div className="p-3-0">
                                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                                <span>{prop.full_name}</span>
                            </div>
                            <div className="min-h80">
                                {prop.caption}
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
                        <div className="col-md-6 p0">
                            <div className="">
                                <img className="brad-10 post-image absolute" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
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
                <Modal.Header closeButton>
                    {/* <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <PostImageDetailsModelContent postData={postDetailData.postData} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Post;