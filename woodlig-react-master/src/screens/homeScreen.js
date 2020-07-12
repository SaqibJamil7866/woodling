import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';   
import PostActionComponent from '../component/PostActionComponent';  
import ActivityStremComponent from '../component/ActivityStremComponent';  
import ExploreConnected from '../component/ExploreConnected';  
import SimplePostModel from '../component/models/SimplePostModel';  
import ImagePostModel from '../component/models/ImagePostModel';  
import VideoPostModel from '../component/models/VideoPostModel';  
import ScriptPostModel from '../component/models/ScriptPostModel';  
import EventPostModel from '../component/models/EventPostModel';  
import SellPostModel from '../component/models/SellPostModel';   
import { Modal, Button } from 'antd';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends React.Component {
   
    constructor(props){  
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            homeSliders:[],
            sliderLoad:true,
            homeData:[],
            homeDataLoad:true,
            modelType:'',
            visible: false,
            listReload:false
        }  
        this.callBackOpenModel = this.callBackOpenModel.bind(this);
        this.callBackPostCreate = this.callBackPostCreate.bind(this);
    } 
    showModal = () => {
        this.setState({
          visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };

    handleCancel = e => {
         
        this.setState({
          visible: false,
        });
    };
    callBackPostCreate(status){ 
        this.setState({
          visible: false,
          listReload:true,
        });
       // toast.success("Post Created successfully.")
    } 

    componentDidMount() {  
       /*<SimplePostModel />  
<ImagePostModel />  
<VideoPostModel />  
<ScriptPostModel />  
<EventPostModel />  
<SellPostModel />   */

    } 
    callBackOpenModel(modelType){
        this.setState({ modelType:modelType,visible:true }); 
        console.log(modelType);
    }     
    render() { 
        return (
             <div className="page">
                <ToastContainer/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-8 col-sm-8 col-md-8">
                            <div className="story-all">
                                <PostActionComponent callBackOpenModel={this.callBackOpenModel} />
                               
                                <ActivityStremComponent listReload={this.state.listReload} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <div className="side-bar">
                                <div className="virtul_reality">
                                    <div className="flag"></div>
                                    <div className="virtul_reality-title">
                                        <h2 className="text-center">Virtul Reality</h2>
                                    </div>
                                    <div className="virtul_reality-image">
                                        <img src={require('../assets/img/virtual-reality.png')} alt="" />
                                    </div>
                                </div>
                                <div className="active_user">
                                    <div className="user-online">
                                        <div className="active-circle">
                                            <a href="">
                                                <p>Active in Circle</p>
                                                <i className="fas fa-chevron-right"></i>
                                            </a>
                                        </div>
                                    <ul>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                            
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                            
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                           
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                            
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                            
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                            
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                            
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ring-container">
                                            <img src={require('../assets/img/img_avatar.png')} alt="user" className="online-user" />
                                            
                                            <div className="circle"></div>
                                            </div>
                                        </li>
                                    </ul>                               
                                                                        
                                    </div>
                                </div>
                                <div className="expoler-user-side">
                                    <div className="active-circle">
                                        <p>Explore get connected</p>
                                    </div>
                                    {/* <ExploreConnected/>  */}
                                    <div className="explore-see-more">
                                        <a href="#">SEE MORE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <Modal
                  title="Basic Modal"
                  visible={this.state.visible} 
                  onCancel={this.handleCancel}
                  footer={null}
                > 
                { this.state.modelType == 'image_post' && <ImagePostModel uploadType="photo" onCancel={this.callBackPostCreate}/>   }
                { this.state.modelType == 'video_post' && <VideoPostModel uploadType="video" />    }
                
                </Modal>  
             </div>
        );
    }
} 
export default HomePage

