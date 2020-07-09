import React, { Component } from 'react';
import LoginForm from './../common/loginForm.component';
import { Link } from 'react-router-dom';
import SignUpFormComponent from './../common/signupFrom.component';

class LoginComponent extends Component {
    state = { changeComponent: false }

    openSignUpComponent = () => {
      console.log('Change Component')
      this.setState({changeComponent: true})
    }

    openLoginComponent = () => {
      console.log('Change Component')
      this.setState({changeComponent: false})
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
                {this.state.changeComponent === true ? <SignUpFormComponent openLoginComponent={this.openLoginComponent} /> : <LoginForm openSignUpComponent={this.openSignUpComponent} /> }
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
                      <li className='list__items'><Link className='list__items--link'>Terms</Link></li>
                      <li className='list__items'><Link className='list__items--link'>Privacy</Link></li>
                      <li className='list__items'><Link className='list__items--link'>FAQ</Link></li>
                      <li className='list__items'><Link className='list__items--link'>Support</Link></li>
                    </ul>
                  </div>
                  <img style={{marginTop: '-10px'}} src={require('../../assets/logoTitle.svg')} />
                </div>
                <div className='inLine__items'>
                  <img src={require('../../assets/playStore.svg')} />
                  <div style={{display:'flex', flexDirection:'column', alignContent:'center'}}>
                    <div className='center__item'>
                      <ul className='list'>
                        <li className='list__items'><Link className='list__items--link'>Terms</Link></li>
                        <li className='list__items'><Link className='list__items--link'>Privacy</Link></li>
                        <li className='list__items'><Link className='list__items--link'>FAQ</Link></li>
                        <li className='list__items'><Link className='list__items--link'>Support</Link></li>
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