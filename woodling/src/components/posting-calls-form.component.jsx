import React, {Component} from 'react';
import  Joi from 'joi-browser';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

const gender = [
    {
        key: 0,
        value: 'Any/All'
    },
    {
        key: 1,
        value: 'Male'
    },
    {
        key: 2,
        value: 'Female'
    },
    {
        key: 3,
        value: 'Others'
    }
]

const roleType = [
    {
        "name": "",
        "id": "40"
      },
      {
        "name": "2 role type",
        "id": "30"
      },
      {
        "name": "3 role type",
        "id": "31"
      },
      {
        "name": "56 role type",
        "id": "33"
      },
      {
        "name": "A young boy",
        "id": "53"
      },
      {
        "name": "ambassadorial",
        "id": "15"
      },
      {
        "name": "another role type",
        "id": "32"
      },
      {
        "name": "Black Jaguar",
        "id": "55"
      },
      {
        "name": "Boss Lady",
        "id": "39"
      },
      {
        "name": "Brand Ambassador",
        "id": "12"
      },
      {
        "name": "Brand Ambassador Enugu",
        "id": "13"
      },
      {
        "name": "Brand Ambassador for Enugu City",
        "id": "14"
      },
      {
        "name": "cable boy",
        "id": "50"
      },
      {
        "name": "cold spells",
        "id": "35"
      },
      {
        "name": "coming",
        "id": "26"
      },
      {
        "name": "CornBread",
        "id": "48"
      },
      {
        "name": "crew",
        "id": "4"
      },
      {
        "name": "Custom",
        "id": "29"
      },
      {
        "name": "Dark fuse",
        "id": "10"
      },
      {
        "name": "dom",
        "id": "27"
      },
      {
        "name": "Driver",
        "id": "6"
      },
      {
        "name": "edited role type 2",
        "id": "43"
      },
      {
        "name": "Escort",
        "id": "5"
      },
      {
        "name": "extra",
        "id": "3"
      },
      {
        "name": "Fifth in command",
        "id": "18"
      },
      {
        "name": "For Cape Town",
        "id": "11"
      },
      {
        "name": "Hunk",
        "id": "9"
      },
      {
        "name": "lead",
        "id": "1"
      },
      {
        "name": "Let dance",
        "id": "36"
      },
      {
        "name": "Live Band",
        "id": "49"
      },
      {
        "name": "Loki",
        "id": "51"
      },
      {
        "name": "Longest",
        "id": "21"
      },
      {
        "name": "New",
        "id": "24"
      },
      {
        "name": "New role",
        "id": "23"
      },
      {
        "name": "Poet",
        "id": "17"
      },
      {
        "name": "Role",
        "id": "22"
      },
      {
        "name": "Rolee",
        "id": "19"
      },
      {
        "name": "Roler",
        "id": "20"
      },
      {
        "name": "Second in command",
        "id": "8"
      },
      {
        "name": "second role type",
        "id": "42"
      },
      {
        "name": "seeyou",
        "id": "28"
      },
      {
        "name": "Seth",
        "id": "52"
      },
      {
        "name": "spring",
        "id": "44"
      },
      {
        "name": "support",
        "id": "2"
      },
      {
        "name": "Test type",
        "id": "47"
      },
      {
        "name": "Test typee",
        "id": "46"
      },
      {
        "name": "Test typeee",
        "id": "45"
      },
      {
        "name": "testing role type",
        "id": "41"
      },
      {
        "name": "Thats the way",
        "id": "37"
      },
      {
        "name": "The ringer",
        "id": "34"
      },
      {
        "name": "Tiger",
        "id": "56"
      },
      {
        "name": "trickster",
        "id": "38"
      },
      {
        "name": "Twins",
        "id": "7"
      },
      {
        "name": "Voice cast",
        "id": "54"
      }
]

