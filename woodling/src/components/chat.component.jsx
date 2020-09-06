/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import { firestore } from 'firebase';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { showLoader, hideLoader } from '../public/loader';
import 'react-input-range/lib/css/index.css';

const Chat = () => {

    const db = firestore();
    const initialState ={
        activeSection: 'chat',
        circles: []
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
    const { activeSection, circles } = state;

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

    useEffect(()=>{
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
        <div className="row">
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
                
            </div>
            <div className="col-md-2">

            </div>
        </div>
    );
}
export default Chat;