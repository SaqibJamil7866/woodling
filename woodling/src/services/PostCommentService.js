/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getCommentsUrl, addCommentsUrl, addCommentReactionUrl, addCommentReplyUrl } from '../public/endpoins';
import {AuthService} from './AuthService';

export const PostCommentsService = {
   getPostComments, addPostComments, addCommentReaction, addCommentReply   
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
 

 
