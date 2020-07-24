  
import { getUserFollowingUrl, getUserFollowersUrl } from '../public/endpoins';
import {AuthService} from './AuthService';
import axios from 'axios';

export const FollowService = {
   getUSerFollowings,getUSerFollowiers 
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
function getUSerFollowiers() { 
 return new Promise((resolve, reject) =>{
 		var url = getUserFollowersUrl+"?user_id="+AuthService.getUserId();
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
	});
} 
 