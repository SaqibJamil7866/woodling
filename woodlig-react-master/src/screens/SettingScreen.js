import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';   
import PostActionComponent from '../component/PostActionComponent';  
import ActivityStremComponent from '../component/ActivityStremComponent';  
import SimplePostModel from '../component/models/SimplePostModel';  
import ImagePostModel from '../component/models/ImagePostModel';  
import VideoPostModel from '../component/models/VideoPostModel';  
import ScriptPostModel from '../component/models/ScriptPostModel';  
import EventPostModel from '../component/models/EventPostModel';  
import SellPostModel from '../component/models/SellPostModel';  
import { DatePicker,Select } from 'antd';

import  {AuthServices} from '../services/AuthServices'; 
const { Option } = Select;
class SettingScreen extends React.Component {
    constructor(props){  
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            homeSliders:[],
            sliderLoad:true,
            homeData:[],
            homeDataLoad:true,
            modelType:'',
        }  
        this.callBackOpenModel = this.callBackOpenModel.bind(this);
    } 

    componentDidMount() {  
       
    } 
    callBackOpenModel(modelType){
        this.setState({ modelType:modelType }); 
    }     
    render() { 
        return (
             <div className="page"> 
                <div className="satting-secton">
                    <div className="setting-title">
                        <h2>Settings</h2>
                    </div>
                    <div className="user-setting">
                        <div className="all-setting-left">
                            <div className="tab settinges-tab">
                                <div className="me-title">
                                    <h2>Me<i className="fas fa-user-cog"></i></h2>
                                </div>
                                <button className="tablinks active" onclick="settinges(event, 'profile')" >profile<i className="fas fa-chevron-right"></i></button>
                                <button className="tablinks" onclick="settinges(event, 'account')">Account<i className="fas fa-chevron-right"></i></button>

                                <div className="me-title">
                                    <h2>Preferences<i className="fas fa-cogs"></i></h2>
                                </div>

                                <button className="tablinks" onclick="settinges(event, 'notification')">Notification<i className="fas fa-chevron-right"></i></button>
                                <button className="tablinks" onclick="settinges(event, 'privancy')">Privancy<i className="fas fa-chevron-right"></i></button>
                                <button className="tablinks" onclick="settinges(event, 'sharing')">Sharing<i className="fas fa-chevron-right"></i></button>

                                <div className="me-title">
                                    <h2>Info & Legal<i className="fas fa-info-circle"></i></h2>
                                </div>                  
                                <button className="tablinks" onclick="settinges(event, 'notification')">Notification<i className="fas fa-chevron-right"></i></button>
                                <button className="tablinks" onclick="settinges(event, 'privancy')">Privancy<i className="fas fa-chevron-right"></i></button>
                                <button className="tablinks" onclick="settinges(event, 'sharing')">Sharing<i className="fas fa-chevron-right"></i></button>
                            </div>                  
                            <div className="logout">
                                <button className="logout-btn">
                                <img src="{require('../../assets/img/logout.png')}"/>Logout</button>
                            </div>
                        </div>
                        <div className="setting-details">
                            <div id="profile" className="tabcontent show-tabcontent">
                                <div className="settinges_user-profile">
                                    <div className="user-setting-back-img">  
                                         <img src={require('../assets/img/user_back.jpeg')} alt="Avatar" className="" />
                                        <div className="user-back-imput">  
                                                <label><i className="fas fa-camera"></i></label>
                                                <input type="file" name="myFile" className="edit-cover" /> 
                                        </div>
                                    </div>
                                    <div className="user-profile-img-edit"> 
                                         <img src={require('../assets/img/Avatar.png')} alt="Avatar" className="" />
                                        <div className="user-profile-imput">    
                                           
                                                <label><i className="fas fa-camera"></i></label>
                                                <input type="file" name="myFile" className="edit-cover" /> 
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="edit-detail">
                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                        <div class="edit-basic-detail">
                                            <ul>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Name</span>   
                                                        </div>              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                        <input type="text" className="form-control" value="Mayur patel" /> 
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Birthday</span>   
                                                            <div class="display-field-btn">
                                                                <p>Display on Profile</p>
                                                                <label class="switch">
                                                                    <input type="checkbox" checked />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>                              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                        <DatePicker/>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Location</span>   
                                                            <div class="display-field-btn">
                                                                <p>Display on Profile</p>
                                                                <label class="switch">
                                                                    <input type="checkbox" checked />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>                              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                        <p>Abuja, Nigeria</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Gender</span> 
                                                            <div class="display-field-btn">
                                                                <p>Display on Profile</p>
                                                                <label class="switch">
                                                                    <input type="checkbox" checked />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>                              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                        <Select defaultValue="lucy" style={{ width: '100%' }}>
                                                          <Option value="jack">Jack</Option>
                                                          <Option value="lucy">Lucy</Option>
                                                          <Option value="disabled" disabled>
                                                            Disabled
                                                          </Option>
                                                          <Option value="Yiminghe">yiminghe</Option>
                                                        </Select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Marital Status</span> 
                                                            <div class="display-field-btn">
                                                                <p>Display on Profile</p>
                                                                <label class="switch">
                                                                    <input type="checkbox" checked />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>                              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                        <input type="text" className="form-control" value="Married" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Email</span>  
                                                            <div class="display-field-btn">
                                                                <p>Display on Profile</p>
                                                                <label class="switch">
                                                                    <input type="checkbox" checked />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>                              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                         <input type="email" className="form-control" value="hj.productions@hotmail.com" />
                                                         
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Phone Number</span>   
                                                            <div class="display-field-btn">
                                                                <p>Display on Profile</p>
                                                                <label class="switch">
                                                                    <input type="checkbox" checked />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>                              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                        <p>Not Set</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="personal-detail">
                                                        <a href="">
                                                            <i class="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <div class="edit-field">
                                                            <span>Website</span>    
                                                            <div class="display-field-btn">
                                                                <p>Display on Profile</p>
                                                                <label class="switch">
                                                                    <input type="checkbox" checked />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>                              
                                                    </div>
                                                    <div class="user-personal-detail">
                                                        <p>www.website.com</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                        <div class="edit-bio-section">
                                            <div class="bio-wrap">
                                                <div class="edit-bio">
                                                    <a href="" class="edit-bio-title">
                                                        <i class="fas fa-pencil-alt"></i>
                                                        <span>Edit Bio</span>
                                                    </a>
                                                </div>
                                                <div class="edit-bio-description">
                                                    <div class="form-group">
                                                        <p class="info text-info">160 characters</p>
                                                        <textarea class="form-control" rows="5"  placeholder="I document videos about animal life and try to safe while at it."></textarea>
                                                    </div>                                          
                                                </div>
                                            </div>
                                            <div class="skills-wrap">
                                                <div class="edit-bio">
                                                    <a href="" class="edit-bio-title">
                                                        <i class="fas fa-pencil-alt"></i>
                                                        <span>Edit skills</span>
                                                    </a>
                                                </div>
                                                <div class="edit-skills-detail">
                                                    <div class="skills-tabs">
                                                        <a href="">producer</a>
                                                        <a href="">Director of Photography</a>
                                                        <a href="">Videographer</a>
                                                        <a href="">Audio Supervisor</a>
                                                        <a href="">Editor</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="edit-experience">
                                    <div class="edit-experience-title">
                                        <a href="" class="edit-bio-title">
                                            <i class="fas fa-pencil-alt"></i>
                                            <span>Edit Experience</span>
                                        </a>
                                        <p class="add-role" id="addrole">+ Add</p>
                                    </div>
                                    <div class="experience-list">
                                        <ul>
                                            <li>
                                                <a href="" class="Exp-madal" data-toggle="modal" data-target="#experiencemodal">
                                                    <div class="user-experience">
                                                        <h2>Midsummer Nights Dream</h2>
                                                        <p>Nouga Model School</p>
                                                        <div class="user-experience-footer">
                                                            <button href="" class="btn experience-director-btn">Director of Photography</button>
                                                            <span class="user-present">Jan 2019 - Present</span>
                                                        </div>  
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" class="Exp-madal" data-toggle="modal" data-target="#experiencemodal">
                                                    <div class="user-experience">
                                                        <h2>Midsummer Nights Dream</h2>
                                                        <p>Nouga Model School</p>
                                                        <div class="user-experience-footer">
                                                            <button href="" class="btn experience-director-btn">Director of Photography</button>
                                                            <span class="user-present">Jan 2019 - Present</span>
                                                        </div>  
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" class="Exp-madal" data-toggle="modal" data-target="#experiencemodal">
                                                    <div class="user-experience">
                                                        <h2>Midsummer Nights Dream</h2>
                                                        <p>Nouga Model School</p>
                                                        <div class="user-experience-footer">
                                                            <button href="" class="btn experience-director-btn">Director of Photography</button>
                                                            <span class="user-present">Jan 2019 - Present</span>
                                                        </div>  
                                                    </div>
                                                </a>
                                            </li>                                   
                                        </ul>
                                    </div>
                                </div>
                            </div>    
                            </div>
                        </div>
                    </div>
                </div> 
             </div>
        );
    }
} 
export default SettingScreen