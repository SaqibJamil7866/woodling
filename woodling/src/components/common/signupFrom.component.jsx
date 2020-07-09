import React, { useState } from 'react';
import {Link} from 'react-router-dom';
const SignUpFormComponent = (props) => {
    const [check, setCheck] = useState(false);
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
                            {check===false ? <input type="text" className="form-control" placeholder="Full Name*" /> : <input type="text" className="form-control" placeholder="Business Name*" />}
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <input type="text" className="form-control" placeholder="Username*" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <input type="email" className="form-control" id="inputEmail4" placeholder="Email*" />
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                        {check===false ? 
                            <select id="inputState" className="form-control" placeholder='Gender*'>
                                <option disabled selected hidden>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select> 
                            :
                            <input type="text" className="form-control" placeholder="Contact Number*" />
                        }
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Address*" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <input type="password" className="form-control" placeholder="Password*" />
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <input type="password" className="form-control" placeholder="Confirm Password*" />
                        </div>
                    </div>
                    <p className='signup__account--text'><b>Choose Your Skills</b></p>
                    <div className='center__item'>
                        <select id="inputState" className="form-control checkBox__clr w60" placeholder='Gender*'>
                            <option disabled selected hidden>Choose a skill</option>
                            <option className='clr__white'><input class="form-check-input" type="checkbox" /> Male</option>
                            <option className='clr__white'>Female</option>
                        </select>
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