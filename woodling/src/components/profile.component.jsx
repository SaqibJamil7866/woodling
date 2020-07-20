/* eslint-disable prefer-destructuring */
import React, {Component} from 'react';
import history from '../public/history';
import { UserService } from '../services/UserService';

class Profile extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const data = history.location.state.data;
        UserService.getUserProfileData(data.id)
        .then((res)=>{
            console.log("user details: ", res.data)

        });
    }

    render(){

        return(
            <>
                <h1>Profile screen</h1>
            </>
        )
    }
}

export default Profile
