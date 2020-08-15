import React from 'react';
import { SettingService } from '../../services/Setting';
import { ToastsStore } from 'react-toasts';
import { picUrl, siteUrl } from '../../public/endpoins';
import  Joi from 'joi-browser';
import { AuthService } from '../../services/AuthService';
import { showLoader, hideLoader } from '../../public/loader';
import SelectImage from './select-image-label.component';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import ValidateContact from '../../public/contactValidator';
import { CastingCallService } from '../../services/CastingCallsService';
import { Switch } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css';
import MySkillsModal from '../../models/edit-skills-modal.component';
import AddExperience from '../../models/add-experience-modal.component';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { ActivityStreamService } from '../../services/ActivityStreamService';
import UserExperience from './profile-user-experience.component';


class EditProfile extends React.Component {
    state = {
        myData: [],
        mySkills: [],
        myExperience: [],
        experienceCount: '',
        skillModal: false,
        experienceModal: false,
        addExperience: {
            project: '',
            skill_id: 0,
            role_type: 0,
            company: '',
            location: '',
            start_date: '',
            end_date: '',
            desciption: ''
        },
        data: [],
        allSkills: [],
        allRoleType: [],
        errors: {},
        profileSwitches: [],
        selectedLocation: '',
        description: '',
        formatted_address:'',
        locations: [],
        isLocationLoading: false,
        hideField: false,
        experienceStyle: true,
        updateExperience: false
    }
    async componentDidMount() {
        showLoader();
        await SettingService.myData()
        .then((res) => {
            this.setState({myData: res.data.data, mySkills: res.data.user_roles, myExperience: res.data.user_experience, experienceCount: res.data.user_experience_count}, () => {
                console.log('myData', res.data)
            })
        }).catch((e) => console.log(e))

        await SettingService.getSkills()
        .then((res) => {
            this.setState({allSkills: res.data.data});
        }).catch((e) => console.log(e))

        await CastingCallService.getRoleType()
        .then((res) => {
            this.setState({allRoleType: res.data.data});
        }).catch((e) => console.log(e))

        await SettingService.getSettingProfile()
        .then((res) => {
            this.setState({profileSwitches: res.data.settings_profile})
        }).catch((e) => console.log(e))

        .then(() => hideLoader());
    }

