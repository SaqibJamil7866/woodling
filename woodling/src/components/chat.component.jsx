/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-throw-literal */
/* eslint-disable camelcase */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import { firestore } from 'firebase';
import moment from 'moment';
import uuid from 'react-uuid';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { filterBy } from '@progress/kendo-data-query';
import { showLoader, hideLoader } from '../public/loader';
import { picUrl } from '../public/endpoins';
import 'react-input-range/lib/css/index.css';
import CircleForModal from '../models/circle-for-modal.component';
import { SettingService } from '../services/Setting';
import { AuthService } from '../services/AuthService';
import { ActivityStreamService } from '../services/ActivityStreamService';
import CircleMemberModal from '../models/circle-member-modal.component';
import { FollowService } from '../services/FollowService';
import Messaging from './message.component';
import GroupMessaging from './group_Messaging.component';
import CustomRenderingMultiSelectDropdown from './common/custom_rendering_multi_select.component';

const Chat = () => {

    const db = firestore();
    const initialState ={
        activeSection: 'chat',
        circles: [],
        chatlist: [],
        circleForModal: false,
        circleMemberModal: false,
        allSkills: [],
        allMembers: [],
        selectedSkills: [],
        selectedMembers: [],
        uploadImage: '',
        showImage: '',
        privacy: 'private',
        circle_name: '',
        user_id: AuthService.getUserId(),
        create_new: '',
        openGroupChat: false,
        openSingleChat: false,
        selectedCircle: '',
        selectedChat: '',
        tagPeople: [],
        selectedPeople: []
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { activeSection, circles, chatlist, circleForModal, allSkills, selectedSkills, circleMemberModal, 
        allMembers, selectedMembers, uploadImage, showImage, privacy, circle_name, user_id,
        create_new, openGroupChat, openSingleChat, selectedCircle, selectedChat, tagPeople, selectedPeople } = state;

    async function openChats(){
        dispatch({field: 'activeSection', value: 'chat'});
        const chatListref = db.collection('users').doc(AuthService.getUserId()).collection('chatlist');
        const data = [];
        showLoader();
        await new Promise((resolve, reject) => {
            chatListref.onSnapshot(docSnapshot => {
                hideLoader();
                if(!docSnapshot.empty){
                    docSnapshot.docs.forEach((element, index, array) => {
                        const chat = element.data();debugger
                        if(chat && chat.user){
                            isUserOnline(chat.user.user_id).then((status)=>{
                                chat.status = status;debugger
                                data.push(chat);
                                if(array && index === array.length - 1){
                                    resolve();
                                }
                            });
                        }
                    });
                }
            });
        });
        
        hideLoader();debugger
        dispatch({field: 'chatlist', value: data});
    }

    async function isUserOnline(userId){
        return new Promise((resolve, reject)=>{
            const ref = db.collection('users').doc(userId);
            ref.onSnapshot(res=>{
                let result = '';
                if(res.data()){
                    result = res.data().user_status;
                }
                resolve(result);
            });
        })
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
        selectedMembers.push(data)
    }

    const handleDeleteSkills = (data) => {
        const list = selectedSkills;
        list.splice(data, 1);
        dispatch({field: 'selectedSkills', value: list})
    }

    const handleDeleteMembers = (data) => {
        const list = selectedMembers;
        list.splice(data, 1);
        dispatch({field: 'selectedMembers', value: list});
    }

    const selectPrivacyType = (type) => {
        dispatch({field: 'privacy', value: type});
    }

    const handleImages = (event) => {
        dispatch({field:'uploadImage', value: event.target.files[0]})
        dispatch({field: 'showImage', value: URL.createObjectURL(event.target.files[0])})
        // this.setState({uploadImage: event.target.files[0], images: URL.createObjectURL(event.target.files[0])});
    }

    const createCircle = (event) => {
        const path = 'https://image.flaticon.com/icons/png/512/69/69589.png';
        const date_created = Date.now();
        const groupkey = uuid();
        let members = [];
        let circle_type = '';
        const groupExists = [];
        if(selectedMembers && selectedMembers.length > 0){
            members = selectedMembers;
        }
        else{
            return ToastsStore.error('Plz select the members');
        }
        if(selectedSkills && selectedSkills.length > 0){
            circle_type = selectedSkills;
        }
        else{
            return ToastsStore.error('Plz select the circle type');
        }
        if(circle_name.length < 3) {
            return ToastsStore.error('Circle Name is too short');
        }
        const ref = db.collection('circles')
        .doc(groupkey);
        const keycheck = db.collection('circles');
        const data = { members, circle_name, circle_type, date_created, privacy, groupkey, path };

        keycheck.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                groupExists.push(doc.id);
            });
            const exists = groupExists.filter(id => id === groupkey);
            if(exists.length > 0) throw 'the data already exists';
            else{
                ref.set(data).then(res => {
                    ref.get()
                    .then(doc => {
                        if (!doc.exists){
                            ToastsStore.warning('No such document!');
                        } else {
                            db.collection('users')
                            .doc(user_id)
                            .collection('grouplist')
                            .add({ groupkey });
                            
                            console.log('members: ', doc.data().members);
                            const docMembers = Array.from(doc.data().members);
                            docMembers.forEach(element => {
                                db.collection('users')
                                .doc(element.id)
                                .collection('grouplist')
                                .add({ groupkey });
                            });
                            ToastsStore.success('Circle created successfully.');
                            dispatch({field:'create_new', value:''});
                            openCircles();
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const openGroupMessaging = (circle) =>{
        dispatch({field:'create_new', value: ''});
        dispatch({field:'openGroupChat', value: true});
        dispatch({field:'openSingleChat', value: false});
        dispatch({field:'selectedCircle', value: circle});
    }

    const openChatMessaging = (chat) =>{
        const user = {
            user_id: AuthService.getUserId(),
            theirid: chat.user.user_id,
            picture: chat.user.picture === ''
                ? 'https://www.sccpre.cat/mypng/detail/214-2144186_alpesh-m-avatar-thumbnail.png'
                : `${chat.user.picture}`,
            name: chat.user.name,
            text: chat.text,
            statue: chat.statue,
            createdAt: chat.createdAt
        };
        dispatch({field:'selectedChat', value: user});
        dispatch({field:'create_new', value: ''});
        dispatch({field:'openGroupChat', value: false});
        dispatch({field:'openSingleChat', value: true});
    }

    const createNewChat = () => {
        if(activeSection === 'circle'){
            dispatch({field:'create_new', value:'circle'});
        }
        else{
            dispatch({field:'create_new', value:'chat'});
        }
    }

    const itemRender = (li, itemProps) => {
        const itemChildren = (
            <div style={{ color: "#00F" }}>
                <div className="w20 inline-block">
                    <img style={{marginTop:'-10px'}} src={itemProps.dataItem.profile_thumb ? picUrl+itemProps.dataItem.profile_thumb : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'} className="brad-40 w100p h50" alt="profile pic" />
                </div>
                <div className="ml5 pt10  dark-gray  inline-block">
                    {itemProps.dataItem.full_name} <br />
                    <b>{itemProps.dataItem.username}</b>
                </div> 
            </div>
        );

        return React.cloneElement(li, li.props, itemChildren);
    }

    const filterChange = (event) => {
        dispatch({field:'tagPeople', value: filterBy(tagPeople.slice(), event.filter)})
    }

    const handlePeopleChange = (event) => {
        dispatch({field:'selectedPeople', value: event.target.value});debugger
        if(event.target.value && event.target.value.length > 0){
            const tempUser = event.target.value[0];
            const user = {
                user_id: tempUser.id,
                theirid: tempUser.id,
                picture: tempUser.profile_thumb === ''
                    ? 'https://www.sccpre.cat/mypng/detail/214-2144186_alpesh-m-avatar-thumbnail.png'
                    : `${picUrl}/${tempUser.profile_thumb}`,
                name: tempUser.full_name
            };
            dispatch({field:'selectedChat', value: user});
            dispatch({field:'openGroupChat', value: false});
            dispatch({field:'openSingleChat', value: true});
        }
    }

    useEffect(()=>{
        Promise.all([SettingService.getSkills(), FollowService.getUSerFollowiers(), ActivityStreamService.searchAllPeople()])
        .then((res) => {
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
            if(res[2].status !== 'error'){
                dispatch({field: 'tagPeople', value: res[2].data.people});
            }else { 
                ToastsStore.error(res[2].message); 
            }
        });
        openChats();
        // db.collection("circles").get().then(function(querySnapshot) {
        //     const data = querySnapshot.docs.map(doc => doc.data());
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
                    <img className='w30px' onClick={()=>createNewChat()} src={require('../assets/comment-plus.png')} alt='add chat' />
                </div>
                <hr className="m0" />
                <div className="scrolling h485-max">
                    {/* Chat circles list */}
                    { activeSection === 'circle' && circles && circles.map((circle, index)=>{
                        return (
                            <div key={index} onClick={()=>openGroupMessaging(circle)} className="pointer row h60">
                                <div className="col-md-2">
                                    {circle.privacy !== 'public' ?
                                        <img className='w12 mt15' src={require('../assets/lock-alt.png')} alt='lock' />
                                    : <img className='w17 mt20' src={require('../assets/lock-open-alt.png')} alt='unlock' />}
                                </div>
                                <div className="col-md-8 flex h60">
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
                                <div className="col-md-2 h60 pl0 mt25">
                                    {/* <p className="mb0 pt10" title={moment(circle.createdAt).fromNow()}>
                                        {circle.createdAt && moment(circle.createdAt).fromNow().length > 5 ? 
                                        (((moment(circle.createdAt).fromNow()).substring(0, 5)) + '...') : moment(circle.createdAt).fromNow()}
                                    </p> */}
                                    <img className='w12' title={moment(circle.createdAt).fromNow()} src={require('../assets/red-online.png')} alt='online' />
                                </div>
                            </div>
                        )
                    })}

                    {/* single Chat list */}
                    { activeSection === 'chat' && chatlist && chatlist.map((chat, index)=>{
                        return (
                            <div key={index} onClick={()=>openChatMessaging(chat)} className="pointer h60 row ml10">
                                <div className="col-md-2">
                                    {chat.status === 'online' ?
                                        <img className='w12 mt15' title="online" src={require('../assets/green_online.png')} alt='online' />
                                    : <img className='w12 mt15' title="offline" src={require('../assets/green_offline.png')} alt='offline' />
                                    }
                                </div>
                                <div className="col-md-9 flex">
                                    <div>
                                        <img className='mt5 w50px brad-40' src={chat.user.picture} alt='profile' />
                                    </div>
                                    <div className="h30">
                                        <b title={chat.user.name}>{chat.user.name && chat.user.name.length > 13 ? 
                                            (((chat.user.name).substring(0, 10)) + '...') : chat.user.name}
                                        </b>
                                    </div>
                                </div>
                                {/* <div className="col-md-2">
                                    <img className='w12' src={require('../assets/red-online.png')} alt='online' />
                                </div> */}
                            </div>
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
                {/* Create Circle */}
                {activeSection === 'circle' && create_new === 'circle' ? (
                    <>
                        <div className='p10 border-bottom'>
                            <h3><b>Create a Circle</b></h3>
                        </div>
                        <div className='d-flex'>
                            {showImage.length === 0 ? 
                                <label className='w30' for='file-upload'>
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
                                    <input type="text" placeholder='Write name here' onChange={(e)=>dispatch({'field': 'circle_name', value:e.target.value})} className="form-control brder-l-r-t mt-10" id="script_synopsis" name='script_synopsis' />
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
                                    <div className="alignCenter">
                                        <div className="alignCenter mb10 mt10">
                                            <button className={`btn btn-default ${privacy === 'private' ? 'bg-red' : ''}`} onClick={()=>selectPrivacyType('private')}>
                                                <img className='w12 ml5' src={require('../assets/lock-alt.png')} alt='lock' />
                                                <span className="ml5">Private</span>
                                            </button>
                                            <button className={`btn btn-default ml5 ${privacy === 'public' ? 'bg-red' : ''}`} onClick={()=>selectPrivacyType('public')}>
                                                <img className='w17 ml5' src={require('../assets/lock-open-alt.png')} alt='unlock' />
                                                <span className="ml5">Public</span>
                                            </button>
                                        </div>
                                        <button className="btn bg-red" onClick={createCircle}>Create Circle</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ): null }

                {/* Create single chat */}
                {activeSection === 'chat' && create_new === 'chat' ? (
                    <>
                        <div className='p10 border-bottom'>
                            <h3><b>Start a conversation with...</b></h3>
                        </div>
                        <CustomRenderingMultiSelectDropdown
                            data={tagPeople} 
                            value={selectedPeople}
                            handleChange={handlePeopleChange}
                            filterChange={filterChange}
                            itemRender={itemRender}
                            dataItemKey='id'
                            textField='full_name'
                        />
                    </>
                ): null }

                {openSingleChat ? (
                    <Messaging 
                        selectedUser={selectedChat}
                    />
                ) : null}

                {openGroupChat ?(
                    <GroupMessaging 
                        circle={selectedCircle}
                    />
                ): null}
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