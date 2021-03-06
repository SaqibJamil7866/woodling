/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getCommentsUrl, getCommentRpliesUrl, addCommentsUrl, addPostReactionUrl, addCommentReactionUrl, 
    addCommentReplyUrl, sharePostUrl, deletePostUrl, reportPostUrl } from '../public/endpoins';
import {AuthService} from './AuthService';

export const PostCommentsService = {
   getPostComments, getPostCommentReplies, addPostReaction, addPostComments, addCommentReaction, 
   addCommentReply, sharePost, deletePost, reportPost
}; 

function getPostComments(postId) { 
 return new Promise((resolve, reject) =>{

 		const url =  getCommentsUrl+"?user_id="+AuthService.getUserId()+"&post_id="+postId;
        axios.get(url)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
	});
}

function sharePost(postId) { 
    return new Promise((resolve, reject) =>{
        const url =  sharePostUrl+"?user_id="+AuthService.getUserId()+"&post_id="+postId;
        axios.get(url)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
    });
}

function getPostCommentReplies(postId, commentId) { 
    return new Promise((resolve, reject) =>{
        const url =  getCommentRpliesUrl+"?user_id="+AuthService.getUserId()+"&post_id="+postId+"&comment_id="+commentId;
        axios.get(url)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
    });
}

function addPostComments(params) { 
    return new Promise((resolve, reject) =>{
        axios.post(addCommentsUrl, params)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
	});
}

function deletePost(params) { 
    return new Promise((resolve, reject) =>{
        axios.post(deletePostUrl, params)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
	});
}

function reportPost(params) { 
    return new Promise((resolve, reject) =>{
        axios.post(reportPostUrl, params)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
	});
}

function addPostReaction(params) { 
    return new Promise((resolve, reject) =>{
        axios.post(addPostReactionUrl, params)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
	});
}

function addCommentReaction(params) { 
    return new Promise((resolve, reject) =>{
        axios.post(addCommentReactionUrl, params)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
	});
}

function addCommentReply(params) { 
    return new Promise((resolve, reject) =>{
        axios.post(addCommentReplyUrl, params)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        });
	});
}