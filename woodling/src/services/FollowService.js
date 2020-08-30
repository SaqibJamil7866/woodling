import axios from 'axios'; 
import { getUserFollowingUrl, getUserFollowersUrl, followUserUrl, unfollowUserUrl  } from '../public/endpoins';
import {AuthService} from './AuthService';

export const FollowService = {
   getUSerFollowings, getUSerFollowiers, followUser, unfollowUser
}; 
function getUSerFollowings(id) { 
    if(id){
        return new Promise((resolve, reject) =>{	 
            const url = getUserFollowingUrl+"?user_id="+id;
            axios.get(url)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }else {
        return new Promise((resolve, reject) =>{	 
            const url = getUserFollowingUrl+"?user_id="+AuthService.getUserId();
            axios.get(url)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

function getUSerFollowiers(id) { 
    if(id){
        return new Promise((resolve, reject) =>{	 
            const url = getUserFollowersUrl+"?user_id="+id;
            axios.get(url)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }else {
        return new Promise((resolve, reject) =>{	 
            const url = getUserFollowersUrl+"?user_id="+AuthService.getUserId();
            axios.get(url)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

function followUser(params) { 
    return new Promise((resolve, reject) =>{	 
        axios.post(followUserUrl, params)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function unfollowUser(params) { 
    return new Promise((resolve, reject) =>{	 
        axios.post(unfollowUserUrl, params)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
 