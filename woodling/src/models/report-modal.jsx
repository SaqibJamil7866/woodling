import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastsStore } from 'react-toasts';
import { AuthService } from '../services/AuthService';
import { showLoader, hideLoader } from '../public/loader';


const ReportPostModal = (props) => {
    const { showModal, hideModel, reportPost } = props;

    const reasons = [
        {title: 'Spam', reason: 'This post has unsolicited and repeated content in bulk.'},
        {title: 'Malicious Links', reason: 'This post has dangerous links.'},
        {title: 'Profanity/Insults', reason: 'This post make use of slurs and nit censoring their words. This post contains cyberbullying saying mean.'},
        {title: 'Identity Theift/Catfishing', reason: "This post has deliberate use of someone else's identity."},
        {title: 'Threats', reason: 'This post contains/promoted threats.'},
        {title: 'Pornography', reason: 'This post contains porno content.'},
        {title: 'Hate Speech', reason: 'This post has offensive post against Race or Gender.'},
        {title: 'Copyright Infringement', reason: 'This post contains/distributes works protected by copyright law.'}
    ]

    const ownPost = () =>{
        return '';
    }


    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={hideModel}
                className="hide-close-btn"
            >
                <Modal.Header>
                    <div className="col-md-12 forced_center">
                        <h3 className="red">Report This Post</h3>
                        <p>Tell us what's wrong with this post</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-11 center border">
                        {   reasons.map((reason, index)=>{
                                return(
                                    <button key={index} className="w48p border m5" onClick={()=>reportPost(reason.title)}>
                                        <h4>{reason.title}</h4>
                                        <p className="min-h100">{reason.reason}</p>
                                    </button>
                                )
                            })
                        }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
 
export default ReportPostModal;