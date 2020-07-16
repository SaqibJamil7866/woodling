/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { AuthService } from './AuthService';
import { getAllTalentsUrl, getFeaturedTalentUrl, searchTalentUrl, getTalentDetailsUrl,
    getStarredTalentsUrl, starTalentUrl, unstartTalentUrl, getStarredNotesUrl, addStarredNotesUrl } from '../public/endpoins';

    export const TalentService = {
        getAllTalents, getStarredTalents, getFeaturedTalents, starTalent, unstarTalent, searchTalent
    };

    function getFeaturedTalents(page) { 
        return new Promise((resolve, reject) =>{
            axios.get(getFeaturedTalentUrl+'?page='+page)
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }
  
    function getAllTalents(page) { 
        return new Promise((resolve, reject) =>{
            axios.get(getAllTalentsUrl+'?page='+page)
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }

    function searchTalent(params) { 
        return new Promise((resolve, reject) =>{
            axios.post(searchTalentUrl, params)
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }

    function starTalent(talentId) { 
        return new Promise((resolve, reject) =>{
            axios.get(starTalentUrl+'?user_id='+AuthService.getUserId()+"&talent_id="+talentId)
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }

    function unstarTalent(talentId) { 
        return new Promise((resolve, reject) =>{
            axios.get(unstartTalentUrl+'?user_id='+AuthService.getUserId()+"&talent_id="+talentId)
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }

    function getStarredTalents() { 
        return new Promise((resolve, reject) =>{
            axios.get(getStarredTalentsUrl+'?user_id='+AuthService.getUserId())
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }