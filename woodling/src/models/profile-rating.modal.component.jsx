import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import {Modal} from 'react-bootstrap';
import RatingStar from '../components/common/rating-stars.component';
import convertToFloat from '../public/helperFunctions';
import {AuthService} from '../services/AuthService';
import {UserService} from '../services/UserService';
import { showLoader, hideLoader } from '../public/loader';

class ProfileRating extends Component {
    state = { 
        outstanding: false,
        good: false,
        average: true,
        notGood: false,
        terrible: false,
        rating: 3,
        review: '',
        hide: false
    }
    handleOutstanding = () => {
        this.setState({outstanding: true, good: false, average: false, notGood: false, terrible: false, rating: 5});
    }
    handleGood = () => {
        this.setState({good: true, outstanding: false, average: false, notGood: false, terrible: false, rating: 4});
    }
    handleAverage = () => {
        this.setState({average: true, outstanding: false, good: false, notGood: false, terrible: false, rating: 3});
    }
    handleNotGood = () => {
        this.setState({notGood: true, outstanding: false, good: false, average: false, terrible: false, rating: 2});
    }
    handleTerrible = () => {
        this.setState({terrible: true, outstanding: false, good: false, average: false, notGood: false, rating: 1});
    }
    handleReview = (e) => {
        this.setState({review: e.currentTarget.textContent})
    }
    handleSubmit = () => {
        const data = {review: this.state.review, rate: this.state.rating, user_id: parseInt(AuthService.getUserId()), type:'review', recipient_id: parseInt(this.props.id)}
        console.log(data)
        UserService.addReview(data).then((res)=>{
            if(res.data.status !== 'error'){
                this.setState({review: '', rating: 3, hide: true})
                ToastsStore.success(res.data.message);
            }else{
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
        .then(() => hideLoader());
    }
    render() {
        const {username} = this.props;
        const {outstanding, good, average, notGood, terrible, hide} = this.state;
        return ( 
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.openModal}
                onHide={this.props.closeModal}
            >
                <Modal.Header>
                    <div className='d-flex w100p space-between align-item'>
                        <p className='p0 m0'><b>Rate @{username}</b></p>
                        <button onClick={this.handleSubmit} className="profile-btn">Submit</button>
                    </div>
                </Modal.Header>
        
                <Modal.Body>
                    <div>
                        <div className='d-flex space-between p15 border-bottom border-bottom'>
                            <label onClick={this.handleOutstanding} className="containers">Outstanding
                                <input type="radio" name="radio" />
                                <span className={outstanding ? "checkmarkSelect" : 'checkmarkUnselect'}></span>
                            </label>
                            <RatingStar rating={convertToFloat(5)} />
                        </div>
                        <div className='d-flex space-between p15 border-bottom'>
                            <label onClick={this.handleGood} className="containers">Good
                                <input type="radio" name="radio" />
                                <span className={good ? "checkmarkSelect" : 'checkmarkUnselect'}></span>
                            </label>
                            <RatingStar rating={convertToFloat(4)} />
                        </div>
                        <div className='d-flex space-between p15 border-bottom'>
                            <label onClick={this.handleAverage} className="containers">Average
                                <input type="radio" name="radio" />
                                <span className={average ? "checkmarkSelect" : 'checkmarkUnselect'}></span>
                            </label>
                            <RatingStar rating={convertToFloat(3)} />
                        </div>
                        <div className='d-flex space-between p15 border-bottom'>
                            <label onClick={this.handleNotGood} className="containers">Not Good
                                <input type="radio" name="radio" />
                                <span className={notGood ? "checkmarkSelect" : 'checkmarkUnselect'}></span>
                            </label>
                            <RatingStar rating={convertToFloat(2)} />
                        </div>
                        <div className='d-flex space-between p15 border-bottom'>
                            <label onClick={this.handleTerrible} className="containers">Terrible
                                <input type="radio" name="radio" />
                                <span className={terrible ? "checkmarkSelect" : 'checkmarkUnselect'}></span>
                            </label>
                            <RatingStar rating={convertToFloat(1)} />
                        </div>
                        <div class="editable-wrapper">
                            <div className="label">Review: </div>
                            <div 
                                onInput={this.handleReview}
                                placeholder='Leave your feedback' 
                                className="editable" 
                                contentEditable={true} 
                                //oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
                            />
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <div className='d-flex space-between w100p'>
                        <p className='gray'><b>Created: {notes.created}</b></p>
                        <p className='gray'><b>Published: {notes.lastEdit}</b></p>
                    </div>
                </Modal.Footer> */}
            </Modal>
         );
    }
}
 
export default ProfileRating;