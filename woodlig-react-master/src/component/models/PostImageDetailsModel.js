import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Modal, Button } from 'antd';

import  {ValidationHelper} from '../../helper/ValidationHelper';
import  {SkillServices} from '../../services/SkillServices'; 
import {AuthServices} from '../../services/AuthServices'; 
import FileUploadComponent from '../FileUploadComponent'; 
import PostImageDetailsComponent from '../PostImageDetailsComponent'; 


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
class PostImageDetailsModel extends React.Component {
  constructor(props) {
      super(props); 
      this.state = { 
          visible: this.props.showModal,
          activityType: this.props.activityType,
          activityData: this.props.activityData,
      }; 
      
  }
  
  componentDidMount() {  
      
  }  
  handleOk = e => {
     
    this.setState({
      visible: false,
    });
    this.props.sendCallBackCloseModel();
  };

  handleCancel = e => {
   
    this.setState({
      visible: false,
    });
     this.props.sendCallBackCloseModel();
  };   
  render() {  
      return (  <Modal 
                    visible={this.state.visible} 
                    footer={null}
                    onCancel={this.handleCancel}
                  > 
                   <PostImageDetailsComponent activityData={this.state.activityData}/>
                </Modal> 
      );
  }
}
 
export default PostImageDetailsModel
