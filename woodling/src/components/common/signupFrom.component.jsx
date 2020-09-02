/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import  Joi from 'joi-browser';
import { ToastsStore } from 'react-toasts';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { AuthService } from '../../services/AuthService';
import { ActivityStreamService } from '../../services/ActivityStreamService';
import { SettingService } from '../../services/Setting';
import { CastingCallService } from '../../services/CastingCallsService';
import { showLoader, hideLoader } from '../../public/loader';
import MultiSelectDropdown from './multi_select.component';
import 'react-input-range/lib/css/index.css';

const SignUpFormComponent = (props) => {
    const initialState ={
        check: false,
        account_type: '',
        full_name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        business_name: '',
        business_phone: '',
        gender: '',
        skillset: '',
        location: '',
        city: '',
        country: '',
        lat: '',
        lng: '',
        formatted_address: '',
        skills: [],
        genders: [],
        locations: [],
        errors: {}
    }

    function reducer(state, { field, value}){
        switch (field) {
            case 'add_address':
            return{
                ...state,
                city: value.address[value.address.length-2],
                country: value.address[value.address.length-1],
                lat: value.res.geometry.location.lat,
                lng: value.res.geometry.location.lng,
                formatted_address: value.res.formatted_address
            };
            default: 
            return{
                ...state,
                [field] : value
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { check, account_type, email, password, password2, full_name, username, business_name, gender, skillset,
        skills, genders, city, country, lat, lng, formatted_address, business_phone, location, locations, errors } = state;

    const handleValueChange = (e) => {
        const errs = errors;
        if(e.currentTarget.name!=='gender' && e.currentTarget.name!=='business_phone'){
          const errorMessage = validateProperty(e.currentTarget);
          if(errorMessage) {
            errs[e.currentTarget.name] = errorMessage;
          }else {
            delete errs[e.currentTarget.name];
          }
        }
        dispatch({field: 'errors', value: errs});
        dispatch({field: e.target.name, value: e.target.value});
    }

    const handleLocationSearch = (keyword) =>{
        CastingCallService.getLocation(keyword)
        .then((res) => {
            dispatch({field: 'locations', value: res.data.predictions});
        })
    }

    const handleLocation = (loc) => {
        if(loc && loc.length > 0){
            dispatch({field: 'location', value: loc[0].description});
            ActivityStreamService.getLocationDetailByPlaceId(loc[0].place_id)
            .then((response) => {
                const res= response.data.results[0];
                const address = loc[0].description.split(',');
                dispatch({field: 'add_address', value: {address, res}});
            })
        }
    }

    useEffect(()=>{
        if(!check){
            getGenders();
        }
        getAllSkills();

    }, [check]);

    const registerIndividualSchema = {
        // skillset: Joi.string().required().label("Skills"),
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().min(6).required().label("Password"),
        password2: Joi.string().min(6).required().valid([password]).label("Confirm Password"),
        full_name: Joi.string().required().label("Full Name"),
        // gender: Joi.string().required().label('Gender'),
        username: Joi.string().required().label("Username")
    }

    const registerBusinessSchema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().min(6).required().label("Password"),
        password2: Joi.string().min(6).required().valid([password]).label("Confirm Password"),
        business_name: Joi.string().required().label("Business Name"),
        username: Joi.string().required().label("Username")
    }

    const validation = () => {
        let obj = {};
        let schema = {};
        if(account_type === 'individual'){
            obj = {full_name, username, password, password2, email};
            schema = registerIndividualSchema;
        }
        else{
            obj = {business_name, username, password, password2, email};
            schema = registerBusinessSchema;
        }

        const result = Joi.validate(obj, schema, {
          abortEarly: false
        });
        if(!result.error) return null;
  
        const errs = {};
        result.error.details.map((error)=>{
            errs[error.path[0]] = error.message
        });
        return errs;
    }

    const validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schemaType = account_type === 'individual' ? registerIndividualSchema : registerBusinessSchema;
        const schema = {[name]: schemaType[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    const getAllSkills = () => {
        const skillType= check ? 'business' : 'individual';
        dispatch({field: 'account_type', value: skillType});
        dispatch({field: 'skills', value: []}); // to recreate the multiselect
        showLoader();
        AuthService.getSkills(skillType).then((res)=>{
            hideLoader();
            if(res.data.status !== 'error'){
                dispatch({field: 'skills', value: res.data.data});
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e)) 
    }

    const getGenders = () => {
        SettingService.getGenders().then((res)=>{
            if(res.data.status !== 'error'){
                dispatch({field: 'genders', value: res.data.data});
            }else {
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=>console.error("error: "+ e)) 
    }

    const handleSkills = (e) => {
        if(skillset && skillset.length === 5) return;
        dispatch({field: 'skillset', value: e.target.value});
    }

    const registerUser = () => {
        const errs = validation();
        dispatch({field: 'errors', value: errs || {}});
        if(errs) return;

        const params = { type: 'email', username, password, password2, field: email};
        showLoader();
        AuthService.register(params).then((res)=>{
            if(res.data.status !=='error'){
                const skillIds = skillset.map((skill)=> skill.id).join(',');
                const accountDetailsParams = { user_id: res.data.id, account_type, lat, lng, formatted_address,
                    city, country, skillset: skillIds };
                if(account_type === 'individual'){
                    accountDetailsParams.full_name = full_name;
                    accountDetailsParams.gender = gender;
                }
                else{
                    accountDetailsParams.business_name = business_name;
                    accountDetailsParams.business_phone = business_phone;
                }
                AuthService.updateAccountDetails(accountDetailsParams).then((response)=>{
                    hideLoader();
                    if(res.data.status !=='error'){
                        props.openLoginComponent();
                        ToastsStore.success('User registered successfully');
                    }
                    else{
                        ToastsStore.error(response.data.message);
                    }
                })
            }
            else{
                hideLoader();
                ToastsStore.error(res.data.message);
            }
        })
        .catch((ex)=>console.error("error: "+ ex)) 
    }

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
                    <div onClick={() => {dispatch({field: 'check', value: false});}} className={check===false ? 'w45 flex checkBox__clr--active h30 pointer' : 'w45 flex checkBox__clr h30 pointer'}>
                        <span className={check===false ? 'fa fa-check-circle-o font-25' : 'fa fa-circle-thin font-25'}></span>
                        <p className='mb0'><b>Individual</b></p>
                    </div>
                    <div onClick={() => {dispatch({field: 'check', value: true});}} className={check===true ? 'w45 flex checkBox__clr--active h30 pointer' : 'w45 flex checkBox__clr h30 pointer'}>
                    <span className={check===true ? 'fa fa-check-circle-o font-25' : 'fa fa-circle-thin font-25'}></span>
                        <p className= 'mb0'><b>Business</b></p>
                    </div>
                </div>
                <hr style={{width: '100px', borderWidth: '3px', marginTop: '10px'}} />
                <form className='forms'>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            {check===false ? (
                                <input 
                                    type="text"
                                    name="full_name"
                                    value={full_name}
                                    onChange={handleValueChange}
                                    className="form-control" 
                                    placeholder="Full Name*" 
                                />
                            ):(
                                <input 
                                    type="text" 
                                    name="business_name"
                                    value={business_name}
                                    onChange={handleValueChange}
                                    className="form-control" 
                                    placeholder="Business Name*" 
                                />
                            )}
                            {check===false ? errors.full_name && <p className="alert alert-danger error">{errors.full_name}</p> : errors.business_name && <p className="alert alert-danger error">{errors.business_name}</p> }
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="text" 
                                name="username"
                                value={username}
                                onChange={handleValueChange}
                                className="form-control" 
                                placeholder="Username*" 
                            />
                            {errors.username && <p className="alert alert-danger error">{errors.username}</p>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="email"
                                name="email" 
                                value={email}
                                onChange={handleValueChange}
                                className="form-control" 
                                id="inputEmail4" 
                                placeholder="Email*" 
                            />
                            {errors.email && <p className="alert alert-danger error">{errors.email}</p>}
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                        {check===false ? ( 
                            <select name="gender" value={gender} onChange={handleValueChange} id="inputState" className="form-control" placeholder='Gender'>
                                <option value=''>Gender</option>
                                {genders && genders.map((obj) => {
                                    return <option key={obj.id} value={obj.id}>{obj.sex}</option>
                                })}
                            </select>
                        ) : (
                            <input 
                                type="text" 
                                name="business_phone"
                                value={business_phone}
                                onChange={handleValueChange}
                                className="form-control" 
                                placeholder="Contact Number" 
                            />
                        )}
                        </div>
                    </div>
                    <div className="form-group">
                        <AsyncTypeahead
                            id="location_typehead"
                            labelKey="description"
                            placeholder="Search for a Location"
                            minLength={3}
                            onSearch={handleLocationSearch}
                            onChange={handleLocation}
                            options={locations}
                            className="form-control box-shadow-none border-none brder-l-r-t mb10"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="password" 
                                name="password"
                                value={password}
                                onChange={handleValueChange}
                                className="form-control" 
                                placeholder="Password*" 
                            />
                            {errors.password && <p className="alert alert-danger error">{errors.password}</p>}
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <input 
                                type="password" 
                                name="password2"
                                value={password2}
                                onChange={handleValueChange}
                                className="form-control" 
                                placeholder="Confirm Password*"
                            />
                            {errors.password2 && <p className="alert alert-danger error">{errors.password2}</p>}
                        </div>
                    </div>
                    <p className='signup__account--text'><b>Choose Your Skills</b></p>
                    <div className='center__item multiselect'>
                        {skills && skills[0] && (
                            <MultiSelectDropdown 
                                data={skills}
                                value={skillset}
                                handleChange={handleSkills}
                                textField="name" 
                                dataItemKey="id"
                            />
                        )}
                    </div>
                    <div className='login__btn-div'>
                        <button onClick={registerUser} className='login__btn' type="button"><img className='submit' src={require('../../assets/login_button.svg')} alt="Registeration Btn" /></button>
                    </div>
                </form>
            </div>
            <div className="signUp w90 pd65__800 m-20">
                <h5 className='signUp__heading m15'><b>Already have an account</b></h5>
                <button className='login__btn'><img onClick={()=>props.openLoginComponent()} src={require('../../assets/login-btn.svg')} alt="Login Btn" /></button>
            </div>
        </>
     );
}
 
export default SignUpFormComponent;