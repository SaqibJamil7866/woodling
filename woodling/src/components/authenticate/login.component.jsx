import React, { Component } from 'react';
import  Joi from 'joi-browser';
import LoginForm from './../common/loginForm.component';
import { Link } from 'react-router-dom';
import SignUpFormComponent from './../common/signupFrom.component';
import ValidateContact from '../../public/contactValidator';
import ValidateEmail from '../../public/emailValidator';
import axios from 'axios';
import cookie from 'react-cookies';
import { loginUrl } from '../../public/endpoins';
import history from '../../public/history';
import { ToastsStore } from 'react-toasts';
import { AuthService } from '../../services/AuthService';

class LoginComponent extends Component {
  
    state = { 
      changeComponent: false,
      login: {
        field: "",
        password: ""
      },
      signUp : {
        fullname: "",
        businessname: "",
        username: "",
        email: "",
        gender: "",
        contact: "",
        address: "",
        password: "",
        confirmpassword: ""
      },
      errors: {}
    }

    loginSchema = {
      field: Joi.string().required().label("Username/Email"),
      password: Joi.string().required().label("Password"),
    }

    schema = {
      field: Joi.string().required().label("Username/Email"),
      email: Joi.string().required().email().label("Email"),
      password: Joi.string().required().label("Password"),
      confirmpassword: Joi.string().required().label("Confirm Password"),
      fullname: Joi.string().required().label("Name"),
      businessname: Joi.string().required().label('Name'),
      username: Joi.string().required().label("Username")
    }

    openSignUpComponent = () => {
      console.log('Change Component')
      this.setState({changeComponent: true, errors: {}})
    }

    openLoginComponent = () => {
      console.log('Change Component')
      this.setState({changeComponent: false, errors: {}})
    }

    handleLoginChange = (e) => {
       console.log(e.currentTarget.value);
      const errors = {...this.state.errors};
      const errorMessage = this.validateProperty(e.currentTarget);
      console.log('Handle Change validation');
      console.log(errorMessage);
      if(errorMessage) {
        console.log(errorMessage)
        errors[e.currentTarget.name] = errorMessage;
      }else {
        delete errors[e.currentTarget.name];
      }
      const login = {...this.state.login};
      login[e.currentTarget.name] = e.currentTarget.value;
      this.setState({login, errors})
    }

    handleSignupChange = (e) => {
      // console.log(e.currentTarget.name)
      const errors = {...this.state.errors};
      if(e.currentTarget.name!=='gender' && e.currentTarget.name!=='contact' && e.currentTarget.name!=='address'){
        const errorMessage = this.validateProperty(e.currentTarget);
        console.log(errorMessage);
        if(errorMessage) {
          console.log(errorMessage)
          errors[e.currentTarget.name] = errorMessage;
        }else {
          delete errors[e.currentTarget.name];
        }
      }
      const signUp = {...this.state.signUp};
      if(e.currentTarget.name==='contact'){ 
        const a = ValidateContact(e.currentTarget.value)
        if(a===true){
          // const signUp = {...this.state.signUp};
          signUp[e.currentTarget.name] = e.currentTarget.value;
          this.setState({signUp, errors})
        }
        else{
          this.setState({errors: 'invalude'})
        }
      }else
        
        signUp[e.currentTarget.name] = e.currentTarget.value;
        this.setState({signUp, errors})
    }


    validateProperty = ({name, value}) => {
      const obj = {[name]: value};
      const schema = {[name]: this.loginSchema[name]};
      const {error} = Joi.validate(obj, schema);
      console.log(error);
      return error ? error.details[0].message : null;
    }

