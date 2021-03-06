/* eslint-disable import/prefer-default-export */
  
import axios from 'axios';
import {AuthService} from './AuthService';
import { getUserProfileUrl, getUserProfileAlbumUrl, getUserProfileReviewUrl, getUserPostsUrl, getUserTagPostUrl, addReviewUrl, allNotificationUrl, getPremiumRateUrl} from '../public/endpoins';

export const UserService = {
	getUserProfileData,
	getUserProfileAlbum,
	getUserProfileReview,
	getUserPost,
	getUserTagPost,
	addReview,
	getNotifications,
	getPremiumRate
};

function getUserProfileData(id) { 
 return new Promise((resolve, reject) =>{
 		const url =  getUserProfileUrl+"?user_id="+AuthService.getUserId()+'&user_profile_id='+id;
        axios.get(url)
		.then((res) => {
		 	resolve(res);
		})
		.catch((error) => {
            reject(error);
		});
	});
}

function getUserProfileAlbum(id) {
	return new Promise((resolve, reject) => {
		const url = getUserProfileAlbumUrl+"?user_id="+AuthService.getUserId()+'&user_profile_id='+id;
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function getUserProfileReview(id) {
	return new Promise(((resolve, reject) => {
		const url = getUserProfileReviewUrl+"?user_id="+AuthService.getUserId()+'&user_profile_id='+id;
		axios.get(url)
		.then((res) => {
			resolve(res)
		})
		.catch((error) => {
			reject(error);
		})
	}))
}

function getUserPost(id) {
	return new Promise((resolve, reject) => {
		const url = getUserPostsUrl+"?user_id="+AuthService.getUserId()+"&user_profile_id="+id;
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function getUserTagPost(id) {
	return new Promise((resolve, reject) => {
		const url = getUserTagPostUrl+"?user_id="+AuthService.getUserId()+"&user_profile_id="+id;
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error)
		})
	})
}

function addReview(params) {
	return new Promise((resolve, reject) => {
		axios.post(addReviewUrl, params)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function getNotifications() {
	return new Promise((resolve, reject) => {
		const url = allNotificationUrl+'?user_id='+AuthService.getUserId();
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function getPremiumRate() {
	return new Promise((resolve, reject) => {
		const url = getPremiumRateUrl+'?user_id='+AuthService.getUserId();
		axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}