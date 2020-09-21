import React, { Component } from 'react';
import { Switch } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css';
import { showLoader, hideLoader } from '../../public/loader';
import { ToastsStore } from 'react-toasts';
import { SettingService } from '../../services/Setting';
import { AuthService } from '../../services/AuthService';
import convertToFloat from '../../public/helperFunctions';
import BlockedModal from '../../models/blocked-modal.component';

class EditPrivacy extends Component {
    state = { privacy: [], modal: false, blocked: [], status: '' }

    async componentDidMount() {
        showLoader()

        await SettingService.getPrivacy()
        .then((res) => {
            this.setState({privacy: res.data.user_privacy_settings, status: res.data.status})
        }).catch((e) => console.log(e))

        await SettingService.getBlocked()
        .then((res) => {
            this.setState({blocked: res.data.blocked_users}, () => {
                console.log(res.data)
            })
        })

        .then(() => hideLoader());
    }

    handleNotificationSwitch = (e) => {
        const data = {...this.state.privacy};
        if(this.state.privacy[e.target.name]==='1') {
            data[e.target.name] = "0";
            this.setState({privacy: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.privacy[e.target.name])}
                SettingService.postPrivacy(data)
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
        else if(this.state.privacy[e.target.name]==='0') {
            data[e.target.name] = "1";
            this.setState({privacy: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.privacy[e.target.name])}
                SettingService.postPrivacy(data)
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
        else if(this.state.privacy[e.target.name]===true) {
            data[e.target.name] = "0";
            this.setState({privacy: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.privacy[e.target.name])}
                SettingService.postPrivacy(data)
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
        else if(this.state.privacy[e.target.name]===false) {
            data[e.target.name] = "1";
            this.setState({privacy: data}, () => {
                const data = {user_id: AuthService.getUserId(), type: e.target.name, value: Number(this.state.privacy[e.target.name])}
                SettingService.postPrivacy(data)
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

    handleDropDownChange = async (e) => {
        const data = {...this.state.privacy};
        data[e.currentTarget.name] = e.currentTarget.value;
        const drop = {user_id: AuthService.getUserId(), type: e.currentTarget.name, value: data[e.currentTarget.name]}
        await SettingService.postPrivacy(drop)
        .then((res) => {
            if(res.data.status !== 'error'){
                this.setState({privacy: data}, () => {
                    console.log(this.state.privacy)
                });
                ToastsStore.success(res.data.message); 
            }else{
                console.log('error')
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
    }

    handleOpenModal = () => {
        this.setState({modal: true})
    }

    handleCloseModal = () => {
        this.setState({modal: false})
    }

    handleUnblock = async(blockedID) => {
        const data = {user_id: AuthService.getUserId(), blocked_id: blockedID.id}
        await SettingService.postUnblocked(data)
        .then((res) => {
            if(res.data.status !== 'error'){
                ToastsStore.success(res.data.message); 
            }else{
                console.log('error')
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
    }

    render() { 
        const { modal, blocked, status } = this.state;
        const { read_receipts, receive_messages, receive_voice_calls } = this.state.privacy
        return ( 
            <div className='d-flex flex-dir-col justify-content-center align-items-center'>
                <div className='w80 mt10'>
                    <div className='d-flex space-between p20'>
                        <p className='mb0 gray'>Activity Stream</p>
                    </div>
                    <div className='d-flex space-between align-items-center p10 border'>
                        <h5 className='mb0'>Recieve messages from</h5>
                        <select value={receive_messages} onChange={this.handleDropDownChange} name="receive_messages" id="inputState" className="form-control w40">
                            <option value='everyone'>Everyone</option>
                            <option value='only people I follow'>Only People I Follow</option>
                        </select> 
                    </div>
                    <div className='d-flex space-between align-items-center p10 border'>
                        <div className='w30'>
                            <h5 className='mb0'>Read receipts</h5>
                            <p className='mb0 gray fs13'>Allow others to see if you have read their messages or not</p>
                        </div>
                        <div>
                            <Switch name='read_receipts' checked={Boolean(convertToFloat(read_receipts))} onChange={this.handleNotificationSwitch} />
                        </div>
                    </div>
                    <div className='d-flex space-between align-items-center p10 border'>
                        <h5 className='mb0'>Recieve voice calls from</h5>
                        <select value={receive_voice_calls} onChange={this.handleDropDownChange} name="receive_voice_calls" id="inputState" className="form-control w40">
                            <option value='everyone'>Everyone</option>
                            <option value='only people I follow'>Only People I Follow</option>
                        </select> 
                    </div>
                    <div onClick={this.handleOpenModal} className='d-flex space-between align-items-center p20 border mt20 pointer'>
                        <h5 className='mb0'>Blocked accounts</h5>
                    </div>
                </div>
                {modal ? <BlockedModal
                            openModal={modal}
                            closeModal={this.handleCloseModal}
                            blocked={blocked}
                            status={status}
                            handleUnblock={this.handleUnblock}
                /> : null}
            </div>
         );
    }
}
 
export default EditPrivacy;