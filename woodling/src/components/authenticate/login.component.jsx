/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import  Joi from 'joi-browser';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { ToastsStore } from 'react-toasts';
import LoginForm from '../common/loginForm.component';
import SignUpFormComponent from '../common/signupFrom.component';
import ValidateContact from '../../public/contactValidator';
import ValidateEmail from '../../public/emailValidator';
import { loginUrl } from '../../public/endpoins';
import history from '../../public/history';
import { showLoader, hideLoader } from '../../public/loader';

class LoginComponent extends Component {
  
    state = { 
      changeComponent: false,
      login: {
        field: "",
        password: ""
      },
      errors: {}
    }

    loginSchema = {
      field: Joi.string().required().label("Username/Email"),
      password: Joi.string().required().label("Password"),
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
      const errors = {...this.state.errors};
      const errorMessage = this.validateProperty(e.currentTarget);
      if(errorMessage) {
        errors[e.currentTarget.name] = errorMessage;
      }else {
        delete errors[e.currentTarget.name];
      }
      const login = {...this.state.login};
      login[e.currentTarget.name] = e.currentTarget.value;
      this.setState({login, errors})
    }

    validateProperty = ({name, value}) => {
      const obj = {[name]: value};
      const schema = {[name]: this.loginSchema[name]};
      const {error} = Joi.validate(obj, schema);
      console.log(error);
      return error ? error.details[0].message : null;
    }

    validation = () => {
      const result = Joi.validate(this.state.login, this.loginSchema, {
        abortEarly: false
      });
      if(!result.error) return null;

      const errors = {};
      for(let item of result.error.details){
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
        showLoader();
        axios.post(loginUrl, params).then(res => {
          hideLoader();
          if(res.data.token){
            cookie.save('token', res.data.token, { path: '/' });
            cookie.save('currnt_user', res.data.details, { path: '/' });debugger
            if(!res.data.ftl){
              history.push('/explore_home')
            }
            else{
              history.push('/home');
            }
          }
          else if(res.data.status === 'error'){
            ToastsStore.error(res.data.message);
          }
        }).catch(e => {
          console.log('error after login', e);
        });
      } catch(ex) {
        const errors = {...this.state.errors};
        errors.username = this.validation();
        this.setState({errors})
      }
    }

    render() { 
        return ( 
          <div style={{height: '100%'}}>
            <div className='logoStyling'>
              <img className='logoStyling__img' src={require('../../assets/woodling_main_logo.svg')} alt="logo" />
              <img className='logo' src={require('../../assets/logo.svg')} alt="logo" />
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
                  /> 
                  : 
                  <LoginForm 
                    openSignUpComponent={this.openSignUpComponent}
                    usernameValue={this.state.login.field}
                    passwordValue={this.state.login.password}
                    handleChange={this.handleLoginChange}
                    usernameError={this.state.errors.email}
                    passwordError={this.state.errors.password}
                    handleLogin={this.handleLogin}
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
                  <img style={{marginTop: '-10px'}} src={require('../../assets/logoTitle.svg')} alt="logo title" />
                </div>
                <div className='inLine__items'>
                  <img src={require('../../assets/playStore.svg')} alt="playstore icon" />
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