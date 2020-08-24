import axios from 'axios';
import {AuthService} from './AuthService';
import { getEverythingUrl, getPostUrl, getPeopleUrl, getEventsUrl, getCastingCallUrl, getTagUrl, getPlaceUrl, getProductUrl, getTagPostUrl } from '../public/endpoins';

export const SearchService = {
    getEverything, getPost, getPeople, getEvent, getTags, getPlaces, getCastingCall, getProduct, getServices,
    getTagPosts
}; 

function getEverything(page, search) {
    return new Promise((resolve, reject) => {
        const url = getEverythingUrl+"?page="+page+"&user_id="+AuthService.getUserId()+"&search_keyword="+search;
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getPost(page, search) {
    return new Promise((resolve, reject) => {
        const url = getPostUrl+"?page="+page+"&user_id="+AuthService.getUserId()+"&search_keyword="+search;
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getPeople(page, name) {
    return new Promise((resolve, reject) => {
        const url = getPeopleUrl+"?page="+page+"&user_id="+AuthService.getUserId()+"&name="+name;
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getEvent(page, search) {
    return new Promise((resolve, reject) => {
        const url = getEventsUrl+"?page="+page+"&user_id="+AuthService.getUserId()+"&search_keyword="+search;
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getProduct(page, search) {
    return new Promise((resolve, reject) => {
        const url  = getProductUrl+"?page="+page+"&user_id="+AuthService.getUserId()+"&name="+search+"&category=products";
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getServices(page, search) {
    return new Promise((resolve, reject) => {
        const url = getProductUrl+"?page="+page+"&user_id="+AuthService.getUserId()+"&name="+search+"&category=services";
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getCastingCall(search, page) {
    return new Promise((resolve, reject) => {
        const url = getCastingCallUrl+"?user_id="+AuthService.getUserId()+"&casting_call="+search+"&page="+page;
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getTags(search) {
    return new Promise((resolve, reject) => {
        const url = getTagUrl+"?keyword="+search;
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getTagPosts(tag_id, page) {
    return new Promise((resolve, reject) => {
        const url = getTagPostUrl+"?tag_id="+tag_id+"&page="+page+"&user_id="+AuthService.getUserId();
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getPlaces(search) {
    return new Promise((resolve, reject) => {
        const url = getPlaceUrl+"?place="+search+"&user_id="+AuthService.getUserId();
        axios(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}