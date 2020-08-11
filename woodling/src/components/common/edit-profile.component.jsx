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
        .then(() => hideLoader());
    }

    schema = {
        project: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Discription"),
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
            console.log('experienceChange', e.currentTarget.value)
            const data = {...this.state.addExperience}
            data[e.currentTarget.name] = e.currentTarget.value;
            this.setState({addExperience: data})
        }else {
            const data = {...this.state.myData};
            if(e.currentTarget.name==="contact") {
                const a = ValidateContact(e.currentTarget.value)
                if(a===true) {
                    data[e.currentTarget.name] = e.currentTarget.value;
                    this.setState({myData: data}, () => {
                        console.log(this.state.myData)
                    });
                }
            }
            else if(e.currentTarget.name==='bio') {
                if(e.currentTarget.value.length<=160) {
                    data[e.currentTarget.name] = e.currentTarget.value;
                    this.setState({myData: data}, () => {
                        console.log(this.state.myData)
                    });
                }
            }else{
                data[e.currentTarget.name] = e.currentTarget.value;
                this.setState({myData: data}, () => {
                    console.log(this.state.myData)
                });
            }
        }
    }

    handleDate = (name) => (e) => {
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

    handleLocation = (e) => {
        const data = {...this.state.myData}
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({myData: data}, () => {
            CastingCallService.getLocation(this.state.myData.address)
            .then((res) => {
                this.setState((prev) => ({myData: {...prev.myData, address: res.data.predictions}}), () => {
                    console.log(this.state.myData.address)
                })
            })
        })
    }

    openSkillModal = (data, event) => {
        event.preventDefault();
        this.setState({skillModal: true, data: data})
    }

    closeSkillModal = () => {
        this.setState({skillModal: false})
    }

    openExperienceModal = () => {
        this.setState({experienceModal: true});
    }

    closeExperienceModal = () => {
        this.setState({experienceModal: false})
    }

    handleSkills = (e) => {
         this.setState({mySkills: e.value})
    }

    render() {
        const { cover_picture, profile_picture, full_name, date_of_birth, address, gender, marital_status, email, phone_1, website, bio } = this.state.myData;
        const { mySkills, skillModal, data, allSkills, experienceCount, myExperience, experienceModal, allRoleType, addExperience } = this.state;
        
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
                                            <Switch />
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
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="location">Location</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch />
                                        </div>
                                    </div>
                                    <input value={address} onChange={this.handleLocation} type="text" className="form-control brder-l-r-t" id="location" name='address' />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <i className="fa fa-pencil fs15 gray" />
                                <div className="form-group w90p">
                                    <div className='d-flex space-between'>
                                        <label className='ml10 gray' for="gender">Gender</label>
                                        <div className='d-flex align-items'>
                                            <p className='mb0 mr10 fs13'>Display on profile</p>
                                            <Switch />
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
                                            <Switch />
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
                                            <Switch />
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
                                            <Switch />
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
                                            <Switch />
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
                            {mySkills.length === 0 ? null 
                            :
                            <div className='d-flex border w85'> 
                                <i className="fa fa-pencil fs15 gray border-top" />
                                <div className='form-group w90p'>
                                    <label for='bio' className='ml10'>Edit Skills</label>
                                    <div className='box-shadow p10 border-radius clr__white w400 pointer'>
                                    {mySkills.map((i, index) => {
                                        return <div className='inline-block'>
                                            <button onClick={(e)=>this.openSkillModal(i, e)} className="outline skills-text fs15">{i.name}</button>
                                        </div>;
                                    })}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className='w100p clr__white border p10'>
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
                                    <div className='form-group'></div>
                            }
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
                                        
                /> : null}
            </div>
        );
    }
}
 
export default EditProfile;