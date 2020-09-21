import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import { GiftedChat } from 'react-web-gifted-chat';
import { AuthService } from '../services/AuthService';
import { picUrl } from '../public/endpoins';

const Messaging = (props) => {
    const [messages, setMessages] = useState([]);
    const [theirData, setTheirData] = useState();
    const [ownData, setOwnData] = useState([]);
    const [userStatus, setUserStatus] = useState();
    const db = firestore();

    const onSend = (messages = []) =>{
        const { selectedUser, selectedUser: { user_id, theirid } } = props;

        const chatNotification = db.collection('users').doc(theirid).collection('unreadMsg');
        chatNotification.get().then(querySnapshot => {
            let count = 0 ;
            querySnapshot.forEach(element => {
                if(element.data() && typeof element.data().count === 'number'){
                    count = element.data().count;
                }
            });
            chatNotification.doc("chatMsgCount").set({count: count + 1});
        });
        
        const ref = db.collection('users').doc(user_id)
        .collection('chats')
        .doc(theirid)
        .collection('messages');
    
        const theirref = db.collection('users').doc(theirid)
        .collection('chats')
        .doc(user_id)
        .collection('messages');
    
        const chats = messages[0];
        const newMessage = {
          createdAt: Date.now(),
          text: chats.text,
          user: chats.user,
          _id: Date.now(),
        };
        console.log(newMessage);
        ref.add(newMessage);
        theirref.add(newMessage);
    }

    const getFireStoreData = () => {
        try {
            const { selectedUser, selectedUser: { user_id, theirid } } = props;
            const user = selectedUser;
            // Update Message Indicator
            const theirr = db.collection('users').doc(user_id)
            .collection('messageIndicator')
            .doc(theirid);

            theirr.set({ read: true });
            const refStatus = db.collection('users').doc(theirid);
            refStatus.onSnapshot(res=>{
                if(res.data()){
                    setUserStatus(res.data().user_status);
                }
                else{
                    setUserStatus('offline');
                }
            });
        
            const ref = db.collection('users').doc(user_id)
                .collection('chats')
                .doc(theirid)
                .collection('messages');
        
            const chatlistref = db.collection('users')
                .doc(user_id)
                .collection('chatlist')
                .doc(theirid);
        
            const theirchatlistref = db.collection('users')
                .doc(theirid)
                .collection('chatlist')
                .doc(user_id);
        
            ref.orderBy('createdAt', 'desc').onSnapshot(
                querySnapshot => {
                    const msgs = [];
                    querySnapshot.forEach(element => {
                    msgs.push(element.data());
                    });
                    setMessages(msgs);

                    const listings = messages.filter(e => e.user._id !== user_id);
                    if(messages[0] !== undefined){
                        const { text, createdAt } = messages[0];
                        user.user_id = theirid;

                        if(theirData){
                            user.name = theirData.full_name;
                            user.picture = picUrl + '/' + theirData.profile_picture;
                        }
                        if(!user.statue){
                            user.statue = '';
                        }
                        const datum = { text, createdAt, user };
                        chatlistref.set(datum);
                    }
                },
                err => {
                    console.log(`Encountered error: ${err}`);
                },
            );
        
            ref.orderBy('createdAt', 'desc').onSnapshot(
                querySnapshot => {
                    const mesgs = [];
                    querySnapshot.forEach(element => {
                        mesgs.push(element.data());
                    });
                    setMessages(mesgs);
                    const listings = messages.filter(e => e.user._id !== user_id);
                    if(messages[0] !== undefined){
                        const { text, createdAt } = messages[0];
                        user.user_id = user_id;
                        if(ownData){
                            user.name = ownData.full_name;
                            user.picture = picUrl + '/' + ownData.profile_picture;
                        }

                        const datum = { text, createdAt, user };
                        theirchatlistref.set(datum);
                    }
                },
                err => {
                console.log(`Encountered error: ${err}`);
                },
            );
        } catch (err) {
          console.log('Error in firestore : ', err);
        }
    }

    useEffect(()=>{
        const { selectedUser, selectedUser: { user_id, theirid } } = props;
        AuthService.getMessageUserProfile(user_id, theirid).then((response)=>{
            setTheirData(response.data.data);
        });
        AuthService.getMessageUserProfile(user_id, user_id).then((response)=>{
            setOwnData(response.data.data);
            getFireStoreData();
        })
    }, [props.selectedUser]);

    return(
        <GiftedChat
            messages={messages}
            onSend={(msg) => onSend(msg)}
            user={{ 
                _id: AuthService.getUserId(),
                name: AuthService.getUserName(),
                avatar: 'https://facebook.github.io/react/img/logo_og.png'
            }}
        />
    )
}
export default Messaging;