    schema = {
        project: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Discription"),
        company: Joi.string().required().label("company"),
        start_date: Joi.string().required().label("Start Date"),
        end_date: Joi.string().required().label("Deadline"),
        skill_id: Joi.string(),
        location: Joi.string().required().label('Location'),
        role_type: Joi.string().required().label('Role Type'),
    }

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        console.log(schema)
        const {error} = Joi.validate(obj, schema);
        console.log(error);
        return error ? error.details[0].message : null;
      }
  
      validation = () => {
        console.log('Validation')
        const result = Joi.validate(this.state.addExperience, this.schema, {
          abortEarly: false
        });
        if(!result.error) return null;
  
        const errors = {};
        for(let item of result.error.details){
          errors[item.path[0]] = item.message;
        }
        return errors;
    }

    openCover = async (e) => {
        const pic = e.currentTarget.files[0];
        if(pic) {
            const fd = new FormData();
            fd.append('user_id', AuthService.getUserId());
            fd.append('type', 'cover_photo');
            fd.append('photo', pic);
            showLoader();
            await SettingService.postCover(fd)
            .then((res) => {
                if(res.data.status !== 'error'){
                    this.setState((prev) => ({myData: {...prev.myData, cover_picture: res.data.path}}))
                    ToastsStore.success(res.data.message); 
                }else{
                    console.log('error')
                    ToastsStore.error(res.message); 
                }
            })
            .catch((e)=> console.error("error: "+ e))
            .then(() => hideLoader());
        }
        else {
            console.log('no select')
        }
    }

    openProfile = async (e) => {
        const pic = e.currentTarget.files[0];
        console.log(pic)
        if(pic) {
            const fd = new FormData();
            fd.append('user_id', AuthService.getUserId());
            fd.append('type', 'profile_photo');
            fd.append('photo', pic);
            showLoader();
            await SettingService.postProfile(fd)
            .then((res) => {
                if(res.data.status !== 'error'){
                    this.setState((prev) => ({myData: {...prev.myData, profile_picture: res.data.path}}))
                    ToastsStore.success(res.data.message); 
                }else{
                    console.log('error')
                    ToastsStore.error(res.message); 
                }
            })
            .catch((e)=> console.error("error: "+ e))
            .then(() => hideLoader());
        }
        else {
            console.log('no select')
        }
    }

    handleChange = (e) => {
        if(this.state.experienceModal === true) {
            const errors = {...this.state.errors};
            const errorMessage = this.validateProperty(e.currentTarget);
            if(errorMessage) {
                console.log(errorMessage)
                errors[e.currentTarget.name] = errorMessage;
            }else {
                delete errors[e.currentTarget.name];
            }
            if(e.currentTarget.name==='description') {
                if(e.currentTarget.value.length<=200) {
                    const data = {...this.state.addExperience}
                    data[e.currentTarget.name] = e.currentTarget.value;
                    this.setState({addExperience: data})
                }
            }
            const data = {...this.state.addExperience}
            data[e.currentTarget.name] = e.currentTarget.value;
            this.setState({addExperience: data})
        }else {
            const data = {...this.state.myData};
            if(e.currentTarget.name==="contact") {
                const a = ValidateContact(e.currentTarget.value)
                if(a===true) {
                    data[e.currentTarget.name] = e.currentTarget.value;
                    this.setState({myData: data});
                }
            }
            else if(e.currentTarget.name==='bio') {
                if(e.currentTarget.value.length<=160) {
                    data[e.currentTarget.name] = e.currentTarget.value;
                    this.setState({myData: data});
                }
            }else{
                data[e.currentTarget.name] = e.currentTarget.value;
                this.setState({myData: data});
            }
        }
    }

    handleDate = (name) => (e) => {
        console.log('datename', name)
        if(this.state.experienceModal===true) {
            const date = new Date(e).toLocaleDateString('en-GB')
            const addExperience = {...this.state.addExperience};
            addExperience[name] = date;
            this.setState({addExperience})
            console.log(new Date(e).toLocaleDateString('en-GB'));
        }else {
            const date = new Date(e).toLocaleDateString('en-GB')
            const myData = {...this.state.myData};
            myData[name] = date;
            this.setState({myData})
            console.log(new Date(e).toLocaleDateString('en-GB'));
        }
    }

    disablePastDt = current => {
        const yesterday = moment().subtract(1, 'day');
        return current.isAfter(yesterday);
    }

    disableDeadlineDt = current => {
    const yesterday = moment().subtract(0, 'day');
    return current.isAfter(yesterday);
    }

    handleLocation = (location) => { 
        if(this.state.experienceModal===true) {
            if(location && location.length > 0){
                this.setState({selectedLocation: location[0]}, () => {
                    const {selectedLocation}= this.state;
                    ActivityStreamService.getLocationDetailByPlaceId(selectedLocation.place_id)
                    .then((response) => {
                        const res= response.data.results[0];
                        const address = selectedLocation.description.split(',');
                        this.setState((prev) => ({addExperience: {...prev.addExperience, location: res.formatted_address}}))
                    })
                })
            }
        }else {
            if(location && location.length > 0){
                this.setState({selectedLocation: location[0]}, () => {
                    const {selectedLocation}= this.state;
                    ActivityStreamService.getLocationDetailByPlaceId(selectedLocation.place_id)
                    .then((response) => {
                        const res= response.data.results[0];
                        const address = selectedLocation.description.split(',');
                        this.setState((prev) => ({myData: {...prev.myData, address: res.formatted_address}}))
                    })
                })
            }
        }
    }

    handleLocationSearch = (e) =>{ 
        const data = {...this.state.myData}
        this.setState({isLocationLoading: true});
        CastingCallService.getLocation(e)
        .then((res) => {
            this.setState({isLocationLoading: false, locations: res.data.predictions});
        })
    }

    openZeroSkillModal = (e) => {
        e.preventDefault();
        this.setState({skillModal: true})
    }

    openSkillModal = (data, event) => {
        event.preventDefault();
        this.setState({skillModal: true, data: data})
    }

    closeSkillModal = async (e) => {
        e.preventDefault();
        console.log(this.state.mySkills)
        await this.state.mySkills.map((i, index) => {
            const skills = {user_id: AuthService.getUserId(), type: 'skills', skillset: i.id}
            SettingService.UpdateUserDetail(skills)
            .then((res) => {
                if(res.data.status !== 'error'){
                    this.setState({skillModal: false}) 
                    ToastsStore.success(res.data.message); 
                }else{
                    console.log('error')
                    ToastsStore.error(res.message); 
                }
            })
        })       
    }

    openExperienceModal = (data) => {
        this.setState({experienceModal: true, addExperience: data});
    }

    openUpdateExperienceModal = (data) => {
        console.log(data)
        this.setState({experienceModal: true, addExperience: data, updateExperience: true}, () => {
            this.setState((prev) => ({addExperience: {...prev.addExperience, skill_id: data.role_id, role_type: data.role_type_id}}))
        });
    }

    closeExperienceModal = () => {
        this.setState({experienceModal: false})
    }

    handleSkills = async(e) => {
        console.log(e) 
        this.setState({mySkills: e.value})
    }

    handleAddExperienceButton = async (e) => {
        e.preventDefault();
        if(this.state.updateExperience) {
            const data = {id: this.state.addExperience.experience_id, user_id: AuthService.getUserId(), type: 'edit_experience', project: this.state.addExperience.project, skill_id: this.state.addExperience.skill_id, role_type: this.state.addExperience.role_type, company: this.state.addExperience.company, location: this.state.addExperience.location, start_date: this.state.addExperience.start_date, end_date: this.state.addExperience.end_date, description: this.state.addExperience.desciption }
            showLoader();
            await SettingService.addExperience(data)
            .then((res) => {
                if(res.data.status !== 'error'){
                    SettingService.myData()
                    .then((res) => {
                        this.setState({myExperience: res.data.user_experience, experienceModal: false})
                    })
                    ToastsStore.success(res.data.message); 
                }else{
                    console.log('error')
                    ToastsStore.error(res.message); 
                }
            })
            .catch((e)=> console.error("error: "+ e))
            .then(() => hideLoader());
        }else {
            const fd = new FormData();
            fd.append('user_id', AuthService.getUserId());
            fd.append('type', 'add_experience');
            fd.append('project', this.state.addExperience.project);
            fd.append('skill_id', this.state.addExperience.skill_id);
            fd.append('role_type', this.state.addExperience.role_type);
            fd.append('company', this.state.addExperience.company);
            fd.append('location', this.state.addExperience.location);
            fd.append('start_date', this.state.addExperience.start_date);
            fd.append('end_date', this.state.addExperience.end_date);
            fd.append('description', this.state.addExperience.description);
            showLoader();
            await SettingService.addExperience(fd)
            .then((res) => {
                if(res.data.status !== 'error'){
                    this.setState({experienceModal: false});
                    ToastsStore.success(res.data.message); 
                }else{
                    console.log('error')
                    ToastsStore.error(res.message); 
                }
            })
            .catch((e)=> console.error("error: "+ e))
            .then(() => hideLoader());
        }  
    }

    handleUpdateProfile = async (e) => {
        e.preventDefault();
        const { full_name, date_of_birth, address, gender, marital_status, email, phone_1, website, bio } = this.state.myData;
        const data = {user_id: AuthService.getUserId(), type: 'user_details', full_name: full_name, date_of_birth: date_of_birth, description: bio, gender: gender, marital_status: marital_status, website: website, address: address}
        showLoader();
        await SettingService.UpdateUserDetail(data)
        .then((res) => {
            if(res.data.status !== 'error'){
                this.setState({experienceModal: false});
                ToastsStore.success(res.data.message); 
            }else{
                console.log('error')
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
        .then(() => hideLoader());
        console.log(this.state.mySkills);
    }

    handleSwitchChange = (e) => {
        const data = {...this.state.profileSwitches};
        if(this.state.profileSwitches[e.target.name]==='1') {
            data[e.target.name] = false;
            this.setState({profileSwitches: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.profileSwitches[e.target.name])}
                SettingService.UpdateUserDetail(data)
                .then((res) => {
                    if(res.data.status !== 'error'){
                        ToastsStore.success(res.data.message); 
                    }else{
                        console.log('error')
                        ToastsStore.error(res.message);
                    }
                })
                .catch((e)=> console.error("error: "+ e))
            });
        }
        else if(this.state.profileSwitches[e.target.name]==='0') {
            data[e.target.name] = true;
            this.setState({profileSwitches: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.profileSwitches[e.target.name])}
                SettingService.UpdateUserDetail(data)
                .then((res) => {
                    if(res.data.status !== 'error'){
                        ToastsStore.success(res.data.message); 
                    }else{
                        console.log('error')
                        ToastsStore.error(res.message); 
                    }
                })
                .catch((e)=> console.error("error: "+ e))
            });
        }
        else if(this.state.profileSwitches[e.target.name]===true) {
            data[e.target.name] = false;
            this.setState({profileSwitches: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.profileSwitches[e.target.name])}
                SettingService.UpdateUserDetail(data)
                .then((res) => {
                    if(res.data.status !== 'error'){
                        ToastsStore.success(res.data.message); 
                    }else{
                        console.log('error')
                        ToastsStore.error(res.message); 
                    }
                })
                .catch((e)=> console.error("error: "+ e))
            });
        }
        else if(this.state.profileSwitches[e.target.name]===false) {
            data[e.target.name] = true;
            this.setState({profileSwitches: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.profileSwitches[e.target.name])}
                SettingService.UpdateUserDetail(data)
                .then((res) => {
                    if(res.data.status !== 'error'){
                        ToastsStore.success(res.data.message); 
                    }else{
                        console.log('error')
                        ToastsStore.error(res.message); 
                    }
                })
                .catch((e)=> console.error("error: "+ e))
            });
        }
    }

    render() {
        const { cover_picture, profile_picture, full_name, date_of_birth, address, gender, marital_status, email, phone_1, website, bio } = this.state.myData;
        const { mySkills, skillModal, data, allSkills, experienceCount, locations, errors, experienceModal, allRoleType, addExperience, isLocationLoading, myExperience, experienceStyle, updateExperience } = this.state;
        const { birthday_display, location_display, gender_display, marital_status_display, email_display, phone_display, website_display } = this.state.profileSwitches;
        return ( 
            <div>
                <div className='cover-photo position-relative'>
                    {cover_picture ? <img src={siteUrl+""+cover_picture} style={{width: '100%', height: '230px', position: 'absolute'}} /> : null}
                    <SelectImage 
                        name='cover_picture' 
                        id='selectCover' 
                        classy='fa fa-camera fs50'
                        openSelector={this.openCover} 
                    />
                </div>
                <div className='d-flex justify-content-center position-relative pb30'>
                    {profile_picture ? <img className='border-radius60 m-50 z-index w10p h85' src={siteUrl+""+profile_picture} alt="profile-img" /> : null}
                    <SelectImage 
                        name='profile_picture' 
                        id='selectProfile' 
                        classy='fa fa-camera fs30' 
                        openSelector={this.openProfile} 
                    />
                </div>
                <form>
                    <div className='d-flex'>
                        <div className='w50 border'>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <label className='ml10 gray' for="name">Name</label>
                                    <input value={full_name} onChange={this.handleChange} type="text" className="form-control brder-l-r-t mt-10" id="name" name='full_name' />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="birth">Birthday</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13 fs13'>Display on profile</p>
                                            <Switch name='birthday_display' checked={Boolean(birthday_display)} onChange={this.handleSwitchChange} />
                                        </div>
                                    </div>
                                    <DatePicker
                                        value={date_of_birth}
                                        onChange={this.handleDate('date_of_birth')}
                                        className="form-control dates border-none "
                                    />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className=" w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="location">Location</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch name='location_display' checked={Boolean(location_display)} onChange={this.handleSwitchChange} />
                                        </div>
                                    </div>
                                        <AsyncTypeahead
                                            id="location_typehead"
                                            labelKey="description"
                                            isLoading={isLocationLoading}
                                            placeholder="Search for a Location (type min 3 char)"
                                            minLength={3}
                                            onSearch={this.handleLocationSearch}
                                            onChange={this.handleLocation}
                                            options={locations}
                                            className= "form-control box-shadow-none border-none brder-l-r-t mb20" 
                                        />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="gender">Gender</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch name='gender_display' checked={Boolean(gender_display)} onChange={this.handleSwitchChange} />
                                        </div>
                                    </div>
                                    <select name="gender" value={gender==='null' ? 'Rather not say' : gender} onChange={this.handleChange} id="gender" className="form-control brder-l-r-t" placeholder='Gender'>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Transgender'>Transgender</option>
                                        <option value='Rather not say'>Rather not say</option>
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="marital_status">Marital Status</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch name='marital_status_display' checked={Boolean(marital_status_display)} onChange={this.handleSwitchChange} />
                                        </div>
                                    </div>
                                    <select name="marital_status" value={marital_status==='null' ? 'Rather not say' : marital_status} onChange={this.handleChange} id="marital_status" className="form-control brder-l-r-t" placeholder='marital_status'>
                                        <option value='Single'>Single</option>
                                        <option value='Married'>Married</option>
                                        <option value='Seperated'>Seperated</option>
                                        <option value='Divorced'>Divorced</option>
                                        <option value='Complicated'>Complicated</option>
                                        <option value='Rather not say'>Rather not say</option>
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="email">Email</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch name='email_display' checked={Boolean(email_display)} onChange={this.handleSwitchChange} />
                                        </div>
                                    </div>
                                    <input value={email} onChange={this.handleChange} type="text" className="form-control brder-l-r-t" id="email" name='email' />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="contact">Phone Number</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch name='phone_display' checked={Boolean(phone_display)} onChange={this.handleSwitchChange} />
                                        </div>
                                    </div>
                                    <input value={phone_1} onChange={this.handleChange} type="text" className="form-control brder-l-r-t" id="contact" name='phone_1' placeholder='Not Set' />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="website">Website</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch name='website_display' checked={Boolean(website_display)} onChange={this.handleSwitchChange} />
                                        </div>
                                    </div>
                                    <input value={website==='null'?"":null} onChange={this.handleChange} type="text" className="form-control brder-l-r-t" id="website" name='website' placeholder='Not Set' />
                                </div>
                            </div>
                        </div>
                        <div className='w50'>
                            <div className='d-flex border'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className='form-group w90p'>
                                    <div className='d-flex space-between'>
                                        <label for='bio' className='ml10'>Edit Bio</label>
                                        <p className='gray fs12'>160 characters</p>
                                    </div>
                                    <textarea value={bio==='null' ? '' : bio} onChange={this.handleChange} className="form-control" placeholder='Say Something...' rows="8" name='bio' id='bio' />
                                </div>
                            </div>
                            
                            <div className='d-flex border w85'> 
                                <i className="fa fa-pencil fs15 gray border-top" />
                                <div className='form-group w90p'>
                                    <label for='bio' className='ml10'>Edit Skills</label>
                                    {mySkills.length === 0 ? <div className='box-shadow p10 border-radius clr__white w400 pointer'>
                                    <button onClick={this.openZeroSkillModal} className="outline skills-text fs15">Add Skills</button>
                                    </div> 
                                        :
                                    <div className='box-shadow p10 border-radius clr__white w400 pointer'>
                                    {mySkills.map((i, index) => {
                                        return <div className='inline-block'>
                                            <button key={index} onClick={(e)=>this.openSkillModal(i, e)} className="outline skills-text fs15">{i.name}</button>
                                        </div>;
                                    })}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w100p clr__white border p10 pb10'>
                        <div className='d-flex flex-dir-col'>
                           <div className='d-flex'>
                            <i className="fa fa-pencil fs15 gray" />
                                <div className='d-flex space-between w100p'>
                                <label for='bio' className='ml10'>Edit Experience</label>
                                    <div onClick={this.openExperienceModal} className='d-flex pointer align-items-center'>
                                        <i className='fa fa-plus red' />
                                        <p className='mb0 red'><b>Add</b></p>
                                    </div>
                                </div>
                           </div>
                            {experienceCount===0 ? <p>No Experience Exist</p> 
                                    :
                                    <div> 
                                        <UserExperience 
                                            userExperience={myExperience} 
                                            experienceStyle={experienceStyle} 
                                            openExperienceModal={this.openUpdateExperienceModal}
                                            />
                                    </div>   
                            }
                        </div>    
                    </div>
                    <div className='d-flex justify-content-center mt10 transition'>
                        <button onClick={this.handleUpdateProfile} className="outline skills-btn box-shadow-red transform transition">Update Profile</button>
                    </div>
                </form>
                {skillModal ? <MySkillsModal
                                skillModal={skillModal}
                                data={mySkills}
                                closeSkillModal={this.closeSkillModal}
                                allSkills={allSkills}
                                handleSkills={this.handleSkills}
                /> : null}
                {experienceModal ? <AddExperience
                                        experienceModal={experienceModal}
                                        closeExperienceModal={this.closeExperienceModal}
                                        allSkills={allSkills}
                                        allRoleType={allRoleType}
                                        disablePastDt={this.disablePastDt}
                                        disableDeadlineDt={this.disableDeadlineDt}
                                        addExperience={addExperience}
                                        handleChange={this.handleChange}
                                        locations={locations}
                                        handleLocationSearch={this.handleLocationSearch}
                                        handleLocation={this.handleLocation}
                                        isLocationLoading={isLocationLoading}
                                        handleDate={this.handleDate}
                                        errors={errors}
                                        handleAddExperienceButton={this.handleAddExperienceButton}
                                        updateExperience={updateExperience}
                                        handleUpdateExperience={this.handleUpdateExperience}
                /> : null}
            </div>
        );
    }
}
 
export default EditProfile;