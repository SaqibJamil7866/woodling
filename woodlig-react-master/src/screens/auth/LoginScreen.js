import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';

import  {ValidationHelper} from '../../helper/ValidationHelper';
import  {AuthServices} from '../../services/AuthServices';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 

class LoginScreen extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            email: '',
            password: '',
            submitted: false, 
            errors:{
                email:'asdasdasd',
                password:''
            },
            emailError:'',
            passwordError:'',
            redirectToReferrer:false,
            validation:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     componentDidMount() {   
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        setTimeout(
                function() {
                   this.setState({'validation': ValidationHelper.LoginValidation(this.state.email,this.state.password) });
                }
                .bind(this),
                100
            ); 
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.setState({ submitted: true });
        const { email, password } = this.state; 
        
        try{     
            let userData = {
                type:'',
                field: email,
                password:password
            }
            AuthServices.login(userData).then(async (result) => {
               if(result.status != 'error'){
                    localStorage.setItem('user', JSON.stringify(result));  
                    window.location.href = '/'; 
                  }else { 
                   
                    toast.error(result.message,{ autoClose: 15000 }); 
                  } 
            });
                 
          }catch(e){
               console.log('error', e);
        } 
    } 
    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted, emailError, passwordError} = this.state; 
        return ( 
            <div>
               <ToastContainer /> 
               <div className="login-section">
                    <div class="login-background">
                      <img src={require('../../assets/img/login-back.png')} alt="" />
                    </div>
                    <div className="container">
                      <div className="top-logo">
                        <img src={require('../../assets/img/Woodlig_logo_white.png')} />
                      </div>
                      <div className="row login-main">
                        <div className="col-md-8">
                          <div className="application-btn">
                            <div className="mobile-screen">
                              <img src={require('../../assets/img/Phone-Screenshots.png')} />
                            </div> 
                            <div className="app-btn">
                          <div className="play-store">
                            <img src={require('../../assets/img/play-store.png')} />
                          </div>
                          <div className="app-store">
                            <img src={require('../../assets/img/app-store.png')} />
                          </div>
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
                        <div className="col-md-4"> 
                          <div className="auth-wrap">
                                <div className="auth-wrap-inner">
                                    <div className="auth-wrap-top">
                                        <div className="login login-top">
                                            <div className="login-main-title">
                                                <h2>Log in</h2>
                                                <h3 className="text-center">Welcome Back!</h3>
                                            </div>
                                             <form name="form" className="login-form" onSubmit={this.handleSubmit} >
                                                <div className='form-group'> 
                                                  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
                                                  name="email"
                                                  value={email} onChange={this.handleChange} /> 
                                                </div>
                                                <div className="form-group"> 
                                                  <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" 
                                                  name="password" value={password} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <p className="text-center"><a href="#">Forgot Your Password?</a></p>
                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <button className="login-btn" disabled={!this.state.validation}><i className="fas fa-arrow-right"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="top-shadow"></div>
                                    </div>
                                    <div className="auth-wrap-bottom">
                                        <div className="login-bottom">
                                            <p>Don't have an account yet?</p>
                                            <a href="" className="Woodlig_btn signup">Sign up</a>

                                        </div>
                                        <div className="bottom-shadow"></div>
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
                        <div className="footer-logo"> 
                          <img src={require('../../assets/img/woodlig-logo-alt-image.png')} />
                        </div>       
                      </div>
                    </div>
                  </div>  
            </div>
        );
    }
}
 
export default LoginScreen