const productionType = [
    {
        "name": "",
        "id": "36"
      },
      {
        "name": "A production Type",
        "id": "41"
      },
      {
        "name": "A true story",
        "id": "44"
      },
      {
        "name": "abcd",
        "id": "37"
      },
      {
        "name": "animation",
        "id": "1"
      },
      {
        "name": "App testing",
        "id": "49"
      },
      {
        "name": "Brand Ambassador",
        "id": "25"
      },
      {
        "name": "choreography",
        "id": "14"
      },
      {
        "name": "commercial",
        "id": "2"
      },
      {
        "name": "competition",
        "id": "24"
      },
      {
        "name": "Conference",
        "id": "22"
      },
      {
        "name": "Custom",
        "id": "42"
      },
      {
        "name": "Dance photographer",
        "id": "31"
      },
      {
        "name": "documentary",
        "id": "6"
      },
      {
        "name": "Edited production type",
        "id": "46"
      },
      {
        "name": "fantasy adventure film",
        "id": "48"
      },
      {
        "name": "featured film",
        "id": "9"
      },
      {
        "name": "Gaming",
        "id": "21"
      },
      {
        "name": "I think this works",
        "id": "33"
      },
      {
        "name": "music video",
        "id": "13"
      },
      {
        "name": "musical",
        "id": "3"
      },
      {
        "name": "new production",
        "id": "43"
      },
      {
        "name": "New production type",
        "id": "45"
      },
      {
        "name": "New prouct",
        "id": "40"
      },
      {
        "name": "New role",
        "id": "35"
      },
      {
        "name": "Other call",
        "id": "29"
      },
      {
        "name": "play",
        "id": "7"
      },
      {
        "name": "print modelling",
        "id": "19"
      },
      {
        "name": "reality show",
        "id": "16"
      },
      {
        "name": "runway modelling",
        "id": "18"
      },
      {
        "name": "Sailor",
        "id": "26"
      },
      {
        "name": "saturday testing",
        "id": "39"
      },
      {
        "name": "short film",
        "id": "12"
      },
      {
        "name": "skilltest",
        "id": "27"
      },
      {
        "name": "Some new production type",
        "id": "32"
      },
      {
        "name": "sports",
        "id": "4"
      },
      {
        "name": "Stylist",
        "id": "30"
      },
      {
        "name": "Tera Hawks",
        "id": "47"
      },
      {
        "name": "Test",
        "id": "34"
      },
      {
        "name": "Thrbrb",
        "id": "23"
      },
      {
        "name": "thriller",
        "id": "28"
      },
      {
        "name": "TV program",
        "id": "20"
      },
      {
        "name": "TV series",
        "id": "10"
      },
      {
        "name": "wer",
        "id": "38"
      }
]

