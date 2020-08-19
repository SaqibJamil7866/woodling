/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getCommentsUrl, getCommentRpliesUrl, addCommentsUrl, addPostReactionUrl, addCommentReactionUrl, addCommentReplyUrl } from '../public/endpoins';
import {AuthService} from './AuthService';

export const PostCommentsService = {
   getPostComments, getPostCommentReplies, addPostReaction, addPostComments, addCommentReaction, addCommentReply   
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
 

 
