  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
export const FollowingService = {
   getUSerFollowings,getUSerFollowiers 
}; 
function getUSerFollowings() { 
 return new Promise((resolve, reject) =>{
 
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FEATCH_USER_FOLLOWING;
 		var newUrl = URL+"?user_id="+AuthServices.getUserId();
		fetch(newUrl, {
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
function getUSerFollowiers() { 
 return new Promise((resolve, reject) =>{
 
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FEATCH_USER_FOLLOWERS;
 		var newUrl = URL+"?user_id="+AuthServices.getUserId();
		fetch(newUrl, {
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
 