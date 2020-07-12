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

import { Upload, Icon, message,Modal,Radio } from 'antd';
 function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
} 
const sellOptions = [
  { label: 'Product', value: 'product' },
  { label: 'Services', value: 'services' }, 
];
class SellPostModel extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            userProfile: [],
            followings: [],
            selectedOption:'',
            file: '',
            imagePreviewUrl: [],
               previewVisible: false,
              previewImage: '',
              fileList: [
                 
              ],
              sell_type:'product',
               selectedFile:[]

        }; 
         this.reciveImageCallBack = this.reciveImageCallBack.bind(this);
    }
  
    componentDidMount() {  
         
    }  
 
    handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  onChangeSellType = e => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      sell_type: e.target.value,
    });
  };
   reciveImageCallBack(data){
        if(data.length > 0 ){
          this.setState({ selectedFile:data });
        }else{
          this.setState({ selectedFile:[] });
        }
        
        console.log("recivve",data);
      }  

  handleChange = ({ fileList }) => this.setState({ fileList });
    render() { 
        const { userProfile } = this.state;
        console.log("followingOptions",this.state.followings);
         let {imagePreviewUrl} = this.state;
        let imagePreview = null;
   
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
             <img src={require('../../assets/img/sell-img.png')} alt="Upload Image" className="" style={{'width': '100%','display': 'block' }} />
          </div>
        );
        return (  
                <div className="modal fade post-event" id="postSellModal" tabindex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header"> 
                        <h5 className="modal-title" id="exampleModalLabel">Sell</h5>
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
                            <div className=""> 
                                    <div className="form-group">
                                       <div className="want-to-sall">
                                         <h4>What do you want to sell?</h4>
                                          <div className="pro-ser-btn"> 
                                            <Radio.Group defaultValue={this.state.sell_type}  onChange={this.onChangeSellType}>
                                            <Radio.Button value="product">Product</Radio.Button>
                                            <Radio.Button value="services">Service</Radio.Button> 
                                          </Radio.Group>
                                          </div>
                                        </div>
                                    </div>
                                    <div className="clearfix">
                                        <FileUploadComponent  uploadType="image" mxsize="2" sendCallBack={this.reciveImageCallBack}/>  
                                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                          <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                    </div>
                                    {this.state.sell_type == "product" && 
                                    <div className="sell-product">
                                      <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                          <div className="form-group product_fild">
                                            <label>Product Name</label>
                                            <input type="text" name="product_name" id="product_name" className="form-control input-sm" placeholder="Name of Your Product " />
                                          </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                          <div className="form-group product_type">
                                            <label>Procuct Type</label>
                                            <select name="product">
                                              <option value="product_type">choose type</option>
                                              <option value="abc">ABC</option>
                                              <option value="cde">CDE</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                          <div className="looking-to">
                                            <div className="looking-to-title">
                                              <h4>Looking to</h4>
                                            </div>
                                            <div className="form-check-inline">
                                              <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="optradio" />Sell
                                                 <span className="checkmark"></span>
                                              </label>
                                            </div>
                                            <div className="form-check-inline">
                                              <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="optradio" />Rent
                                                 <span className="checkmark"></span>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                          <div className="country-list">
                                            <div className="form-group country_list">
                                              <label>Choose Country</label>
                                              <select className="selectpicker countrypicker" data-flag="true">
                                              <option className="flag-list">
                                                india
                                              </option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-4 col-md-4">
                                          <div className="form-group product_fild">
                                            <label>Price</label>
                                            <input type="text" name="price" id="price" className="form-control input-sm" placeholder="0 " />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    }
                                    {this.state.sell_type == "services" &&
                                      <div className="service-product">
                                        <div className="row">
                                          <div className="col-xs-12 col-sm-6 col-md-6">
                                            <div className="form-group product_fild">
                                              <label>Title</label>
                                              <input type="text" name="title" className="form-control input-sm" placeholder="Title of your services" />
                                            </div>
                                          </div>
                                          <div className="col-xs-12 col-sm-6 col-md-6">
                                            <div className="form-group product_type">
                                              <label>Procuct Type</label>
                                              <select name="product">
                                                <option value="product_type">choose type</option>
                                                <option value="abc">ABC</option>
                                                <option value="cde">CDE</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row"> 
                                          <div className="col-xs-12 col-sm-4 col-md-4">
                                            <div className="country-list">
                                              <div className="form-group country_list">
                                                <label>Choose Country</label>
                                                <select className="selectpicker countrypicker" data-flag="true">
                                                <option className="flag-list">
                                                  india
                                                </option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-xs-12 col-sm-4 col-md-5">
                                            <div className="form-group product_fild">
                                              <label>Coust of service</label>
                                              <input type="text" name="price" id="price" className="form-control input-sm" placeholder="0 " />
                                            </div>
                                          </div>
                                            <div className="col-xs-12 col-sm-4 col-md-3">
                                            <div className="form-group product_fild">
                                                <input type="checkbox" name="negotiable" />Negotiable
                                            </div>
                                        </div>
                                        </div>   
                                      </div>  
                                    }  
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-map-marker-alt"></i>Add Location</span>
                                        </div>
                                        <input type="text" className="form-control add_location" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div> 
                                    <div className="form-group">
                                        <h4 class="event-description">Description</h4>
                                        <textarea className="form-control status_update_text" id="exampleFormControlTextarea1" rows="3" placeholder="Say Something..."></textarea>
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
 
export default SellPostModel
