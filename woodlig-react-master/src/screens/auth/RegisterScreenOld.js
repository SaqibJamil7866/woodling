import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";

import  {ValidationHelper} from '../../helper/ValidationHelper';
import  {SkillServices} from '../../services/SkillServices'; 
import {AuthServices} from '../../services/AuthServices';
import  SkillComponent from '../../component/SkillComponent'; 



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
class RegisterScreenOld extends React.Component {
    constructor(props) {
        super(props); 
        // reset login status
        //this.props.logout(); 
        this.state = {     
            //user_id:182,       
            user_id:183,       
            full_name:'',
            username:'',
            email: '',
            gender:'',
            location:'',
            password: '',
            confirm_password: '',
            business_name:'',
            business_phone:'',
            formatted_address:'',
            lat:'',
            lng:'',
            city:'',
            country:'',
            business_name:'',
            submitted: false, 
            account_type:'individual',
            skill_set:[],
            isIndividual: true,
            errors:{
                email:'asdasdasd',
                password:''
            },
            emailError:'',
            passwordError:'',
            redirectToReferrer:false,
            validation:false,
            skilsList:[],
            skillLoad:false,
            openSkillBox:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chnageAccountType = this.chnageAccountType.bind(this);
        this.callBackSkillsSelected = this.callBackSkillsSelected.bind(this);
        //this.openSkillBox = this.openSkillBox.bind(this);
    }

    componentDidMount() {  
    } 
   
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        setTimeout(
                function() {
                   //this.setState({'validation': ValidationHelper.registerValidation(this.state.email,this.state.password) });
                }
                .bind(this),
                100
            ); 
    }
    chnageAccountType(e) {
        const { name, value } = e.target;

        var type = false;
        if(value == 'individual'){
          type = true;
        } 
        this.setState({ [name]: value,isIndividual:type }); 
    } 
    handleSubmit(e) {
        e.preventDefault(); 
        this.setState({ submitted: true });
        const { user_id,account_type, username, email, password, confirm_password,lat, lng, city, country, business_name,gender,business_phone,skill_set,full_name,formatted_address } = this.state; 
       
        try{  
            let userData = {
                type:'email',
                username:username,
                field: email,
                password:password,
                password2:confirm_password
            }
            AuthServices.register(userData).then(async (result) => { 
                  if(result.status != 'error'){
                    //localStorage.setItem('user', JSON.stringify(result));  
                    console.log(result);
                   // this.updateProfile(result.id)
                  }
                 if(result.status == 'error'){
                      console.log(result); 
                      toast.error(result.message,{ autoClose: 15000 }); 
                  } 
            }); 
       
            
                 
          }catch(e){
               console.log('error', e);
        } 
    } 

    updateProfile(user_id){
      const { account_type, username, email, password, confirm_password,lat, lng, city, country, business_name,gender,business_phone,skill_set,full_name,formatted_address } = this.state; 
      if(account_type == 'individual'){
               let userData2 = {
                user_id:user_id,
                account_type:account_type,
                formatted_address:"junagadh", 
                lat:'22.215',
                lng:'23.215',
                city:'junagadh',
                country:'india', 
                gender:gender, 
                skill_set:skill_set,
                full_name:full_name,
              }  
              AuthServices.individualRegisterStep(userData2).then(async (result) => {
                 if(result.success){ 
                      console.log(result);
                    }else {
                        console.log(result); 
                      toast.error(result.message,{ autoClose: 15000 }); 
                    } 
              });
            }else{
              let userData2 = {
                user_id:user_id,
                account_type:account_type,
                formatted_address:"junagadh", 
                lat:'22.215',
                lng:'23.215',
                city:'junagadh',
                country:'india',  
                skill_set:skill_set, 
                business_phone:business_phone,
                business_name:business_name,
              } 
              AuthServices.individualRegisterStep2(userData2).then(async (result) => {
                 if(result.success){ 
                      console.log(result);
                    }else {
                        console.log(result); 
                      toast.error(result.message,{ autoClose: 15000 }); 
                    } 
              });
            }  
    }
   
