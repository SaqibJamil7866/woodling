  
import axios from 'axios';
import cookie from 'react-cookies';
import { loginUrl, getIndividualSkillsUrl, picUrl } from '../public/endpoins';

export const AuthService = {
  login, getUserId, getUserName, getSkills,
  getUserProfileImage
//    , register, registerStep, 
//    getUSerProfile,
//     getUSerFollowings,
//     getToken,getUserProfileImage,
//     isLogedIn,
//     getUserData    
}; 

function login(params) { 
    return new Promise((resolve, reject) =>{
        axios.post(loginUrl, params)
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}

function getSkills(type) {
  const url = getIndividualSkillsUrl;

  return new Promise((resolve, reject) =>{
      axios.post(getIndividualSkillsUrl, type)
      .then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);        
      });
});
}

// function register(userData) { 
//  return new Promise((resolve, reject) =>{
 		 
//  		var URL =  Config.API_BASEURL+"/"+ApiSlug.REGISTER;
 		
//  		//var newUrl = URL+"?type="+userData.type+"&username="+userData.username+"&field="+userData.field+"&password="+userData.password+"&password2="+userData.password2;
// 		fetch(URL, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'text/plain'
// 			}, 
//        		body: JSON.stringify(userData) 
// 		})
// 		.then((response) => response.json())
// 		.then((res) => {
// 		 	resolve(res);
// 		})
// 		.catch((error) => {
// 			 reject(error);
// 		});
// 	});
// } 

// function registerStep(userData) { 
//  return new Promise((resolve, reject) =>{
 
 		 
//  		var URL =  Config.API_BASEURL+"/"+ApiSlug.UPDATE_USER_SETUP_DETAILS;
//  		//var newUrl = URL+"?user_id="+userData.user_id+"&account_type="+userData.account_type+"&lat="+userData.lat+"&lng="+userData.lng+"&formatted_address="+userData.formatted_address+"&city="+userData.city+"&country="+userData.country+"&gender="+userData.gender+"&full_name="+userData.full_name+"&skill_set="+userData.skill_set;

// 	/*	fetch(URL, {
// 			method: 'POST',
// 			headers: {  
// 			 'Content-type': 'multipart/form-data',
// 			 'Authorization': 'Bearer '+getToken()
// 			}, 
// 			contentType: false,
// 			cache: false,
// 			processData:false,
//        		body: userData 
// 		})
// 		.then((response) => response.json())
// 		.then((res) => {
// 		 	resolve(res);
// 		})
// 		.catch((error) => {
// 			 reject(error);
// 		});*/ 
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data',
//                 'Authorization': 'Bearer '+getToken()
//             }
//         };
//         axios.post(URL,userData,config)
//             .then((response) => {
//                console.log(response);
//             }).catch((error) => {
//             	console.log(error);
//         });
// 	});
// } 
 

// function getUSerProfile() { 
//  return new Promise((resolve, reject) =>{
 
 		 
//  		var URL =  Config.API_BASEURL+"/"+ApiSlug.FEATCH_USER_PROFILE;
//  		var newUrl = URL+"?user_id="+getUserId();
// 		fetch(newUrl, {
// 			method: 'GET',
// 			headers: { 'Content-Type': 'text/plain',
// 			'Authorization': 'Bearer '+getToken()
// 			}, 
//        		/*body: JSON.stringify(userData) */
// 		})
// 		.then((response) => response.json())
// 		.then((res) => {
// 		 	resolve(res);
// 		})
// 		.catch((error) => {
// 			 reject(error);
// 		});
// 	});
// } 
// function getUSerFollowings() { 
//  return new Promise((resolve, reject) =>{
 
 		 
//  		var URL =  Config.API_BASEURL+"/"+ApiSlug.FEATCH_USER_FOLLOWING;
//  		var newUrl = URL+"?user_id="+getUserId();
// 		fetch(newUrl, {
// 			method: 'GET',
// 			headers: { 'Content-Type': 'text/plain',
// 			'Authorization': 'Bearer '+getToken()
// 			}, 
//        		/*body: JSON.stringify(userData) */
// 		})
// 		.then((response) => response.json())
// 		.then((res) => {
// 		 	resolve(res);
// 		})
// 		.catch((error) => {
// 			 reject(error);
// 		});
// 	});
// } 


// function getToken(){
// 	var user = JSON.parse(localStorage.getItem('user'));
// 	var token = 0;
// 	if(user){
// 		token = user.token;
// 	}
// 	return token; 
// }
function getUserId(){
	const user = cookie.load('currnt_user');
	let userId = 0;
	if(user){
		userId = user.id;
	}
  return userId;
  // return 58;
}

function getUserName(){
	const user = cookie.load('currnt_user');
	let userName = '';
	if(user){
		userName = user.username;
	}
  return userName;
}

function getUserProfileImage(){
	const user = cookie.load('currnt_user');
	let profilePicture = '';
	if(user){
		profilePicture = picUrl+""+user.profile_picture; 
	}
	return profilePicture;
}
// function getUserData(){
// 	var user = JSON.parse(localStorage.getItem('user'));
// 	var data = '';
// 	if(user){
// 			data = user.details;
// 	}
// 	return data;
// }

// function isLogedIn(){
// 	var data = false;
// 	if(this.getUserId() > 0){
// 		 data = true;
// 	} 

// 	return data;
// }