  
import {Config} from './Config';
import {ApiSlug} from './ApiSlug';
import {AuthServices} from './AuthServices';
export const promotionService = {
   fetchPromotionInsights,updatePromotionStatus
}; 
function fetchPromotionInsights(type) { 
 return new Promise((resolve, reject) =>{
 		 
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.PROMOTION_INSIGHTS+"?promotion_id=35&user_id=1";
 		// var URL =  "http://woodlig.webbions.com/controllers/mobile/fetch-promotion-insights.php?promotion_id=35&user_id=1";
 		 
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
function updatePromotionStatus(type) { 
 return new Promise((resolve, reject) =>{
 		var URL =  Config.API_BASEURL+"/"+ApiSlug.PROMOTION_STATUS_UPDATE+"?"+type;
 		 
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