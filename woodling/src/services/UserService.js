/* eslint-disable import/prefer-default-export */
  
import axios from 'axios';
import {AuthService} from './AuthService';
import { getUserProfileUrl, getUserProfileAlbumUrl, getUserProfileReviewUrl} from '../public/endpoins';

export const UserService = {
	getUserProfileData,
	getUserProfileAlbum,
	getUserProfileReview,
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