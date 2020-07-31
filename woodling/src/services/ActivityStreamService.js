  
import axios from 'axios';
import {AuthService} from './AuthService';
import { activityStreamUrl, activityDetailsUrl, getPostTaggedUsersUrl, getTagPeopleUrl } from '../public/endpoins';

export const ActivityStreamService = {
   getActivityStreams, getActivityDetails, getPostTaggedUsers, getTagPeople 
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

function getTagPeople() {
	return new Promise((resolve, reject) => {
		const url = getTagPeopleUrl+"?user_id="+AuthService.getUserId();
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}
