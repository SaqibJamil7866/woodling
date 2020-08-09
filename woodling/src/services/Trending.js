import axios from 'axios';
import { AuthService } from './AuthService';
import { getTrendingBonAppetitUrl, getTrendingTagsUrl } from '../public/endpoins';

export const TrendingService = {
    getTrendingBonAppetit, getTrendingTags
};

function getTrendingBonAppetit(page) {
    return new Promise((resolve, reject) => {
        const url = getTrendingBonAppetitUrl+"?user_id="+AuthService.getUserId()+"&page="+page;
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function getTrendingTags() {
    return new Promise((resolve, reject) => {
        const url = getTrendingTagsUrl+"?user_id="+AuthService.getUserId();
        axios.get(url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}