/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
import { ToastsStore } from 'react-toasts';

export default function convertToFloat(number){
    let temp = 0;
    if(number){
        temp = parseFloat(number);
    }
    return temp;
}

export function copyToClipboard(txt){
    console.log(txt);
    navigator.clipboard.writeText(txt);
    ToastsStore.success("Copied to clipboard.");
}

export function getLocation(){

    return new Promise((resolve, reject) =>{
        let result;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                result = { data: [{latitude: position.coords.latitude, longitude: position.coords.longitude}], msg:"Location position get successfully" }
                resolve(result);
            });
        } else { 
            result = { data:[], msg:"Geolocation is not supported/allowed by this browser."};
            reject(result)
        }
	});
}

export function getParamString(params){
    let paramString = '';
    if(params){
        for(const p in params){
            if(paramString == ''){
                paramString += '?';
            }else{
                paramString += '&';
            }
            paramString += p+'='+ params[p];
        }
    }
    return paramString;
}