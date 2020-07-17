/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { AuthService } from './AuthService';
import { getAllCastingCallUrl } from '../public/endpoins';

export const CastingCallService = {
    getAllCastingCalls 
}; 

function getAllCastingCalls(page) { 
    return new Promise((resolve, reject) =>{
        axios.get(getAllCastingCallUrl+'?user_id='+AuthService.getUserId()+'&page='+page)
        .then(res => {
            resolve(res);
          }).catch(e => {
            reject(e);        
        });
	});
}