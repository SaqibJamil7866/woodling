/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { AuthService } from './AuthService';
import { getAllTalentsUrl, getFeaturedTalentUrl, searchTalentUrl, getTalentDetailsUrl,
    getStarredTalentsUrl, starTalentUrl, unstartTalentUrl, getStarredNotesUrl, addStarredNotesUrl, getSearchTalentsUrl } from '../public/endpoins';

    export const TalentService = {
        getAllTalents, getStarredTalents, getFeaturedTalents, starTalent, unstarTalent, searchTalent,
        getStarredTalentNotes, addStarredTalentNotes, getSearchedTalents
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

    function getSearchedTalents(data) { 
        return new Promise((resolve, reject) =>{
            axios.get(getSearchTalentsUrl+'?talent='+data.talent+'&min_age='+data.min_age+'&max_age='+data.max_age+'&gender='+data.gender)
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

    function getStarredTalentNotes(data) { 
        return new Promise((resolve, reject) =>{
            axios.get(getStarredNotesUrl+'?user_id='+AuthService.getUserId()+"&starred_user_id="+data.id)
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }

    function addStarredTalentNotes(params) { 
        return new Promise((resolve, reject) =>{
            axios.post(addStarredNotesUrl, params)
            .then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);        
            });
        });
    }