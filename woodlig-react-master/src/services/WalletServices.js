  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
export const WalletServices = {
   userBalance, getWalletHistory, AddAmount   
}; 
function userBalance(type) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_USER_BALANCE+"?user_id="+2;
 		 
		fetch(URL, {
			method: 'GET',
			headers: { 'Content-Type': 'text/plain',
			'Authorization': 'Bearer '+AuthServices.getToken()
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
function getWalletHistory(type) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.FETCH_WALLET_HISTORY+"?user_id="+2;
 		 
		fetch(URL, {
			method: 'GET',
			headers: { 'Content-Type': 'text/plain',
			'Authorization': 'Bearer '+AuthServices.getToken()
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

function AddAmount(data) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.ADD_AMOUNT_WALLET+"?user_id="+2+"&amount="+20+"&payment_method=paypal";
 		 
		fetch(URL, {
			method: 'GET',
			headers: { 'Content-Type': 'text/plain',
			'Authorization': 'Bearer '+AuthServices.getToken()
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