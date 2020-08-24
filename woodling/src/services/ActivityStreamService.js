  
import axios from 'axios';
import {AuthService} from './AuthService';
import { activityStreamUrl, activityDetailsUrl, getTagUrl, getExploreUsersUrl, getPremiunUsersUrl, 
	getPostTaggedUsersUrl, searchPeopleUrl, geocodeUrl, addPostUrl } from '../public/endpoins';

export const ActivityStreamService = {
   getActivityStreams, getExploreUsers, getPremiumUsers, getActivityDetails, getPostTaggedUsers, searchPeople, 
   getLocationDetailByPlaceId, submitPost, getTags
};

function getActivityStreams(page) { 
 return new Promise((resolve, reject) =>{
 		const url =  activityStreamUrl+"?page="+page+"&user_id="+AuthService.getUserId();
        axios.get(url)
		.then((res) => {
		 	resolve(res);
		})
		.catch((error) => {
            reject(error);
		});
	});
}

function getTags() {
    return new Promise((resolve, reject) => {
        const url = getTagUrl+"?user_id="+AuthService.getUserId();
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getExploreUsers(){ 
	return new Promise((resolve, reject) =>{
		const url =  getExploreUsersUrl+"?user_id="+AuthService.getUserId();
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		});
	});
}

function getPremiumUsers(){ 
	return new Promise((resolve, reject) =>{
		const url =  getPremiunUsersUrl+"?user_id="+AuthService.getUserId();
		axios.get(url)
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
		const url =  activityDetailsUrl+"?user_id="+AuthService.getUserId()+"&post_id="+postId;
		axios.get(url)
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
		const url =  getPostTaggedUsersUrl+"?post_id="+postId;
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		});
	});
}

function searchPeople(name = '') {
	return new Promise((resolve, reject) => {
		const url = searchPeopleUrl+"?user_id="+AuthService.getUserId()+"&name="+name+"&page=1";
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function getLocationDetailByPlaceId(placeId = ''){
	return new Promise((resolve, reject) => {
		const url = geocodeUrl+"?key=AIzaSyALASmPhIDmvRTBX1hVIk4nacE_gd93qt0&place_id="+placeId;
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function submitPost(data){
	return new Promise((resolve, reject) => {
		axios.post(addPostUrl, data)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}
