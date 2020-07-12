  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
export const ActivityStreamService = {
   getActivityStreams, getActivityDetails, getPostTaggedUsers     
}; 
function getActivityStreams() { 
 return new Promise((resolve, reject) =>{
 		 
 		//var URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_ACTIVITY_STREAM;
 		 
 		URL =  Config.API_BASEURL+""+ApiSlug.FETCH_ACTIVITY_STREAM+"?page=1&user_id="+AuthServices.getUserId();
 	 
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
function getActivityDetails(postId) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_ACTIVITY_DETAILS;
 		 
 		URL =  URL+"?user_id=172&post_id="+postId;
 	 
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
function getPostTaggedUsers(postId) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_POST_TAGGED_USERS;
 		 
 		URL =  URL+"?post_id="+postId;
 	 
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

 
