import axios from 'axios';
import { getCommentsUrl, addCommentsUrl } from '../public/endpoins';
import {AuthService} from './AuthService';
export const PostCommentsService = {
   getPostComments,addPostComments   
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
 

 
