  
import axios from 'axios';
import {AuthService} from './AuthService';
import getSymbolFromCurrency from 'currency-symbol-map';
import { activityStreamUrl, activityDetailsUrl, getTagUrl, getExploreUsersUrl, getPremiunUsersUrl, 
	getPostTaggedUsersUrl, searchPeopleUrl, geocodeUrl, addPostUrl, getExploreEventUrl, getProductTypeUrl,
	getServiceTypeUrl, postimagesUrl, postProductUrl } from '../public/endpoins';

export const ActivityStreamService = {
   getActivityStreams, getExploreUsers, getPremiumUsers, getActivityDetails, getPostTaggedUsers, searchPeople, 
   getLocationDetailByPlaceId, submitPost, getTags, getExploreEvents, getProductType, getServiceType, 
   submitPicture, submitVideo, submitScript, getCurrencySymbols, submitProduct, searchAllPeople
};

function getCurrencySymbols() { 
	return new Promise((resolve, reject) =>{
		const symbols = [];
		symbols.push(getSymbolFromCurrency('USD')); // => '$'
		symbols.push(getSymbolFromCurrency('NGN'));
		symbols.push(getSymbolFromCurrency('GBP')); // => '£'
		symbols.push(getSymbolFromCurrency('EUR')); // => '€'
		symbols.push(getSymbolFromCurrency('AFN'));
		symbols.push(getSymbolFromCurrency('ALL'));
		symbols.push(getSymbolFromCurrency('DZD'));
		symbols.push(getSymbolFromCurrency('AFN'));
		symbols.push(getSymbolFromCurrency('AOA'));
		symbols.push(getSymbolFromCurrency('XCD'));
		symbols.push(getSymbolFromCurrency('ARS'));
		symbols.push(getSymbolFromCurrency('AMD'));
		symbols.push(getSymbolFromCurrency('AWG'));
		symbols.push(getSymbolFromCurrency('AUD'));
		symbols.push(getSymbolFromCurrency('AZN'));
		symbols.push(getSymbolFromCurrency('BSD'));
		symbols.push(getSymbolFromCurrency('BHD'));
		symbols.push(getSymbolFromCurrency('BDT'));
		symbols.push(getSymbolFromCurrency('BBD'));
		symbols.push(getSymbolFromCurrency('BYN'));
		symbols.push(getSymbolFromCurrency('EUR'));
		symbols.push(getSymbolFromCurrency('BZD'));
		symbols.push(getSymbolFromCurrency('XOF'));
		symbols.push(getSymbolFromCurrency('BMD'));
		symbols.push(getSymbolFromCurrency('BTN'));
		symbols.push(getSymbolFromCurrency('INR'));
		symbols.push(getSymbolFromCurrency('BOB'));
		symbols.push(getSymbolFromCurrency('BOV'));
		symbols.push(getSymbolFromCurrency('BAM'));
		symbols.push(getSymbolFromCurrency('BWP'));
		symbols.push(getSymbolFromCurrency('NOK'));
		symbols.push(getSymbolFromCurrency('BRL'));
		symbols.push(getSymbolFromCurrency('BND'));
		symbols.push(getSymbolFromCurrency('BGN'));
		symbols.push(getSymbolFromCurrency('BIF'));
		resolve(symbols);
	});
}

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

function getExploreEvents(type) {
    return new Promise((resolve, reject) => {
        const url = getExploreEventUrl+"?user_id="+AuthService.getUserId()+"&event_type="+type;
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

function searchAllPeople() {
	return new Promise((resolve, reject) => {
		const url = searchPeopleUrl+"?user_id="+AuthService.getUserId();
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

function getProductType() {
	return new Promise((resolve, reject) => {
		axios.get(getProductTypeUrl)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function getServiceType() {
	return new Promise((resolve, reject) => {
		axios.get(getServiceTypeUrl)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function submitPicture(data) {
	return new Promise((resolve, reject) => {
		axios.post(postimagesUrl, data)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function submitVideo(data) {
	return new Promise((resolve, reject) => {
		axios.post(postimagesUrl, data)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function submitScript(data) {
	return new Promise((resolve, reject) => {
		axios.post(postimagesUrl, data)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}

function submitProduct(data) {
	return new Promise((resolve, reject) => {
		axios.post(postProductUrl, data)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		})
	})
}