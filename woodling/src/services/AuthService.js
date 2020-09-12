/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
  
import axios from 'axios';
import cookie from 'react-cookies';
import { loginUrl, registerUrl, updateUserAccountDetailUrl, getIndividualSkillsUrl, getBusinessSkillsUrl, 
  picUrl, siteUrl, getMessageUserProfileUrl } from '../public/endpoins';

export const AuthService = {
  login, register, updateAccountDetails, getUserId, getUserName, getSkills,
  getUserProfileImage, getPassword, getMessageUserProfile
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

function getMessageUserProfile(user_id, their_id) { 
  return new Promise((resolve, reject) =>{
      axios.get(getMessageUserProfileUrl+`?user_id=${user_id}&user_profile_id=${their_id}`)
      .then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);        
      });
});
}

function getSkills(type) {
  let url = getIndividualSkillsUrl;

  if(type === 'business'){
    url = getBusinessSkillsUrl;
  }

  return new Promise((resolve, reject) =>{
    axios.get(url)
    .then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
    });
});
}

function register(params) {
  return new Promise((resolve, reject) =>{
    axios.post(registerUrl, params)
    .then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);        
    });
  });
}

function updateAccountDetails(params) {
//  	var newUrl = URL+"?user_id="+userData.user_id+"&account_type="+userData.account_type+"&lat="+userData.lat+"&lng="+userData.lng+"&formatted_address="+userData.formatted_address+"&city="+userData.city+"&country="+userData.country+"&gender="+userData.gender+"&full_name="+userData.full_name+"&skill_set="+userData.skill_set;
  return new Promise((resolve, reject) =>{
    axios.post(updateUserAccountDetailUrl, params)
    .then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);        
    });
  });
}

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
		profilePicture = siteUrl+""+user.profile_picture; 
	}
	return profilePicture;
}

function getPassword() {
  const user = cookie.load('current_user');
  let password = '';
  if(user) {
    console.log(user);
  }
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