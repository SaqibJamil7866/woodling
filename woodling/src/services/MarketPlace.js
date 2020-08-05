import {AuthService} from './AuthService';
import axios from 'axios';
import { getPopularProductUrl, getFavProductUrl, getMyPostedPostUrl, getPostLikeUrl, getRelatedPostUrl } from '../public/endpoins';

export const MarketPlaceService = {
    getPopularProduct,
    getFavProduct,
    getMyPostedPost,
    getPostLike,
    getRelatedPost
}; 

function getPopularProduct(page, sort) {
    return new Promise((resolve, reject) => {
        const url = getPopularProductUrl+"?page="+page+"&user_id="+AuthService.getUserId()+"&category=products"+"&sort="+sort;
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
		});
    });
}

function getFavProduct() {
    return new Promise((resolve, reject) => {
        const url = getFavProductUrl+"?user_id="+AuthService.getUserId();
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getMyPostedPost() {
    return new Promise((resolve, reject) => {
        const url = getMyPostedPostUrl+"?user_id="+AuthService.getUserId();
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getPostLike(id) {
    return new Promise((resolve, reject) => {
        const url = getPostLikeUrl+"?user_id="+AuthService.getUserId()+"&post_id="+id;
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getRelatedPost(id) {
    return new Promise((resolve, reject) => {
        const url = getRelatedPostUrl+"?user_id="+AuthService.getUserId()+"&product_id="+id;
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}