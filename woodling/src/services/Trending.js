import axios from 'axios';
import { AuthService } from './AuthService';
import { getTrendingBonAppetitUrl } from '../public/endpoins';

export const TrendingService = {
    getTrendingBonAppetit
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