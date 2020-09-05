/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import { firestore } from 'firebase';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { showLoader, hideLoader } from '../public/loader';
import 'react-input-range/lib/css/index.css';
import CircleForModal from '../models/circle-for-modal.component';
import { SettingService } from '../services/Setting';
import CircleMemberModal from '../models/circle-member-modal.component';
import { FollowService } from '../services/FollowService';

const Chat = () => {

    const db = firestore();
    const initialState ={
        activeSection: 'chat',
        circles: [],
        circleForModal: false,
        circleMemberModal: false,
        allSkills: [],
        allMembers: [],
        selectedSkills: [],
        selectedMembers: [],
        uploadImage: '',
        showImage: ''
    }

    function reducer(state, { field, value}){
        switch (field) {
            case 'update_explore_users':debugger
            return{
                ...state,
                city: value.address[value.address.length-2]
            };
            default: 
            return{
                ...state,
                [field] : value
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { activeSection, circles, circleForModal, allSkills, selectedSkills, circleMemberModal, 
        allMembers, selectedMembers, uploadImage, showImage } = state;

    const openChats = () => {
        dispatch({field: 'activeSection', value: 'chat'});
    }

    const openCircles = () => {
        dispatch({field: 'activeSection', value: 'circle'});
        showLoader();
        db.collection("circles").get().then(function(querySnapshot) {
            hideLoader();
            const data = querySnapshot.docs.map(doc => doc.data());
            dispatch({field: 'circles', value: data});
            console.log("Circles: ", data); // array of circles objects
        });
    }

    const openCircleForModal = () => {
        dispatch({field: 'circleForModal', value: true})
    }

    const closeCircleForModal = () => {
        dispatch({field: 'circleForModal', value: false})
    }

    const handleSkillChange = (event) => {
        dispatch({field: 'selectedSkills', value: event.target.value})
    }

    const openCircleMemberModal = () => {
        dispatch({field: 'circleMemberModal', value: true});
    }

    const closeCircleMemberModal = () => {
        dispatch({field: 'circleMemberModal', value: false});
    }

    const onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }

    const handleMember = (data) => {
        console.log(data)
        selectedMembers.push(data)
    }

    const handleDeleteSkills = (data) => {
        const list = selectedSkills;
        list.splice(data, 1);
        dispatch({field: 'selectedSkills', value: list})
        // this.setState({images: list1, uploadImages: list2})
    }

    const handleDeleteMembers = (data) => {
        const list = selectedMembers;
        list.splice(data, 1);
        dispatch({field: 'selectedMembers', value: list})
        // this.setState({images: list1, uploadImages: list2})
    }

    const handleImages = (event) => {
        dispatch({field:'uploadImage', value: event.target.files[0]})
        dispatch({field: 'showImage', value: URL.createObjectURL(event.target.files[0])})
        // this.setState({uploadImage: event.target.files[0], images: URL.createObjectURL(event.target.files[0])});
        // console.log(this.state.images)
    }

    useEffect(()=>{
        Promise.all([SettingService.getSkills(), FollowService.getUSerFollowiers()])
        .then((res) => {
            // console.log(res[0].data.data)
            if(res[0].status !== 'error'){
                dispatch({field: 'allSkills', value: res[0].data.data});
            }else { 
                ToastsStore.error(res[0].message); 
            }
            if(res[1].status !== 'error'){
                dispatch({field: 'allMembers', value: res[1].data.data});
            }else { 
                ToastsStore.error(res[1].message); 
            }
        })
        // db.collection("circles").get().then(function(querySnapshot) {
        //     const data = querySnapshot.docs.map(doc => doc.data());debugger
        //     console.log("Circles: ", data); // array of circles objects
        // });
        db.collection("users")
        .onSnapshot(function(querySnapshot) {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log("users: ", data); // array of users objects
        });

        // db.collection("users").doc('101').doc('chatlist').get().then(function(querySnapshot) {debugger
        //     const data = querySnapshot.docs.map(doc => doc.data());
        //     console.log("Circles: ", data); // array of circles objects
        // });

    }, []);

    

    return(
        <div className="row h100p scrolling">
            <div className="col-md-3 clr__white">
                <div className="flex">
                    <h3 className={activeSection === 'chat' ? 'p10 pointer' : 'p10 clr-grey pointer'} onClick={openChats}>Chats</h3>
                    <h3 className={activeSection === 'circle' ? 'p10 pointer' : 'p10 clr-grey pointer'} onClick={openCircles}>Circles</h3>
                </div>
               
                <div className="flex">
                    <AsyncTypeahead
                        id="message_typehead"
                        labelKey="description"
                        placeholder="Search messages"
                        minLength={3}
                        // onSearch={handleLocationSearch}
                        // onChange={handleLocation}
                        // options={locations}
                        className="form-control box-shadow-none border-none brder-l-r-t mb10"
                    />
                    <img className='w30px' src={require('../assets/comment-plus.png')} alt='add chat' />
                </div>
                <hr className="m0" />
                <div className="row scrolling h485-max">
                    { activeSection === 'circle' && circles && circles.map((circle)=>{
                        return (
                            <>
                                <div className="col-md-2">
                                    {circle.privacy !== 'public' ?
                                        <img className='w12 mt15' src={require('../assets/lock-alt.png')} alt='lock' />
                                    : <img className='w17 mt20' src={require('../assets/lock-open-alt.png')} alt='unlock' />}
                                </div>
                                <div className="col-md-8 flex">
                                    <div>
                                        <img className='mt5 w50px brad-40' src={circle.path} alt='circle img' />
                                    </div>
                                    <div className="h30">
                                        <b title={circle.circle_name}>{circle.circle_name && circle.circle_name.length > 13 ? 
                                            (((circle.circle_name).substring(0, 10)) + '...') : circle.circle_name}
                                        </b>
                                        <span className="block clr-grey">Members: {circle.members.length}</span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <p className="mb0 pt10">2w</p>
                                    <img className='w12' src={require('../assets/red-online.png')} alt='online' />
                                </div>
                            </>
                        )
                    })}
                </div>


                {/* <div className="row">
                    <div className="col-md-2">
                        <img className='w12' src={require('../assets/red-online.png')} alt='online' />
                    </div>
                    <div className="col-md-8">
                        <img className='w30px brad-40' src={require('../assets/comment-plus.png')} alt='add chat' />
                        <b>Name</b>
                        <span>Where are you</span>
                    </div>
                    <div className="col-md-2">
                        <p className="mb0">2w</p>
                        <img className='w12' src={require('../assets/red-online.png')} alt='online' />
                    </div>
                </div> */}
            </div>

            <div className="col-md-7">
                <div className='p10 border-bottom'>
                    <h3><b>Create a Circle</b></h3>
                </div>
                <div className='d-flex'>
                    {showImage.length === 0 ? <label className='w30' for='file-upload'>
                        <div className='d-flex flex-dir-col align-item-end mr15'>
                            <div className='bkgrnd-light-red w50p d-flex justify-content-center align-item h100 border-radius-100 pointer'>
                                <i className='fa fa-camera red fs30' />
                            </div>
                            <div className='d-flex align-item pointer'>
                                <i className='fa fa-plus-circle red' />
                                <p className='mb0 red'>Upload Photo</p>
                            </div>
                        </div>
                    </label> 
                    : 
                    <label className='w30' for='file-upload'>
                        <div className='d-flex flex-dir-col align-item-end mr15'>
                            <div className='w50p h100 border-radius-100 pointer'>
                                <img className='w100p h100p border-radius60' src={showImage} />
                            </div>
                            <div className='d-flex align-item pointer'>
                                <i className='fa fa-plus-circle red' />
                                <p className='mb0 red'>Upload Photo</p>
                            </div>
                        </div>
                    </label>}
                    <input
                        onChange={handleImages}
                        id="file-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        name="Add Profile Picture"
                    />
                    
                    <div className='w70 border clr__white'>
                        <div className="form-group p20 w100p d-flex flex-dir-col">
                            <label className='ml10 fs20' for="script_synopsis">Circle Name*:</label>
                            <input type="text" placeholder='Write name here' className="form-control brder-l-r-t mt-10" id="script_synopsis" name='script_synopsis' />
                        </div>
                        <div className='form-group p20'>
                            <div className='d-flex space-between'>
                                <label className='ml10 fs20'>Who is this Circle for?</label>
                                <div onClick={openCircleForModal} className='d-flex align-items-center'>
                                    <i className='fa fa-plus clr__red' />
                                    <p className='m0 p0 clr__red pointer'><b>Add</b></p>
                                </div>
                            </div>
                            <div className='border min-h100'>
                                {selectedSkills && selectedSkills.map((i, index) => {
                                    return <div key={index} className='d-flex space-between align-item p10'>
                                        <p className='fs20 mb0'>{i.name}</p>
                                        <i onClick={handleDeleteSkills} className='fa fa-times fs20 pointer' />
                                    </div>;
                                })}
                            </div>
                        </div>
                        <div className='form-group p20'>
                            <div className='d-flex space-between'>
                                <label className='ml10 fs20'>Members</label>
                                <div onClick={openCircleMemberModal} className='d-flex align-items-center'>
                                    <i className='fa fa-plus clr__red' />
                                    <p className='m0 p0 clr__red pointer'><b>Add</b></p>
                                </div>
                            </div>
                            <div className='border min-h100'>
                                {selectedMembers && selectedMembers.map((i, index) => {
                                    return <div key={index} className='d-flex space-between align-item p10'>
                                        <p className='fs20 mb0'>{i.full_name}</p>
                                        <i onClick={handleDeleteMembers} className='fa fa-times fs20 pointer' />
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-2">

            </div>
            {circleForModal ? 
                <CircleForModal 
                    openCircleForModal={openCircleForModal}
                    closeCircleForModal={closeCircleForModal}
                    allSkills={allSkills}
                    data={selectedSkills}
                    handleSkillChange={handleSkillChange}
                /> : null}
            {circleMemberModal ? 
                <CircleMemberModal 
                    openCircleMemberModal={openCircleMemberModal}
                    closeCircleMemberModal={closeCircleMemberModal}
                    allMembers={allMembers}
                    onCrash={onCrash}
                    handleMember={handleMember}
                /> : null}
        </div>
    );
}
export default Chat;