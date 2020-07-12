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
 
class ImagePostModel extends React.Component {
  constructor(props) {
      super(props); 
      this.state = { 
          userProfile: [],
          followings: [],
          selectedOption:'',
          file: '',
          imagePreviewUrl: [],
          title:'',
          description:'',
          fileMessage:'',
          sizeMessage:'',
          imageValidation:'',

      };
    
      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(e){
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleImageChange(e) {
    e.preventDefault();
     var validation = false;
     var fileMessage = '';
     var sizeMessage = '';
    let reader = new FileReader();
    let file = e.target.files[0];
     
    var preivew = this.state.imagePreviewUrl;
     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      fileMessage ='You can only upload JPG/PNG file!';
      validation = true;

    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      sizeMessage = 'Image must smaller than 2MB!';
      validation = true;
    }
    this.setState({
            file: file,
            fileMessage:fileMessage,
            sizeMessage:sizeMessage,
            imageValidation:validation,
          });
    if(!validation){
    reader.onloadend = () => {
        preivew.push({"url":reader.result});
          this.setState({
            file: file,
            imagePreviewUrl:preivew
          });
        }
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
  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append('images', this.state.imagePreviewUrl[0].url);
    formData.append('description', this.state.description);
    formData.append('selectedOption', this.state.description);
    formData.append('chat_image', this.state.imagePreviewUrl[0].url);
    formData.append('user_id', 1);

    alert(this.state.imagePreviewUrl[0].url);
    fetch('http://woodlig.webbions.com/controllers/mobile/upload-chat-image.php', {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
    .then((response) => { 

      console.log( response );
      
    });
    console.log(formData);
  }       
  render() { 
      const { userProfile } = this.state; 
      let {imagePreviewUrl} = this.state;
      let imagePreview = null; 
      imagePreview = imagePreviewUrl.map((prev,index)=>{
          return <div className="prev-img">
                  <div className="remove-image" onClick={this.handleRemoveImage.bind(this,prev)}><i className="fas fa-times"></i></div>
                    <img src={prev.url} style={{'width':'100px'}}/>
                 </div>;
      }); 

      return (  
              <div className="modal fade posrt-status-update" id="postImageModal" tabindex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header"> 
                      <h5 className="modal-title" id="exampleModalLabel">Image</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button> 
                    </div>
                     <form role="form" onSubmit={this.handleSubmit}>
                      <div className="modal-body">
                          <div className="update_user_profile"> 
                              <img src={'https://woodlig.000webhostapp.com/'+userProfile.cover_picture} alt="" />
                              <p>@{userProfile.username}</p>
                          </div>

                          <div className="status_update_details">
                                  <FileUploadComponent />
                                  { imagePreviewUrl.length == 0 && 
                                    <div className="form-group">
                                       <img src={require('../../assets/img/upload-img.png')} alt="Upload Image" className="" style={{'width': '40%','margin': 'auto','display': 'block' }} />
                                    </div>
                                  }
                                  <div className="form-group">
                                    {imagePreview}
                                  </div> 
                                  <div className="form-group">
                                      {this.state.imageValidation &&
                                        <div>
                                            <p>{this.state.sizeMessage}</p>
                                            <p>{this.state.fileMessage}</p>
                                        </div>  
                                      }
                                      <input type="file" multiple className="inputfile inputfile-1" onChange={this.handleImageChange}/>
                                      <label for="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> <span>Choose a file…</span></label>
                                  </div> 
                                  <div className="form-group">
                                  <fileUpload/> 
                                  </div>
                                  <div className="form-group add-caption mb-3">
                                      <h2>Add Caption</h2>
                                      <input type="text" className="form-control caption" name="description" placeholder="Write Something..." onChange={this.handleTextChange}/>
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
 
export default ImagePostModel