    validation = () => {
      console.log('Validation')
      const result = Joi.validate(this.state.login, this.loginSchema, {
        abortEarly: false
      });
      if(!result.error) return null;

      const errors = {};
      for(let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    }

    handleLogin = (event) => {
      event.preventDefault();
      const { login } = this.state;
      const errors = this.validation();
      this.setState({errors: errors || {}});
      if(errors) return;
      try {
        const params = Object.assign({}, login);
        params.type = ValidateEmail(login.field) ? 'email' : 'username';
        AuthService.login(params).then(async (res) => {
          if(res.status != 'error'){
            cookie.save('token', res.data.token, { path: '/' });
            cookie.save('currnt_user', res.data.details, { path: '/' });debugger
            history.push('/home');
            // window.location.href = '/';
          }else { 
            ToastsStore.error(res.message); 
          } 
       });
        console.log('Login Correct');
      } catch(ex) {
        const errors = {...this.state.errors};
        errors.username = this.validation();
        this.setState({errors})
      }
    }

    handleSignUp = (event) => {
      event.preventDefault();
      console.log('handle signUp Button')
    }

    render() { 
        return ( 
          <div style={{height: '100%'}}>
            <div className='logoStyling'>
              <img className='logoStyling__img' src={require('../../assets/woodling_main_logo.svg')} />
              <img className='logo' src={require('../../assets/logo.svg')} />
            </div>
            <div className='row loginBacground wfull'>
              <div className='col-md-7 col-sm-8 col-xs-12 center__item col-dir w800'>
                <img style={{height: '70%', position: 'relative', marginBottom: '15px'}} src={require('../../assets/Phone-Screenshots.svg')} />
                <div className='playstore__img'>
                  <img style={{width: '165px'}} src={require('../../assets/playStore.svg')} />
                  <img style={{width: '165px', marginLeft: '25px'}} src={require('../../assets/AppStore.svg')} />
                </div>
                {/* <input
                  type="text"
                  placeholder="Search..."
                  className="form-control search-field mt10"
                />
                <p className='search__text'><b>keywords: e.g film, dancer, commercial, music</b></p> */}
              </div>
              <div className="col-md-5 col-sm-8 col-xs-12 shadows center__item col-dir md-12">
                {this.state.changeComponent === true ? 
                  <SignUpFormComponent 
                    openLoginComponent={this.openLoginComponent}
                    fullNameValue={this.state.signUp.fullname}
                    businessNameValue={this.state.signUp.businessname}
                    userNameValue={this.state.signUp.username}
                    emailValue={this.state.signUp.email}
                    genderValue={this.state.signUp.gender}
                    contactValue={this.state.signUp.contact}
                    addressValue={this.state.signUp.address}
                    passwordValue={this.state.signUp.password}
                    confirmPasswordValue={this.state.signUp.confirmpassword}
                    handleChange={this.handleSignupChange}
                    usernameError={this.state.errors.username}
                    emailError={this.state.errors.email}
                    fnameError={this.state.errors.fullname}
                    bnameError={this.state.errors.businessname}
                    passwordError={this.state.errors.password}
                    confirmPasswordError={this.state.errors.confirmPassword}
                  /> 
                  : 
                  <LoginForm 
                    openSignUpComponent={this.openSignUpComponent}
                    usernameValue={this.state.login.field}
                    passwordValue={this.state.login.password}
                    handleChange={this.handleLoginChange}
                    usernameError={this.state.errors.email}
                    passwordError={this.state.errors.password}
                    handleLogin ={this.handleLogin}
                  /> 
                }
                <div className='searchDiv'>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control search-field mt10"
                  />
                  <p className='search__text'><b>keywords: e.g film, dancer, commercial, music</b></p> 
                </div>
                <div className='list__items--hidden'>
                  <div className='center__item'>
                    <ul className='list'>
                      <li className='list__items'><Link to="terms" className='list__items--link'>Terms</Link></li>
                      <li className='list__items'><Link to="terms" className='list__items--link'>Privacy</Link></li>
                      <li className='list__items'><Link to="terms" className='list__items--link'>FAQ</Link></li>
                      <li className='list__items'><Link to="terms" className='list__items--link'>Support</Link></li>
                    </ul>
                  </div>
                  <img style={{marginTop: '-10px'}} src={require('../../assets/logoTitle.svg')} />
                </div>
                <div className='inLine__items'>
                  <img src={require('../../assets/playStore.svg')} />
                  <div style={{display:'flex', flexDirection:'column', alignContent:'center'}}>
                    <div className='center__item'>
                      <ul className='list'>
                        <li className='list__items'><Link to="terms" className='list__items--link'>Terms</Link></li>
                        <li className='list__items'><Link to="terms" className='list__items--link'>Privacy</Link></li>
                        <li className='list__items'><Link to="terms" className='list__items--link'>FAQ</Link></li>
                        <li className='list__items'><Link to="terms" className='list__items--link'>Support</Link></li>
                      </ul>
                    </div>
                    <img src={require('../../assets/logoTitle.svg')} />
                  </div>
                  <img src={require('../../assets/playStore.svg')} />
                </div>
              </div>
            </div>
          </div>  
        );
    }
}
 
export default LoginComponent;