const skills = [
    {
        "name": "accountant",
        "id": "36"
      },
      {
        "name": "actor",
        "id": "1"
      },
      {
        "name": "actress",
        "id": "37"
      },
      {
        "name": "agent",
        "id": "38"
      },
      {
        "name": "animator",
        "id": "39"
      },
      {
        "name": "art director",
        "id": "40"
      },
      {
        "name": "assistant director",
        "id": "41"
      },
      {
        "name": "assistant editor",
        "id": "42"
      },
      {
        "name": "author",
        "id": "43"
      },
      {
        "name": "baggies",
        "id": "156"
      },
      {
        "name": "boom operator",
        "id": "44"
      },
      {
        "name": "brand ambassador",
        "id": "142"
      },
      {
        "name": "camera operator",
        "id": "45"
      },
      {
        "name": "career advisor",
        "id": "46"
      },
      {
        "name": "cast PA",
        "id": "47"
      },
      {
        "name": "casting director",
        "id": "48"
      },
      {
        "name": "caterers",
        "id": "49"
      },
      {
        "name": "choreographer",
        "id": "9"
      },
      {
        "name": "colorist",
        "id": "50"
      },
      {
        "name": "comedian",
        "id": "51"
      },
      {
        "name": "composer",
        "id": "52"
      },
      {
        "name": "costume designer",
        "id": "53"
      },
      {
        "name": "dancer",
        "id": "54"
      },
      {
        "name": "data wrangler",
        "id": "55"
      },
      {
        "name": "designer",
        "id": "10"
      },
      {
        "name": "digital artist",
        "id": "56"
      },
      {
        "name": "digital imaging technician",
        "id": "57"
      },
      {
        "name": "director",
        "id": "3"
      },
      {
        "name": "director of photography",
        "id": "58"
      },
      {
        "name": "dron pilot",
        "id": "59"
      },
      {
        "name": "editor",
        "id": "60"
      },
      {
        "name": "education and film festivals",
        "id": "61"
      },
      {
        "name": "electrician",
        "id": "62"
      },
      {
        "name": "engineer",
        "id": "63"
      },
      {
        "name": "entertainer",
        "id": "11"
      },
      {
        "name": "executive producer",
        "id": "64"
      },
      {
        "name": "field recording",
        "id": "65"
      },
      {
        "name": "film editing",
        "id": "66"
      },
      {
        "name": "film editor",
        "id": "67"
      },
      {
        "name": "film electrician",
        "id": "68"
      },
      {
        "name": "film finance",
        "id": "69"
      },
      {
        "name": "film music",
        "id": "70"
      },
      {
        "name": "film sound and color",
        "id": "71"
      },
      {
        "name": "foley engineer",
        "id": "72"
      },
      {
        "name": "graphic designer",
        "id": "73"
      },
      {
        "name": "greens man",
        "id": "74"
      },
      {
        "name": "health and safety",
        "id": "75"
      },
      {
        "name": "illustrator",
        "id": "76"
      },
      {
        "name": "image builder",
        "id": "78"
      },
      {
        "name": "intellectual property lawyers",
        "id": "79"
      },
      {
        "name": "lead man",
        "id": "80"
      },
      {
        "name": "legal counsel",
        "id": "81"
      },
      {
        "name": "lighting",
        "id": "82"
      },
      {
        "name": "lighting technician",
        "id": "83"
      },
      {
        "name": "line producer",
        "id": "84"
      },
      {
        "name": "location assistant",
        "id": "85"
      },
      {
        "name": "location manager",
        "id": "86"
      },
      {
        "name": "location scout",
        "id": "87"
      },
      {
        "name": "make-up artist",
        "id": "88"
      },
      {
        "name": "manager",
        "id": "4"
      },
      {
        "name": "mentorship",
        "id": "89"
      },
      {
        "name": "model",
        "id": "90"
      },
      {
        "name": "motion control technician",
        "id": "91"
      },
      {
        "name": "movie development",
        "id": "92"
      },
      {
        "name": "Mowgli",
        "id": "157"
      },
      {
        "name": "music composer",
        "id": "93"
      },
      {
        "name": "music supervisor",
        "id": "94"
      },
      {
        "name": "online editor",
        "id": "95"
      },
      {
        "name": "organizer",
        "id": "12"
      },
      {
        "name": "performer",
        "id": "96"
      },
      {
        "name": "post production supervisor",
        "id": "97"
      },
      {
        "name": "producer",
        "id": "2"
      },
      {
        "name": "production accountant",
        "id": "99"
      },
      {
        "name": "production art",
        "id": "100"
      },
      {
        "name": "production assistant",
        "id": "101"
      },
      {
        "name": "production designer",
        "id": "102"
      },
      {
        "name": "production sound",
        "id": "103"
      },
      {
        "name": "production specialty",
        "id": "104"
      },
      {
        "name": "production supervisor",
        "id": "105"
      },
      {
        "name": "programme researcher",
        "id": "106"
      },
      {
        "name": "project manager",
        "id": "107"
      },
      {
        "name": "props builder",
        "id": "108"
      },
      {
        "name": "props master",
        "id": "109"
      },
      {
        "name": "Puppet",
        "id": "158"
      },
      {
        "name": "re recording mixer",
        "id": "110"
      },
      {
        "name": "represantion",
        "id": "111"
      },
      {
        "name": "runner",
        "id": "112"
      },
      {
        "name": "screen writers",
        "id": "113"
      },
      {
        "name": "script editor",
        "id": "114"
      },
      {
        "name": "set builder/designer",
        "id": "115"
      },
      {
        "name": "set decorator",
        "id": "116"
      },
      {
        "name": "set designer",
        "id": "117"
      },
      {
        "name": "set dresser",
        "id": "118"
      },
      {
        "name": "sound mixer",
        "id": "119"
      },
      {
        "name": "sound technician",
        "id": "120"
      },
      {
        "name": "steadicam operator",
        "id": "121"
      },
      {
        "name": "story supervisor",
        "id": "123"
      },
      {
        "name": "storyboard artist",
        "id": "124"
      },
      {
        "name": "stunt coordinator",
        "id": "125"
      },
      {
        "name": "stunt performer",
        "id": "122"
      },
      {
        "name": "subtitles",
        "id": "126"
      },
      {
        "name": "technician",
        "id": "127"
      },
      {
        "name": "videographer",
        "id": "128"
      },
      {
        "name": "visual effects",
        "id": "129"
      },
      {
        "name": "voice over artist",
        "id": "130"
      },
      {
        "name": "wardrobe supervisor",
        "id": "131"
      },
      {
        "name": "We made it",
        "id": "154"
      },
      {
        "name": "weapons master",
        "id": "132"
      },
      {
        "name": "Westerners",
        "id": "155"
      }
]

class PostingCallsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderChange: '',
            addRole: [],
            postingCalls: {
                title: '',
                production_type: '',
                skill_id: '',
                description: '',
                start_date: '',
                application_deadline: '',
                formatted_address: '',
                lat: '',
                lng: '',
                country: '',
                city: '',
                date_venue	: '',
                roles_count: '',
                user_id: '',
                paid: '',
                amount_paid: '',
                payment_used: '',
                lookingFor: ''
            },
            role_type: [
                {
                     role_type_id: '',
                     role_description: '',
                     gender: 'Any/All',
                     age_from: '',
                     age_to: ''
                } 
            ],
            errors: {}
        }
    }
    schema = {
        title: Joi.string().required().label("Title"),
        production_type: Joi.string().required().label("Production Type"),
        description: Joi.string().required().label("Discription"),
        start_date: Joi.string().required().label("Start Date"),
        application_deadline: Joi.string().required().label("Application Deadline"),
        date_venue: Joi.string(),
        skill_id: Joi.string(),
        formatted_address: Joi.string(),
        lat: Joi.string(),
        lng: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        role_type_id: Joi.string().required().label('Role Type'),
        role_description: Joi.string(),
        gender: Joi.string(),
        age_from: Joi.string().required().label('Age From'),
        age_to: Joi.string().required().label('Age to')
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
        const result = Joi.validate(this.state.postingCalls, this.schema, {
          abortEarly: false
        });
        if(!result.error) return null;
  
        const errors = {};
        for(let item of result.error.details){
          errors[item.path[0]] = item.message;
        }
        return errors;
    }
    validationOfRoletype = () => {
      console.log('Validation')
        const result = Joi.validate(this.state.role_type, this.schema, {
          abortEarly: false
        });
        if(!result.error) return null;
  
        const errors = {};
        for(let item of result.error.details){
          errors[item.path[0]] = item.message;
        }
        return errors;
    }
    handleChange = (e) => {
        console.log(e.currentTarget.value);
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        console.log('Handle Change validation');
        console.log(errorMessage);
        if(errorMessage) {
            console.log(errorMessage)
            errors[e.currentTarget.name] = errorMessage;
        }else {
            delete errors[e.currentTarget.name];
        }
        const postingCalls = {...this.state.postingCalls};
        postingCalls[e.currentTarget.name] = e.currentTarget.value;
        this.setState({postingCalls, errors})
    }
    handleRoleType = (index) => (e) => {
        console.log(e.currentTarget)
        console.log(index)
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        console.log('Handle Change validation');
        console.log(errorMessage);
        if(errorMessage) {
            console.log(errorMessage)
            errors[e.currentTarget.name] = errorMessage;
        }else {
            delete errors[e.currentTarget.name];
        }
        let role_type = [...this.state.role_type];
        let item = {...role_type[index]};
        item[e.currentTarget.name] = e.currentTarget.value;
        role_type[index] = item;
        this.setState({role_type, errors})
    }
    handleDate = (name) => (e) => {
      console.log(e)
      console.log(name);
      const date = new Date(e).toLocaleDateString('en-GB')
      console.log(date);
      // const errors = {...this.state.errors};
      // const errorMessage = this.validateProperty(e);
      // console.log('Handle Change validation');
      // console.log(errorMessage);
      // if(errorMessage) {
      //     console.log(errorMessage)
      //     errors[name] = errorMessage;
      // }else {
      //     delete errors[name];
      // }
      const postingCalls = {...this.state.postingCalls};
      postingCalls[name] = date;
      this.setState({postingCalls})
      console.log(new Date(e).toLocaleDateString('en-GB'));
    }

    disablePastDt = current => {debugger
      // const yesterday = moment().subtract(1, 'day');
      return true;
      // return current.isAfter(yesterday);
    };

    handleGenderChange = (data) => {
        this.setState({genderChange: data})
    }
    addRole = () => {
        let role_type = [...this.state.role_type]
        role_type.push({
            role_type_id: '',
            role_description: '',
            gender: 'Any/All',
            age_from: '',
            age_to: ''
        })
        this.setState({role_type})
    }
    render() {
        const {genderChange, title, production_type, description, start_date, application_deadline, date_venue, skill_id} = this.state.postingCalls
        const {role_type} = this.state;
        return ( 
            <div className='h100p scrolling'>
                <div className="row d-flex m0">
                    <div className="col-md-8 br-white pl100">
                        <div className='mt20'>
                            <h1><b>Post A Casting Call</b></h1>
                            <p><b>Note:</b>Posting a casting call costs $5 ifyou don't have free calls.<br/>For more information on posting a casting call <Link>Learn more</Link></p>
                        </div>
                        <form onSubmit='' className='forms'>
                            <div className='clr__white p35 border-radius'>
                                <p className='fs25 alignCenter'><b>Casting Call Details</b></p>
                                <div className="form-group">
                                    <label>Title:*</label>
                                    <input 
                                        type="text" 
                                        name='title'
                                        value={title} 
                                        onChange={this.handleChange}
                                        className="form-control no-border-input" 
                                        placeholder="Write title here" />
                                    {/* {props.usernameError && <p className="alert alert-danger error">{props.usernameError}</p>} */}
                                </div>
                                <div className="form-group">
                                <label>Production Type:*</label>
                                <select value={production_type} onChange={this.handleChange} name="production_type" id="inputState" className="form-control w35 bold box-shadow-none" placeholder='Gender'>
                                    {productionType.map((i, index) => {
                                        return <option value={i.name}>{i.name}</option>
                                    })}
                                </select> 
                                    {/* {props.passwordError && <p className="alert alert-danger error">{props.passwordError}</p>} */}
                                </div>
                                <div className='form-group'>
                                    <label>Description:*</label> 
                                    <textarea value={description} onChange={this.handleChange} name='description' placeholder='Write the description of your casting call here' className="box-shadow-none form-control" rows="3"></textarea>
                                </div>
                                <div className='form-group'>
                                    <div className='d-flex'>
                                        <div className='d-flex justify-content-center align-items-center bckgrnd-dark-grey w25 h45px'>
                                            <i className='fa fa-map-marker fs20' />
                                            <p className='p0 m0 ml5'><b>Add Location:*</b></p>
                                        </div>
                                        <input 
                                            type="text" 
                                            name='field' 
                                            className="form-control border-none bckgrnd-grey h45px box-shadow-none"
                                            placeholder="Type here..." />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div className='d-flex space-between'>
                                        <div className='d-flex w45'>
                                            <div className='d-flex justify-content-center align-items-center bckgrnd-dark-grey w50 h45px'>
                                                <i className='fa fa-calendar fs20' />
                                                <p className='p0 m0 ml5'><b>Start Date:*</b></p>
                                            </div>
                                            <DatePicker
                                                // isValidDate={this.disablePastDt}
                                                value={start_date}
                                                onChange={this.handleDate('start_date')}
                                                className="form-control date-picker border-none bckgrnd-grey h45px box-shadow-none"
                                            />
                                        </div>
                                        <div className='d-flex w45'>
                                            <div className='d-flex justify-content-center align-items-center bckgrnd-dark-grey w50 h45px'>
                                                <i className='fa fa-calendar fs20' />
                                                <p className='p0 m0 ml5'><b>Deadline:*</b></p>
                                            </div>
                                            <DatePicker
                                                name='application_deadline'
                                                value={application_deadline}
                                                onChange={this.handleDate('application_deadline')}
                                                className="form-control date-picker border-none bckgrnd-grey h45px box-shadow-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Dates & Venues</label>
                                    <input 
                                        value={date_venue}
                                        onChange={this.handleChange}
                                        type="text" 
                                        name='date_venue' 
                                        className="form-control no-border-input" 
                                        placeholder="Write date and venue here" />
                                    {/* {props.usernameError && <p className="alert alert-danger error">{props.usernameError}</p>} */}
                                </div>
                            </div>
    
                            <div className='clr__white mt20 p35 d-flex justify-content-center align-items-center'>
                                <div>
                                    <label><b>Who are you looking for?*</b></label>
                                    <select value={skill_id} onChange={this.handleChange} name="lookingFor" id="inputState" className="form-control bold box-shadow-none" placeholder='Gender'>
                                        {skills && skills.map((i, index) => {
                                            return <option value={i.id}>{i.name}</option>
                                        })}
                                    </select> 
                                </div>
                            </div>
    
                            {role_type.map((i,index) => {
                                return <div className='clr__white mt20 p35'>
                                            <p className="alignCenter"><b>Role {index+1}</b></p>
                                            <div className='form-group'>
                                                <label>Role Type:</label>
                                                <select value={role_type[index].role_type_id} onChange={this.handleRoleType(index)}  name="role_type_id" id="inputState" className="form-control w30 bold box-shadow-none" placeholder='Gender'>
                                                    {roleType.map((i, index) => {
                                                        return <option value={i.id}>{i.name}</option>
                                                    })}
                                                </select> 
                                            </div>
                                            <div className='form-group'>
                                                <label>Role Description:</label> 
                                                <textarea 
                                                  name='role_description'
                                                  value={role_type[index].role_description}
                                                  onChange={this.handleRoleType(index)}
                                                  placeholder='Write the description of your casting call here' 
                                                  className="box-shadow-none form-control"  
                                                  rows="3" />
                                            </div>
                                            <div className='form-group d-flex flex-dir-col'>
                                                <label>Gender</label>
                                                <div>
                                                    {gender.map((i, ind) => {
                                                        return <span value={role_type[index].role_description} onChange={this.handleRoleType(index)} onClick={() => this.handleGenderChange(ind)} className={genderChange===index ? 'ml20 pointer clr__red' : 'ml20 pointer'}>{i.value}</span>
                                                    })}
                                                </div>
                                            </div>
                                            <div className='form-group'>
                                                <label>Age Range</label>
                                            </div>
                                        </div>
                            })}
                            <div className='d-flex space-between'>
                                <img style={{width:'25%'}} className='pointer' src={require('../assets/processed-btn.svg')} />
                                <div className='d-flex align-items-center'>
                                    <i className='fa fa-plus clr__red' />
                                    <p onClick={this.addRole} className='m0 p0 clr__red pointer'><b>Add Another Role</b></p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4">
                        
    
                        <div className="mt10 mb10">
                            {/* <ExploreCard /> */}
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default PostingCallsForm;