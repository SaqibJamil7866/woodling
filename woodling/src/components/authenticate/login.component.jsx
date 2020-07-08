import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginComponent extends Component {
    state = {  }

    render() { 
        return ( 
          <div>
            <div className='shadows row'>
            <div className='col-md-8 col-sm-8 col-xs-12'></div>
            <div className="col-md-4 col-sm-8 col-xs-12">
              <div className="login">
                <div className='login__title'>
                    <h3>Login</h3>
                  </div>
                <h1>Welcome Back</h1>
                <form>
                    <div className="form-group">
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email or Username" />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group alignCenter">
                      <Link>Forget Password</Link>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
              </div>
              <div className="signUp">
                <h5>Don't have an account yet?</h5>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
          </div>
         );
    }
}
 
export default LoginComponent;