    callBackSkillsSelected(data){ 
        this.setState({
           skill_set:data.toString()
        });
    }
    render() {
        const { loggingIn } = this.props;
        const { formatted_address, business_phone, business_name, username,full_name, email,gender, password,confirm_password, location, submitted, emailError, passwordError} = this.state; 
        return ( 
            <div>
               <ToastContainer/>
               <div className="login-section">
    <div className="container">
      <div className="top-logo">
        <img src={require('../../assets/img/Woodlig_logo_white.png')} />
      </div>
      <div className="row login-main">
        <div className="col-md-6">
          <div className="application-btn">
            <div className="play-store">
              <img src={require('../../assets/img/play-store.png')} />
            </div>
            <div className="app-store">
              <img src={require('../../assets/img/app-store.png')} />
            </div>
          </div>
          <div className="search-box">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search availabla Casting Call & Auditions..." />
              <div className="input-group-append">
                <button className="btn btn-secondary search-btn" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <p className="keywords">Keywords:e.g film, dancer,commercial,music</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="auth-wrap">
            <div className="auth-wrap-inner">
              <div className="auth-wrap-top">
                <div className="register register-top">
                  <div className="login-main-title">
                    <h2>Register</h2>
                    <h3 className="text-center">Join The Lig Of Star</h3>
                    <p className="text-center">Choose Account Type*</p>
                  </div>                 
                  <ul className="nav nav-tabs account-type" id="myTab">
                      <li className="signup_tab">
                          <a href="#individual">
                              <div className="checkbox active">
                                  <input type="radio" value="individual" id="individual-btn" name="account_type" onChange={this.chnageAccountType} checked={this.state.isIndividual} />
                                  <label for="individual-btn" className="radio" chec>individual</label> 
                              </div>
                          </a>
                      </li>
                      <li className="signup_tab">
                          <a href="#business">
                              <div className="checkbox">
                                  <input type="radio" value="business" id="business-btn" name="account_type" onChange={this.chnageAccountType} checked={!this.state.isIndividual} />
                                   <label for="business-btn" className="radio">Business</label> 
                              </div>
                          </a>
                      </li>
                  </ul>
                  <div id='content' className="tab-content"> 
                    <form role="form"  onSubmit={this.handleSubmit}> 
                      {this.state.isIndividual &&
                        <div id="individual-form">
                          <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="text" name="full_name" id="full_name" className="form-control input-sm" placeholder="Full Name" onChange={this.handleChange}/>
                              </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="text" name="username" id="username" className="form-control input-sm" placeholder="username" vaule={username} onChange={this.handleChange}/>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="text" name="email" id="email" className="form-control input-sm" placeholder="Email" vaule={email} onChange={this.handleChange}/>
                              </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <select name="gender" onChange={this.handleChange}>
                                  <option value="" disabled selected>Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <input type="text" name="location" id="location" className="form-control input-sm" placeholder="Location" vaule={location} onChange={this.handleChange}/>
                          </div>
                          <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="password" name="password" id="password" className="form-control input-sm" placeholder="Password" vaule={password} onChange={this.handleChange}/>
                              </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="password" name="confirm_password" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password" vaule={confirm_password} onChange={this.handleChange}/>
                              </div>
                            </div>
                          </div> 
                          <div className="form-group"> 
                            <p className="text-center"><strong>choose your skills</strong></p>
                            <div className="skils-form">
                              <div className="multiselect"> 
                                <SkillComponent skillType={this.state.isIndividual} callBackPlaceSelected = {this.callBackSkillsSelected}/> 
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      } 
                      {!this.state.isIndividual &&
                        <div id="business-form">
                          <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                 <input type="text" name="business_name" id="email" className="form-control input-sm" placeholder="Business Name" vaule={business_name} onChange={this.handleChange}/>
                              </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="text" name="username" id="user_name" className="form-control input-sm" placeholder="username" vaule={username} onChange={this.handleChange}/>
                              </div>
                            </div>
                          </div> 
                          <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="text" name="email" id="email" className="form-control input-sm" placeholder="Email" vaule={email} onChange={this.handleChange}/>
                              </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                  <input type="text" name="business_phone" id="email" className="form-control input-sm" placeholder="Contact Number" vaule={business_phone} onChange={this.handleChange}/>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <input type="text" name="formatted_address" id="formatted_address" className="form-control input-sm" placeholder="Address" vaule={formatted_address} onChange={this.handleChange}/>
                          </div>
                          <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="password" name="password" id="password" className="form-control input-sm" placeholder="Password" vaule={password} onChange={this.handleChange}/>
                              </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6">
                              <div className="form-group">
                                <input type="password" name="confirm_password" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password" vaule={confirm_password} onChange={this.handleChange}/>
                              </div>
                            </div>
                          </div> 
                          <div className="form-group"> 
                            <p className="text-center"><strong>choose your skills</strong></p>
                            <div className="skils-form">
                              <div className="multiselect"> 
                                 <SkillComponent skillType={this.state.isIndividual} callBackPlaceSelected = {this.callBackSkillsSelected}/>  
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      }   
                      <div className="search-top-shadow">
                        <div className="col-md-12 text-right">  
                             <button className="login-btn"><i className="fas fa-arrow-right"></i></button>
                          </div>
                      </div>   
                    </form> 
                  </div>  
                </div> 
              </div>
              <div className="auth-wrap-bottom">
                <div className="login-bottom">
                  <p>already have an account?</p>
                  <a href="" className="Woodlig_btn signup">login</a>

                </div>
                <div className="search-bottom-shadow"></div>
              </div>
            </div>
          </div>
          <div className="login-menu">
            <ul>
              <li>forms</li>
              <li>Privacy</li>
              <li>fAQ</li>
              <li>support</li>
            </ul>
            <div className="login-footer-logo">
              <img src={require('../../assets/img/Woodlig_logo.png')} alt="" /><span>2019</span>
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
 
export default RegisterScreenOld