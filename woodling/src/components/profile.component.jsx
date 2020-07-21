/* eslint-disable prefer-destructuring */
import React, {Component} from 'react';
import history from '../public/history';
import { UserService } from '../services/UserService';
import ProfilePicHeader from './common/profile-header.component';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount(){
        const data = history.location.state.data;
        UserService.getUserProfileData(data.id)
        .then((res)=>{
            this.setState({userData: res.data.data})
            console.log("user details: ", res.data.data)

        });
    }

    render(){
        const {rating, profile_picture, username} = this.state.userData;
        return(
            <div className='h100p scrolling'>
                <div className="row m0">
                    <div className="col-md-12 p0">
                        <img style={{width:'100%'}} src={require('../assets/cover.svg')} />
                        <div className='center__item'>
                            <div />
                            <ProfilePicHeader
                                rating={rating}
                                profile_picture={profile_picture}
                                username={username}
                            />
                            
                        </div>
                    </div>
                </div>

                <div className="row d-flex m0">
                    <div className="col-md-8 br-white pl100">
                        
                    </div>
                    <div className="col-md-4">
                        
                    </div>

                    <div className="mt10 mb10">
                        {/* <ExploreCard /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile
