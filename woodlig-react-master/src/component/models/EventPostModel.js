import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import  {ValidationHelper} from '../../helper/ValidationHelper';
import  {SkillServices} from '../../services/SkillServices'; 
import {AuthServices} from '../../services/AuthServices'; 
import FileUploadComponent from '../FileUploadComponent'; 


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
  

import { TimePicker,DatePicker } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
 
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
class EventPostModel extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            userProfile: [],
            followings: [],
            selectedOption:'',
            file: '',
            imagePreviewUrl: [],
            selectedFile:[]

        };
      
        this.handleImageChange = this.handleImageChange.bind(this);
         this.reciveImageCallBack = this.reciveImageCallBack.bind(this);
    }
    handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    var preivew = this.state.imagePreviewUrl;
    reader.onloadend = () => {
        preivew.push({"url":reader.result});
      this.setState({
        file: file,
        imagePreviewUrl:preivew
      });
    }

    reader.readAsDataURL(file)
  }
    componentDidMount() {  
        try{   
            AuthServices.getUSerProfile().then(async (result) => {
               if(result.status == 'success'){
                //localStorage.setItem('user', JSON.stringify(result));
                     this.setState({ userProfile:result.data });  

                    console.log(result);
                  }else {
                      console.log(result); 
                    toast.error(result.message,{ autoClose: 15000 }); 
                  } 
            });
            AuthServices.getUSerFollowings().then(async (result) => {
               if(result.status == 'success'){
                //localStorage.setItem('user', JSON.stringify(result));
                    var data = result.data;
                    var followingOptions = [];
                    data.map(function(following){
                        var temp = {
                             value:following.id,
                             label:"@"+following.username               
                        };
                        followingOptions.push(temp);
                    }); 
                     this.setState({ followings:followingOptions });  

                    console.log(result);
                  }else {
                      console.log(result); 
                    toast.error(result.message,{ autoClose: 15000 }); 
                  } 
            }); 
        
          }catch(e){
               console.log('error', e);
        } 
    }  
    handleClick(action){ 
        this.props.callBackOpenModel(action);   
    } 
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  handleRemoveImage(image){
      // const { name, value } = e.target; 
        var imageList = this.state.imagePreviewUrl;
        imageList.pop(image); 
        this.setState({   
          imagePreviewUrl: imageList, 
        });
         
        
    }
    reciveImageCallBack(data){
        if(data.length > 0 ){
          this.setState({ selectedFile:data });
        }else{
          this.setState({ selectedFile:[] });
        }
        
        console.log("recivve",data);
      }  


onChangeTime(time, timeString) {
  console.log(time, timeString);
}
onChangeDate(date, dateString) {
  console.log(date, dateString);
}
    render() { 
        const { userProfile } = this.state;
        console.log("followingOptions",this.state.followings);
         let {imagePreviewUrl} = this.state;
    let imagePreview = null;
   /* if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }*/
    imagePreview = imagePreviewUrl.map((prev,index)=>{
        return <div className="prev-img">
                <div className="remove-image" onClick={this.handleRemoveImage.bind(this,prev)}><i className="fas fa-times"></i></div>
                  <img src={prev.url} style={{'width':'100px'}}/>
               </div>;
    }); 

        return (  
                <div className="modal fade post-event" id="postEventModal" tabindex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header"> 
                        <h5 className="modal-title" id="exampleModalLabel">Event</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> 
                      </div>
                       <form role="form" method="post">
                        <div className="modal-body">
                            <div className="update_user_profile"> 
                                <img src={'https://woodlig.000webhostapp.com/'+userProfile.cover_picture} alt="" />
                                <p>@{userProfile.username}</p>
                            </div>
                            <div className="post-event-form"> 
                                    <div className="form-group mb-3 add-caption">
                                        <h2>Name Of Event</h2>
                                        <input type="text" name="title" className="form-control caption" placeholder="Write Event Name here...."/>
                                    </div>
                                    <div class="form-group mb-3 event_type_list">
                                      <h4>Event Type(choose one)</h4>
                                      <ul id="list-event">
                                        <li>
                                          <a id="share-link" class="" href="#">Share</a>
                                        </li>
                                        <li>
                                          <a id="concert-link" href="#">Concert</a>
                                        </li>
                                        <li>
                                          <a id="drama-link" href="#">Drama</a>
                                        </li>
                                        <li>
                                          <a id="party-link" href="#">Party</a>
                                        </li>
                                      </ul> 
                                    </div>
                                    <div className="form-group">
                                    <h4 className="event-description">Description</h4>
                                    <textarea className="form-control status_update_text"  rows="3" placeholder="write Description here (130 character)"></textarea>
                                  </div> 
                                    <div className="form-group">
                                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={this.onChangeDate} />
                                   <TimePicker onChange={this.onChangeTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />  
                                  </div>
                                  <div className="form-group">
                                    <FileUploadComponent  uploadType="image" mxsize="2" sendCallBack={this.reciveImageCallBack}/>  
                                  </div>  
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button  className="Woodlig_btn post">Post</button>
                        </div>
                        </form>
                    </div>
                  </div>
                </div>  
        );
    }
}
 
export default EventPostModel
