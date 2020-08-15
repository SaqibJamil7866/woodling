import React, { Component } from 'react';
import { SettingService } from '../../services/Setting';
import { showLoader, hideLoader } from '../../public/loader';
import { ToastsStore } from 'react-toasts';
import { AuthService } from '../../services/AuthService';
import ChangePassword from '../../models/change-password.component';
import cookie from 'react-cookies';

class EditAccount extends Component {
    state = { 
        email: '',
        username: '',
        openModal: false,
        password: {
            current_password: '',
            new_password: '',
            retype_password: ''
        },
        errors: {
            current_password: '',
            new_password: '',
            retype_password: ''
        }
    }

    async componentWillMount() {
        showLoader();
        await SettingService.getEmail()
        .then((res) => {
            res.data.user_email.map((i, index) => {
                this.setState({email: i.email}, () => {
                    console.log(this.state.email)
                })
            })
        }).catch((e) => console.log(e))
        await SettingService.getUsername() 
        .then((res) => {
            res.data.user_username.map((i, index) => {
                this.setState({username: i.username})
            })
        })
        
        .then(() => hideLoader());
    }

    handleChange = (e) => {
        if(e.currentTarget.name==='email') {
            this.setState({email: e.currentTarget.value});
        }else if(e.currentTarget.name==='username') {
            this.setState({username: e.currentTarget.value});
        }
    }

    handleUpdateEmail = async () => {
        const data = {user_id: AuthService.getUserId(), type: 'email', email: this.state.email}
        await SettingService.postUpdate(data)
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

    handleUsername = async () => {
        console.log(this.state.username)
        const data = {user_id: AuthService.getUserId(), type: 'username', username: this.state.username}
        await SettingService.postUpdate(data)
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
    
    handleOpenModal = () => {
        this.setState({openModal: true});
    }
    
    handleCloseModal = () => {
        this.setState({openModal: false});
    }

    handlePasswordChange = (e) => {
        const data = {...this.state.password};
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({password: data})
    }

    handlePassDone = async() => {
        const data = {user_id: AuthService.getUserId(), type:'password', current_password: this.state.password.current_password, new_password: this.state.password.new_password, retype_password: this.state.password.retype_password}
        if(this.state.password.new_password !== this.state.password.retype_password) {
            const errors = {...this.state.errors}
            errors.retype_password = 'Passwords are not matched';
            this.setState({errors})
        }
        else {
            await SettingService.postUpdate(data)
            .then((res) => {
                if(res.data.status !== 'error'){
                    ToastsStore.success(res.data.message);
                    this.setState({openModal: false})
                }else{
                    console.log('error')
                    ToastsStore.error(res.message); 
                }
            })
            .catch((e)=> console.error("error: "+ e))
        }
    }

    render() { 
        const { email, username, openModal } = this.state;
        return ( 
            <>
                <div className='d-flex justify-content-center'>
                        <form className='w80 mt10'>
                            <div className="d-flex space-between mb30 p20">
                                <div>
                                    <label className='ml10 gray' for="email">Email</label>
                                    <input value={email} onChange={this.handleChange} type="email" className="form-control brder-l-r-t mt-10 w150p" id="email" name='email' />
                                </div>
                                <p onClick={this.handleUpdateEmail} className='update-btn outline align-self-center pointer'>Update</p>
                            </div>
                            <div className="d-flex space-between mb30 p20">
                                <div>
                                    <label className='ml10 gray' for="username">Username</label>
                                    <input value={username} onChange={this.handleChange} type="text" className="form-control brder-l-r-t mt-10 w150p" id="username" name='username' />
                                </div>
                                <p onClick={this.handleUsername} className='update-btn outline align-self-center pointer'>Update</p>
                            </div>
                            <div className="d-flex space-between mb30 p20 align-items">
                                <div>
                                    <label className='ml10 gray' for="name">Password</label>
                                </div>
                                <p onClick={this.handleOpenModal} className='update-btn outline align-self-center  pointer'>Change</p>
                            </div>
                        </form>
                    </div>
                    {openModal ? <ChangePassword 
                                    handleOpenModal={this.state.openModal}
                                    handleCloseModal={this.handleCloseModal}
                                    password={this.state.password}
                                    handlePasswordChange={this.handlePasswordChange}
                                    handlePassDone={this.handlePassDone}
                                    errors={this.state.errors}
                    /> : null}
                </>
         );
    }
}
 
export default EditAccount;