  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
import axios from 'axios';
export const PostService = {
   addPost    
}; 
 
function addPost(userData) { 
 return new Promise((resolve, reject) =>{
 
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.ADD_POST;
 		 
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer '+AuthServices.getToken()
            }
        };
        axios.post(URL,userData,config)
            .then((response) => { 
                resolve(response);
            })
            .catch((error) => {
                resolve(error);
            	console.log(error);
            }); 
	});

} 
 
 