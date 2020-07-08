import React, { Component } from 'react';
import LoginForm from './../common/loginForm.component';

class LoginComponent extends Component {
    state = {  }

    render() { 
        return ( 
          <div>
          <div className='logoStyling'>
            <img className='logoStyling__img' src={require('../../assets/woodling_main_logo.svg')} />
          </div>
            <div className='row loginBacground'>
              <div className='col-md-8 col-sm-8 col-xs-12 center__item'>
                <img style={{height: '85%', position: 'relative'}} src={require('../../assets/Phone-Screenshots.svg')} />
                <div className='playstore__img'>
                  <img style={{width: '185px'}} src={require('../../assets/playStore.svg')} />
                  <img style={{width: '185px', marginLeft: '25px'}} src={require('../../assets/AppStore.svg')} />
                </div>
              </div>
              <div className="col-md-4 col-sm-8 col-xs-12 shadows">
                <LoginForm />
              </div>
            </div>
          </div>  
        );
    }
}
 
export default LoginComponent;