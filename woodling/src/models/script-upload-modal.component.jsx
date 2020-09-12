import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthService } from '../services/AuthService';
import { ActivityStreamService } from '../services/ActivityStreamService';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../public/loader';

class ScriptModal extends Component {
    state = { 
        script_title: '',
        script_synopsis: '',
        detail: ''
    }
    handleSubmit = async() => {
        const { script_title, script_synopsis, detail } = this.state;
        showLoader()
        await ActivityStreamService.submitScript({user_id: AuthService.getUserId(), type: 'script', privacy: 'public', title: script_title, synopsis_author: script_synopsis, synopsis: detail})
        .then((response) => {
            if(response.data.status !== 'error') {
                // const res= response.data;
                ToastsStore.success(response.data.message); 
                this.props.closeScriptModal();
            }else{
                console.log('error')
                ToastsStore.error(response.message); 
            }
        }).catch(e => console.log(e))
        .then(() => hideLoader());
    }
    render() {
        const { openScriptModal, closeScriptModal } = this.props;
        const { script_title, script_synopsis, detail } = this.state;
        return ( 
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openScriptModal}
                onHide={closeScriptModal}
            >
                <Modal.Header closeButton>
                    <div className='d-flex justify-content-center w100p'>
                        <h4 className='alignCenter'>Script</h4>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-item'>
                        <img className='brad-40 w10p h50' src={AuthService.getUserProfileImage()} />
                        <p className='p0 mb0 ml10'>@{AuthService.getUserName()}</p>
                    </div>
                    <div className='w100p d-flex flex-dir-col align-item'>
                        <div className="form-group p20 w70 d-flex flex-dir-col align-item mb0">
                            <label className='ml10 fs25' for="script_title">Script Title</label>
                            <input value={script_title} onChange={(e)=>this.setState({script_title: e.target.value})} type="text" placeholder='Write the title of your script here' className="form-control brder-l-r-t mt-10" id="script_title" name='script_title' />
                        </div>
                        <div className="form-group p20 w70 d-flex flex-dir-col align-item">
                            <label className='ml10 fs25' for="script_synopsis">Script Synopsis By:</label>
                            <input value={script_synopsis} onChange={(e)=>this.setState({script_synopsis: e.target.value})} type="text" placeholder='Write here' className="form-control brder-l-r-t mt-10" id="script_synopsis" name='script_synopsis' />
                        </div>
                        <div className="form-group w70 p20">
                            <textarea className="form-control" value={detail} onChange={(e)=>this.setState({detail: e.target.value})} placeholder='Write Synopsis here' rows="5" />
                        </div>
                    </div>
                    <div className='form-group d-flex justify-content-center'>
                        <button onClick={this.handleSubmit} type="button" className="profile-btn">Post</button>
                    </div>
                </Modal.Body>
            </Modal>
         );
    }
}
 
export default ScriptModal;