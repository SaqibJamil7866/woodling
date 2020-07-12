  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
export const SearchServices = {
   getSearchPeoples    
}; 
function getSearchPeoples(search) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.SEARCH_PEOPLE+"?page=1&user_id="+AuthServices.getUserId()+"&name="+search; 
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