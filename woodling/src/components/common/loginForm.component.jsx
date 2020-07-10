import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
    return ( 
        <>
            <div className="login p800">
                <div className='login__title'>
                    <h3 className='login__title--heading'><b>Log in</b></h3>
                </div>
                <div className='login__welcome-back-img'>
                    <img src={require('../../assets/welcome_back_img.svg')} />
                </div>
                <form onSubmit={props.handleLogin} className='forms'>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name='email' 
                            value={props.usernameValue}
                            onChange={props.handleChange}
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            placeholder="Email or Username" />
                        {props.usernameError && <p className="alert alert-danger error">{props.usernameError}</p>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name='password' 
                            value={props.passwordValue}
                            onChange={props.handleChange}
                            className="form-control"
                            placeholder="Password" />
                        {props.passwordError && <p className="alert alert-danger error">{props.passwordError}</p>}
                    </div>
                    <div className="form-group alignCenter">
                        <Link to="forget_password">Forget Password</Link>
                    </div>
                    <div className='login__btn-div'>
                        <button className='login__btn' type="submit" ><img  src={require('../../assets/login_button.svg')} /></button>
                    </div>
                </form>
            </div>
            <div className="signUp pd65__800">
                <h5 className='signUp__heading'><b>Don't have an account yet?</b></h5>
                <button className='login__btn' onClick={() => props.openSignUpComponent()} ><img  src={require('../../assets/signup_btn.svg')} /></button>
            </div>
        </>
    );
}
 
export default LoginForm;