import React, { Component } from 'react';
import { Switch } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css';
import { showLoader, hideLoader } from '../../public/loader';
import { ToastsStore } from 'react-toasts';
import { SettingService } from '../../services/Setting';
import convertToFloat from '../../public/helperFunctions';
import { AuthService } from '../../services/AuthService';

class EditNotifications extends Component {
    state = { notification: [] }
    async componentDidMount() {
        showLoader()
        await SettingService.getNotifications()
        .then((res) => {
            this.setState({notification: res.data.user_notification_settings})
        }).catch((e) => console.log(e))

        .then(() => hideLoader());
    }

    handleNotificationSwitch = (e) => {
        const data = {...this.state.notification};
        if(this.state.notification[e.target.name]==='1') {
            data[e.target.name] = "0";
            this.setState({notification: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.notification[e.target.name])}
                SettingService.postNotifications(data)
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
        else if(this.state.notification[e.target.name]==='0') {
            data[e.target.name] = "1";
            this.setState({notification: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.notification[e.target.name])}
                SettingService.postNotifications(data)
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
        else if(this.state.notification[e.target.name]===true) {
            data[e.target.name] = "0";
            this.setState({notification: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.notification[e.target.name])}
                SettingService.postNotifications(data)
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
        else if(this.state.notification[e.target.name]===false) {
            data[e.target.name] = "1";
            this.setState({notification: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.notification[e.target.name])}
                SettingService.postNotifications(data)
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
        const { push_notification, post_like, post_comment, post_share, comment_like_reply, message_notification, follows, ratings, subscribe } = this.state.notification;
        return ( 
            <div className='d-flex flex-dir-col justify-content-center align-items-center'>
                <div className='w80 mt10'>
                    <div className='d-flex space-between p10 border'>
                        <h5 className='mb0'>Push Notifications</h5>
                        <Switch name='push_notification' checked={Boolean(convertToFloat(push_notification))} onChange={this.handleNotificationSwitch} />
                    </div>
                    <div className='d-flex space-between p20'>
                        <p className='mb0 gray'>Activity Stream</p>
                    </div>
                    <div className='d-flex space-between align-items-center p10 border'>
                        <div className='w30'>
                            <h5 className='mb0'>Post Like</h5>
                            <p className='mb0 gray fs13'>Get notified when someone likes your post</p>
                        </div>
                        <div>
                            <Switch name='post_like' checked={Boolean(convertToFloat(post_like))} onChange={this.handleNotificationSwitch} />
                        </div>
                    </div>
                    <div className='d-flex space-between align-items-center p10 border'>
                        <div className='w30'>
                            <h5 className='mb0'>Post Comment</h5>
                            <p className='mb0 gray fs13'>Get notified when someone comments on your post</p>
                        </div>
                        <div>
                            <Switch name='post_comment' checked={Boolean(convertToFloat(post_comment))} onChange={this.handleNotificationSwitch} />
                        </div>
                    </div>
                    <div className='d-flex space-between align-items-center p10 border'>
                        <div className='w30'>
                            <h5 className='mb0'>Post Share</h5>
                            <p className='mb0 gray fs13'>Get notified when someone shares your post</p>
                        </div>
                        <div>
                            <Switch name='post_share' checked={Boolean(convertToFloat(post_share))} onChange={this.handleNotificationSwitch} />
                        </div>
                    </div>
                    <div className='d-flex space-between p10 border'>
                        <h5 className='mb0'>Comment Like & Reply</h5>
                        <Switch name='comment_like_reply' checked={Boolean(convertToFloat(comment_like_reply))} onChange={this.handleNotificationSwitch} />
                    </div>
                    <div className='d-flex space-between p20'>
                        <p className='mb0 gray'>Messaging</p>
                    </div>
                    <div className='d-flex space-between p10 border'>
                        <h5 className='mb0'>Message Notifications</h5>
                        <Switch name='message_notification' checked={Boolean(convertToFloat(message_notification))}  onChange={this.handleNotificationSwitch}/>
                    </div>
                    <div className='d-flex space-between p20'>
                        <p className='mb0 gray'>Connect</p>
                    </div>
                    <div className='d-flex space-between p10 border'>
                        <h5 className='mb0'>Follows</h5>
                        <Switch name='follows' checked={Boolean(convertToFloat(follows))} onChange={this.handleNotificationSwitch} />
                    </div>
                    <div className='d-flex space-between p10 border'>
                        <h5 className='mb0'>Ratings</h5>
                        <Switch name='ratings' checked={Boolean(convertToFloat(ratings))} onChange={this.handleNotificationSwitch} />
                    </div>
                    <div className='d-flex space-between p20'>
                        <p className='mb0 gray'>Email  Nofifications</p>
                    </div>
                    <div className='d-flex space-between p10 border'>
                        <h5 className='mb0'>Subscribe</h5>
                        <Switch name='subscribe' checked={Boolean(convertToFloat(subscribe))} onChange={this.handleNotificationSwitch} />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default EditNotifications;