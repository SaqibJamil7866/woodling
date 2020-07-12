  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
export const SkillServices = {
   getSkills    
}; 
function getSkills(type) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_INDIVIDUAL_SKILLS;
 		if(!type){
 			URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_BUSINESS_SKILLS;
 		} 
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