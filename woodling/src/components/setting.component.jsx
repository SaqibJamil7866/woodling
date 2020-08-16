import React, { Component } from 'react';
import { ReactComponent as RightIcon } from '../assets/right-arrow.svg';
import { AuthService } from '../services/AuthService';
import EditProfile from './common/edit-profile.component';
import EditAccount from './common/edit-account.component';
import EditNotifications from './common/edit-notification.component';
import EditPrivacy from './common/edit-privacy.component';
import EditSharing from './common/edit-sharing.component';

class Settings extends Component {
    state = { 
        profile: false,
        account: false,
        notification: false,
        privacy: true,
        sharing: false,
        faq: false,
        about: false
    }
    openProfile = () => {
        this.setState({profile: true, account: false, notification: false, privacy: false, sharing: false, faq: false, about: false});
    }
    openAccount = () => {
        this.setState({account: true, profile: false, notification: false, privacy: false, sharing: false, faq: false, about: false});
    }
    openNotification = () => {
        this.setState({notification: true, profile: false, account: false, privacy: false, sharing: false, faq: false, about: false});
    }
    openPrivacy = () => {
        this.setState({privacy: true, profile: false, account: false, notification: false, sharing: false, faq: false, about: false});
    }
    openSharing = () => {
        this.setState({sharing: true, profile: false, account: false, notification: false, privacy: false, faq: false, about: false});
    }
    openFaq = () => {
        this.setState({faq: true,  profile: false, account: false, notification: false, privacy: false, sharing: false, about: false});
    }
    openAbout = () => {
        this.setState({about: true, profile: false, account: false, notification: false, privacy: false, sharing: false, faq: false});
    }
    render() { 
        const { profile, account, notification, privacy, sharing, faq, about } = this.state;
        return ( 
            <div className='h100p scrolling'>
                <div className='row m0'>
                    <h1 className='mt10 p20 ml20 w100p'><b>Settings</b></h1>
                    <div className='col-md-4 clr__white border-right'>
                        <div className='d-flex flex-dir-col align-item'>
                            <div className='d-flex align-item w80'>
                                <h5 className='mb0'><b>Me</b></h5>
                                <img style={{width: '10%', marginLeft: '5%'}} src={require('../assets/profileSetting.svg')} />
                            </div>

                            <div className='p10 d-flex align-item flex-dir-col w80'>
                                <div className={profile ? 'd-flex space-between w100p border p10 pointer bg-red clr-w' : 'd-flex space-between w100p border p10 pointer'} onClick={this.openProfile}>
                                    <p className='m0 fs20 fw500'>Profile</p>
                                    <i className='fa fa-angle-right fs25 ' />
                                </div>
                                <div className={account ? 'd-flex space-between w100p border p10 pointer bg-red clr-w' : 'd-flex space-between w100p border p10 pointer'} onClick={this.openAccount}>
                                    <p className='m0 fs20 fw500'>Account</p>
                                    <i className='fa fa-angle-right fs25 ' />
                                </div>
                            </div>
                        </div>

                        <div className='d-flex flex-dir-col align-item mt20'>
                            <div className='d-flex align-item w80'>
                                <h5 className='mb0'><b>Preferences</b></h5>
                                <i className='fa fa-cogs ml5 fs25' />
                            </div>

                            <div className='p10 d-flex align-item flex-dir-col w80'>
                                <div className={notification ? 'd-flex space-between w100p border p10 pointer bg-red clr-w' : 'd-flex space-between w100p border p10 pointer'} onClick={this.openNotification}>
                                    <p className='m0 fs20 fw500'>Notifications</p>
                                    <i className='fa fa-angle-right fs25 ' />
                                </div>
                                <div className={privacy ? 'd-flex space-between w100p border p10 pointer bg-red clr-w' : 'd-flex space-between w100p border p10 pointer'} onClick={this.openPrivacy}>
                                    <p className='m0 fs20 fw500'>Privacy</p>
                                    <i className='fa fa-angle-right fs25 ' />
                                </div>
                                <div className={sharing ? 'd-flex space-between w100p border p10 pointer bg-red clr-w' : 'd-flex space-between w100p border p10 pointer'} onClick={this.openSharing}>
                                    <p className='m0 fs20 fw500'>Sharing</p>
                                    <i className='fa fa-angle-right fs25 ' />
                                </div>
                            </div>
                        </div>

                        <div className='d-flex flex-dir-col align-item mt20'>
                            <div className='d-flex align-item w80'>
                                <h5 className='mb0'><b>Info & Legal</b></h5>
                                <i className='fa fa-info-circle ml5 fs25' />
                            </div>

                            <div className='p10 d-flex align-item flex-dir-col w80'>
                                <div className={faq ? 'd-flex space-between w100p border p10 pointer bg-red clr-w' : 'd-flex space-between w100p border p10 pointer'} onClick={this.openFaq}>
                                    <p className='m0 fs20 fw500'>FAQ</p>
                                    <i className='fa fa-angle-right fs25 ' />
                                </div>
                                <div className={about ? 'd-flex space-between w100p border p10 pointer bg-red clr-w' : 'd-flex space-between w100p border p10 pointer'} onClick={this.openAbout}>
                                    <p className='m0 fs20 fw500'>About</p>
                                    <i className='fa fa-angle-right fs25 ' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8 clr__white'>
                        {profile ? <EditProfile /> : null}
                        {account ? <EditAccount /> : null}
                        {notification ? <EditNotifications /> : null}
                        {privacy ? <EditPrivacy /> : null}
                        {sharing ? <EditSharing /> : null}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Settings ;