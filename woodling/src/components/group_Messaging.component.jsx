import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import { GiftedChat } from 'react-web-gifted-chat';
import { AuthService } from '../services/AuthService';

const GroupMessaging = (props) => {
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
        // this.setState((previousState) => ({
        //     messages: GiftedChat.append(previousState.messages, messages),
        //   }));
    }

    useEffect(()=>{
        const groupKey = props.circle.groupkey;
        console.log(groupKey);
        const ref = db.collection('circles').doc(groupKey).collection('messages');
    
        ref.orderBy('createdAt', 'desc').onSnapshot(
          querySnapshot => {
            const msgs = [];
            querySnapshot.forEach(element => {
              const tempObj = { id: element.data()._id, ...element.data()};
              console.log(tempObj);
              msgs.push(tempObj);
            });
            console.log('msgs: ', msgs);
            setMessages(msgs);
          },
          err => {
            console.log(`Messages error: ${err}`);
          }
        );
    }, [props.circle.groupkey]);

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
export default GroupMessaging;
