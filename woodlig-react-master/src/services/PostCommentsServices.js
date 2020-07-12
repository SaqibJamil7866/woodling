  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
export const PostCommentsServices = {
   getPostComments,addPostComments   
}; 
function getPostComments(postId) { 
 return new Promise((resolve, reject) =>{
 		  
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_POST_COMMENTS;
 		 var userId = AuthServices.getUserId();
 		URL =  URL+"?user_id="+userId+"&post_id="+postId;
 	 
 	 
		fetch(URL, {
			method: 'GET',
			headers: { 'Content-Type': 'text/plain',
			'Authorization': 'Bearer '+AuthServices.getToken()
			}, 
       		/*body: JSON.stringify(userData) */
		})
		.then((response) => response.json())
		.then((res) => {
		 	resolve(res);
		})
		.catch((error) => {
			 reject(error);
		});
	});
}
 function addPostComments(parma) { 
 return new Promise((resolve, reject) =>{
 		  
 		//var URL =  Config.API_BASEURL+"/"+ApiSlug.ADD_POST_COMMENTS+"?"+parma; 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.ADD_POST_COMMENTS;

		fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain',
			'Authorization': 'Bearer '+AuthServices.getToken()
			}, 
       		body: JSON.stringify(parma) 
		})
		.then((response) => response.json())
		.then((res) => {
		 	resolve(res);
		})
		.catch((error) => {
			 reject(error);
		});
	});
}
 

 
