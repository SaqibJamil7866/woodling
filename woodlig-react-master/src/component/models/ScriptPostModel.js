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


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class ScriptPostModel extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            userProfile: [],
            followings: [],
            selectedOption:'',
            file: '',
            imagePreviewUrl: []

        };
      
        this.handleImageChange = this.handleImageChange.bind(this);
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
                <div className="modal fade post-script" id="postScriptModal" tabindex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header"> 
                        <h5 className="modal-title" id="exampleModalLabel">Script</h5>
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
                            <div className="post-script-form">  
                                    <div className="form-group mb-3 add-caption">
                                      <h2>Script Title</h2>
                                      <input type="text" class="form-control caption" name="title" placeholder="Write the title of your script here...." /> 
                                    </div> 
                                    <div class="input-group mb-3 add-caption">
                                      <h2>Script Synopsis By:</h2>
                                       <input type="text" class="form-control caption" placeholder="Write here..." />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i>Tag People</span>
                                        </div>
                                         <Select options={this.state.followings} isMulti value={this.state.selectedOption} className="form-control teg_people" onChange={this.handleChange} />
                                          <span className="input-group-text hastage" id="basic-addon1">#</span>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-map-marker-alt"></i>Add Location</span>
                                        </div>
                                        <input type="text" className="form-control add_location" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
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
 
export default ScriptPostModel
