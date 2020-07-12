  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import axios from 'axios';
export const AuthServices = {
   login, register, registerStep, 
   getUSerProfile,
    getUSerFollowings,getUserId,
    getToken,getUserProfileImage,
    isLogedIn,
    getUserData    
}; 

function login(userData) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+""+ApiSlug.LOGIN;
 		//var newUrl = URL+"?type="+userData.type+"&field="+userData.field+"&password="+userData.password;

		fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain'
			}, 
       		body: JSON.stringify(userData) 
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
function register(userData) { 
 return new Promise((resolve, reject) =>{
 
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.REGISTER;
 		
 		//var newUrl = URL+"?type="+userData.type+"&username="+userData.username+"&field="+userData.field+"&password="+userData.password+"&password2="+userData.password2;
		fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain'
			}, 
       		body: JSON.stringify(userData) 
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

function registerStep(userData) { 
 return new Promise((resolve, reject) =>{
 
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.UPDATE_USER_SETUP_DETAILS;
 		//var newUrl = URL+"?user_id="+userData.user_id+"&account_type="+userData.account_type+"&lat="+userData.lat+"&lng="+userData.lng+"&formatted_address="+userData.formatted_address+"&city="+userData.city+"&country="+userData.country+"&gender="+userData.gender+"&full_name="+userData.full_name+"&skill_set="+userData.skill_set;

	/*	fetch(URL, {
			method: 'POST',
			headers: {  
			 'Content-type': 'multipart/form-data',
			 'Authorization': 'Bearer '+getToken()
			}, 
			contentType: false,
			cache: false,
			processData:false,
       		body: userData 
		})
		.then((response) => response.json())
		.then((res) => {
		 	resolve(res);
		})
		.catch((error) => {
			 reject(error);
		});*/ 
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer '+getToken()
            }
        };
        axios.post(URL,userData,config)
            .then((response) => {
               console.log(response);
            }).catch((error) => {
            	console.log(error);
        });
	});
} 
 

function getUSerProfile() { 
 return new Promise((resolve, reject) =>{
 
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FEATCH_USER_PROFILE;
 		var newUrl = URL+"?user_id="+getUserId();
		fetch(newUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'text/plain',
			'Authorization': 'Bearer '+getToken()
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
function getUSerFollowings() { 
 return new Promise((resolve, reject) =>{
 
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FEATCH_USER_FOLLOWING;
 		var newUrl = URL+"?user_id="+getUserId();
		fetch(newUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'text/plain',
			'Authorization': 'Bearer '+getToken()
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


function getToken(){
	var user = JSON.parse(localStorage.getItem('user'));
	var token = 0;
	if(user){
		token = user.token;
	}
	return token; 
}
function getUserId(){
	var user = JSON.parse(localStorage.getItem('user'));
	var userId = 0;
	if(user){
		userId = user.details.id;
	}
	return userId;
}
function getUserProfileImage(){
	var user = JSON.parse(localStorage.getItem('user'));
	var profile_picture = '';
	if(user){
		profile_picture = Config.SITE_URL+""+user.details.profile_picture; 
	}
	return profile_picture;
}
function getUserData(){
	var user = JSON.parse(localStorage.getItem('user'));
	var data = '';
	if(user){
			data = user.details;
	}
	return data;
}

function isLogedIn(){
	var data = false;
	if(this.getUserId() > 0){
		 data = true;
	} 

	return data;
}