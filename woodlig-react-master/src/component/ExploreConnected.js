import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Modal, Button } from 'antd'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {FollowingService} from '../services/FollowingService';   
import { Carousel, Radio } from 'antd';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
 
class ExploreConnected extends React.Component {
  constructor(props) {
      super(props); 
      this.state = {  
          followings: [] 
      }; 
      
  } 
  componentDidMount() {   
       try{  
          FollowingService.getUSerFollowiers().then(async (result) => {
             if(result.status){ 
                  
                    this.setState(
                      {followings: result.data}
                    );
                 
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              ;
      } 
  } 
    
  render() {  
    const {followings} = this.state; 
    var taggedUsers = ''; 
      taggedUsers = followings.map((tuser,index)=>{  
                    return <div className="explore-user-profile">
		                    <img src={require('../assets/img/img_avatar.png')} alt="user" className="explore-user" />
		                    <div className="user-name-follow">
		                        <p className="explore-user-name">{tuser.full_name}</p>
		                        <span>follow you</span>
		                    </div>
		                    <button href="" className="explore-follow-btn">follow</button>
		                </div>;
      });         
      return (<div className="explore-side">
      			 {taggedUsers}	
      		  </div>	
      		 );
  }
}
 
export default ExploreConnected
