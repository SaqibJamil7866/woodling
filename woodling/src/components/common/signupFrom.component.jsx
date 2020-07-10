import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SignUpFormComponent = (props) => {
    const [check, setCheck] = useState(false);
    const [options, setOptions] = useState([{name:'item 1', value: 'item_1'},{name:'item 2', value: 'item_2'}])
    return ( 
        <>
            <div className="signupForm p800">
                <div className='login__title'>
                    <h3 className='login__title--heading'><b>Register</b></h3>
                </div>
                <div className='login__welcome-back-img'>
                    <img src={require('../../assets/signup-text-img.svg')} />
                    <p className='signup__account--text'><b>Choose an account type</b></p>
                </div>
                <div className='flex mt-10'>
                    <div onClick={() => setCheck(false)} className={check===false ? 'w45 flex checkBox__clr--active h30 pointer' : 'w45 flex checkBox__clr h30 pointer'}>
                        <span className={check===false ? 'fa fa-check-circle-o font-25' : 'fa fa-circle-thin font-25'}></span>
                        <p className='mb0'><b>Individual</b></p>
                    </div>
                    <div onClick={() => setCheck(true)} className={check===true ? 'w45 flex checkBox__clr--active h30 pointer' : 'w45 flex checkBox__clr h30 pointer'}>
                    <span className={check===true ? 'fa fa-check-circle-o font-25' : 'fa fa-circle-thin font-25'}></span>
                        <p className= 'mb0'><b>Business</b></p>
                    </div>
                </div>
                <hr style={{width: '100px', borderWidth: '3px', marginTop: '10px'}}></hr>
                <form className='forms'>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            {check===false ? 
                                <input 
                                    type="text"
                                    name="fullname"
                                    value={props.fullNameValue}
                                    onChange={props.handleChange}
                                    className="form-control" 
                                    placeholder="Full Name*" /> 
                            : 
                                <input 
                                    type="text" 
                                    name="businessname"
                                    value={props.businessNameValue}
                                    onChange={props.handleChange}
                                    className="form-control" 
                                    placeholder="Business Name*" />
                            }
                            {check===false ? props.fnameError && <p className="alert alert-danger error">{props.fnameError}</p> : props.bnameError && <p className="alert alert-danger error">{props.bnameError}</p> }
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="text" 
                                name="username"
                                value={props.userNameValue}
                                onChange={props.handleChange}
                                className="form-control" 
                                placeholder="Username*" />
                            {props.usernameError && <p className="alert alert-danger error">{props.usernameError}</p>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="email"
                                name="email" 
                                value={props.emailValue}
                                onChange={props.handleChange}
                                className="form-control" 
                                id="inputEmail4" 
                                placeholder="Email*" />
                            {props.emailError && <p className="alert alert-danger error">{props.emailError}</p>}
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                        {check===false ? 
                            <select name="gender" value={props.genderValue} onChange={props.handleChange} id="inputState" className="form-control" placeholder='Gender'>
                                <option value=''>Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select> 
                            :
                            <input 
                                type="text" 
                                name="contact"
                                value={props.contactValue}
                                onChange={props.handleChange}
                                className="form-control" 
                                placeholder="Contact Number" />
                        }
                        </div>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="address"
                            value={props.addressValue}
                            onChange={props.handleChange}
                            className="form-control" 
                            placeholder="Address" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="password" 
                                name="password"
                                value={props.passwordValue}
                                onChange={props.handleChange}
                                className="form-control" 
                                placeholder="Password*" />
                            {props.passwordError && <p className="alert alert-danger error">{props.passwordError}</p>}
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="password" 
                                name="confirmpassword"
                                value={props.confirmPasswordValue}
                                onChange={props.handleChange}
                                className="form-control" 
                                placeholder="Confirm Password*" />
                            {props.confirmPasswordError && <p className="alert alert-danger error">{props.confirmPasswordError}</p>}
                        </div>
                    </div>
                    <p className='signup__account--text'><b>Choose Your Skills</b></p>
                    <div className='center__item'>
                        {/* <select id="inputState1"  className="form-control checkBox__clr w60" placeholder='Gender*'>
                            <option disabled selected hidden>Choose a skill</option>
                            <option className='clr__white'> Male</option>
                            <option className='clr__white'>Female</option>
                        </select> */}
                    </div>
                    <div className='login__btn-div'>
                        <button className='login__btn' type="submit" ><img className='submit' src={require('../../assets/login_button.svg')} /></button>
                    </div>
                </form>
            </div>
            <div className="signUp w90 pd65__800 m-20">
                <h5 className='signUp__heading m15'><b>Already have an account</b></h5>
                <button className='login__btn'><img onClick={()=>props.openLoginComponent()} src={require('../../assets/login-btn.svg')} /></button>
            </div>
        </>
     );
}
 
export default SignUpFormComponent;