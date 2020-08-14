import {AuthService} from './AuthService';
import axios from 'axios';
import { getUserProfileUrl, getIndividualSkillsUrl, postupdateProfileUrl, getSettingProfileUrl } from '../public/endpoins';
import { resolve } from 'joi-browser';

export const SettingService = {
    myData, postCover, postProfile, getSkills, addExperience, UpdateUserDetail, getSettingProfile
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