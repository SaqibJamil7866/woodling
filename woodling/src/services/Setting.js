import axios from 'axios';
import {AuthService} from './AuthService';
import { getUserProfileUrl, postupdateProfileUrl, postProfileImageUrl, getSettingProfileUrl, getIndividualSkillsUrl, getGendersUrl } from '../public/endpoins';

export const SettingService = {
    myData, postCover, postProfile, getSkills, getGenders, addExperience, UpdateUserDetail, getSettingProfile
}; 

function myData() {
    return new Promise((resolve, reject) => {
        const url = getUserProfileUrl+"?user_id="+AuthService.getUserId()+"&user_profile_id="+AuthService.getUserId();
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function postCover(params) {
    return new Promise((resolve, reject) => {
        axios.post(postupdateProfileUrl, params)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function postProfile(params) {
    return new Promise((resolve, reject) => {
        axios.post(postupdateProfileUrl, params)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

function getSkills() {
    return new Promise((resolve, reject) => {
        axios.get(getIndividualSkillsUrl)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

function getGenders() {
    return new Promise((resolve, reject) => {
        axios.get(getGendersUrl)        
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function addExperience(params) {
    return new Promise((resolve, reject) => {
        axios.post(postupdateProfileUrl, params)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function UpdateUserDetail(params) {
    console.log(params)
    return new Promise((resolve, reject) => {
        axios.post(postupdateProfileUrl, params)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getSettingProfile() {
    return new Promise((resolve, reject) => {
        const url = getSettingProfileUrl+"?user_id="+AuthService.getUserId();
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}