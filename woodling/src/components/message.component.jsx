import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import { GiftedChat } from 'react-web-gifted-chat';
import { AuthService } from '../services/AuthService';

const Messaging = (props) => {
    const [messages, setMessages] = useState([]);
    const db = firestore();

    const onSend = (message) => {
        const ref = db.collection('circles').doc(props.circle.groupkey).collection('messages');
        const chats = message[0];
        const newMessage = {
          createdAt: Date.now(),
          text: chats.text,
          user: chats.user,
          _id: chats.id
        };
        ref.add(newMessage);
    }

    useEffect(()=>{
        
        const { selectedUser, selectedUser: { user_id, theirid } } = props;
        const ref = firestore().collection('users')
        .doc(user_id)
        .collection('chats')
        .doc(theirid)
        .collection('messages');

        const chatlistref = db.collection('users').doc(user_id)
        .collection('chatlist')
        .doc(theirid);

        const theirchatlistref = db.collection('users').doc(theirid)
        .collection('chatlist')
        .doc(user_id);
        ref.orderBy('createdAt', 'desc').onSnapshot(
            querySnapshot => {
                const msgs = [];
                querySnapshot.forEach(element => {
                    console.log(element.data());
                    msgs.push(element.data());
                });debugger
                setMessages(msgs);
                const listings = msgs.filter(e => e.user._id !== user_id);
                if(msgs[0] !== undefined){
                    const { text, createdAt } = msgs[0];
                    const datum = { text, createdAt, selectedUser };
                    chatlistref.set(datum);
                }
            },
            err => {
                console.log(`Encountered error: ${err}`);
            }
        );

        ref.orderBy('createdAt', 'desc').onSnapshot(
            querySnapshot => {
                const msg = [];
                querySnapshot.forEach(element => {
                    msg.push(element.data());
                });
                setMessages(msg);debugger
                const listings = msg.filter(e => e.user._id !== user_id);
                if (msg[0] !== undefined){
                    const { text, createdAt } = msg[0];
                    const datum = { text, createdAt, selectedUser };
                    theirchatlistref.set(datum);
                }
            },
            err => {
                console.log(`Encountered error: ${err}`);
            }
        );
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
