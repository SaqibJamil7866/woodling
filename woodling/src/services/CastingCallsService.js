/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { AuthService } from './AuthService';
import { getParamString } from '../public/helperFunctions';
import { getAllCastingCallUrl, getUserPostedJobsUrl, getUserAppliedJobsUrl, getCastingCallDetailsUrl,
    applyCastingCallUrl, getLocationUrl, roleTypeUrl, getProductionTypeUrl } from '../public/endpoins';

export const CastingCallService = {
    getAllCastingCalls, getFilterCastingCallUrl, getProductionType, getUserPostedJobsCalls, getUserAppliedJobsCalls, getCastingCallDetails, applyCastingCall, getLocation, getRoleType
}; 

function getLocation(location) {
    return new Promise((resolve, reject) => {
         axios.get(getLocationUrl+'?key=AIzaSyALASmPhIDmvRTBX1hVIk4nacE_gd93qt0&input='+location)
         .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
    })
}

function getAllCastingCalls(page){

    const data = {user_id: AuthService.getUserId(), page}
    const queryParams = getParamString(data);
    
    return new Promise((resolve, reject) =>{
        axios.get(getAllCastingCallUrl+queryParams)
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}

function getFilterCastingCallUrl(page, params){
    let queryParams = '';

    if(params){
        params.user_id = AuthService.getUserId();
        params.page = page;
        queryParams = getParamString(params);
    }
    
    return new Promise((resolve, reject) =>{
        axios.get(getAllCastingCallUrl+queryParams)
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}

function getUserPostedJobsCalls() { 
    return new Promise((resolve, reject) =>{
        axios.get(getUserPostedJobsUrl+'?user_id='+AuthService.getUserId())
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}

function getUserAppliedJobsCalls() { 
    return new Promise((resolve, reject) =>{
        axios.get(getUserAppliedJobsUrl+'?user_id='+AuthService.getUserId())
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}

function getCastingCallDetails(data) {
    return new Promise((resolve, reject) =>{
        axios.get(getCastingCallDetailsUrl+'?user_id='+AuthService.getUserId()+'&id='+data.id)
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}

function applyCastingCall(data){
    return new Promise((resolve, reject) =>{
        axios.post(applyCastingCallUrl, data)
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}

function getRoleType() {
    return new Promise((resolve, reject) => {
        axios.get(roleTypeUrl)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e)
        })
    })
}

function getProductionType() {
    return new Promise((resolve, reject) => {
        axios.get(getProductionTypeUrl)
        .then(res => {
            resolve(res);
        }).catch(e => {
            reject(e)
        })
    })
}