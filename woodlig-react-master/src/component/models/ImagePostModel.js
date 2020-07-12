import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router'; 
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

import  {ValidationHelper} from '../../helper/ValidationHelper';
import  {SkillServices} from '../../services/SkillServices'; 
import {AuthServices} from '../../services/AuthServices'; 
import {PostService} from '../../services/PostService'; 
import {Config} from '../../services/Config'; 
import FileUploadComponent from '../FileUploadComponent'; 
import TagePeopleComponent from '../TagePeopleComponent'; 
import LocationSearch from '../LocationSearch'; 
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 const { Option } = Select;
class ImagePostModel extends React.Component {
  constructor(props) {
      super(props); 
      this.state = { 
          userProfile: [],
          followings: [],
          selectedOption:'',
          file: '',
          imagePreviewUrl: [],
          selectedFile: [],
          title:'',
          caption:'',
          latitude:'',
          longitude:'',
          formatted_address:'',
          country:'',
          state:'',
          city:'',
          fileMessage:'',
          sizeMessage:'',
          imageValidation:'',

      }; 
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.reciveImageCallBack = this.reciveImageCallBack.bind(this);
      this.callBackPlaceSelected = this.callBackPlaceSelected.bind(this);
  }
  handleTextChange(e){
    const { name, value } = e.target;
    this.setState({ [name]: value });
  } 
  componentDidMount() {  
       
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
 
  handleSubmit(e) {
    e.preventDefault();
    var tagedUser = '';
      for (var i = 0; i < this.state.selectedOption.length; i++) { 
        if(i == 0){
          tagedUser = this.state.selectedOption[i].value;
        }else{
          tagedUser += ","+this.state.selectedOption[i].value;
        } 
     } 
    const formData = new FormData();  
    formData.append('user_id', AuthServices.getUserId());  
    formData.append('caption', this.state.caption);  
    formData.append('post_tagged_users', tagedUser);  
    formData.append('type', 'photo');  
    formData.append('privacy', 'public');  
    formData.append('lat', 'public');  
    formData.append('lng', 'public');  
    formData.append('formatted_address', 'junagadh');  
    formData.append('city', 'junagadh');  
    formData.append('country', 'junagadh');  
    
    for (var i = 0; i < this.state.selectedFile.length; i++) {
        formData.append('photo_'+i, this.state.selectedFile[i]);  
    }
   // this.props.onCancel('success');
    PostService.addPost(formData).then(async (result) => {  
      var responce = result.data;  
         if(result.data.status == 'success'){ 
            this.props.onCancel('success');
            toast.success(result.data.message,{ autoClose: 15000 });  
          }
         if(result.status == 'error'){
              console.log(result); 
              toast.error(result.message,{ autoClose: 15000 }); 
          } 
    });   
  } 

  reciveImageCallBack(data){ 
      this.setState({ selectedFile:data }); 
    console.log("recivve",data);
  }
  callBackPlaceSelected = ( data ) => {
      //alert(JSON.stringify(data.address)); 
        this.setState({
          latitude:data.mapPosition.lat,
          longitude:data.mapPosition.lng, 
          formatted_address:data.address, 
          country:data.country, 
          state:data.state, 
          city:data.city, 
        }); 
  };      
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
               <form role="form" onSubmit={this.handleSubmit}>
                      <div className="modal-body">
                          <div className="update_user_profile"> 
                              <img src={Config.SITE_URL+""+AuthServices.getUserData().profile_picture} alt="" />
                              <p>@{AuthServices.getUserData().username}</p>
                          </div>

                          <div className="status_update_details">
                                  <FileUploadComponent  uploadType="image" mxsize="2" sendCallBack={this.reciveImageCallBack}/>  
                                  <div className="form-group add-caption mb-3">
                                      <h2>Add Caption</h2>
                                      <input type="text" className="form-control caption" name="caption" placeholder="Write Something..." onChange={this.handleTextChange}/>
                                  </div>
                                  <div className="custom-group custom-group-tage-people mb-3">
                                      <div className="input-group-prepend">
                                          <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i>Tag People</span>
                                      </div>
                                       <TagePeopleComponent/>
                                        <span className="input-group-text hastage" id="basic-addon1">#</span>
                                  </div>
                                  <div className="custom-group custom-group-search-location mb-3">
                                      <div className="input-group-prepend">
                                          <span className="input-group-text" id="basic-addon1"><i className="fas fa-map-marker-alt"></i>Add Location</span>
                                      </div> 
                                      <LocationSearch callBackPlaceSelected = {this.callBackPlaceSelected}/> 
                                  </div>  
                          </div>
                      </div>
                      <div className="modal-footer">
                          <button  className="Woodlig_btn post">Post</button>
                      </div>
                      </form>
      );
  }
}
 
export default ImagePostModel
