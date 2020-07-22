/* eslint-disable prefer-destructuring */
import React, {Component} from 'react';
import { showLoader, hideLoader } from '../public/loader';
import history from '../public/history';
import { UserService } from '../services/UserService';
import { siteUrl } from '../public/endpoins';
import ProfilePicHeader from './common/profile-header.component';
import UserExperience from './common/profile-user-experience.component';
import UserAlbum from './common/profile-user-album.component';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: [],
            userAlbum: [],
            userExperience: [],
            albums: true,
            post: false,
            experience: false,
            userModal: false,
            userModalData: {}
        }
    }

    async componentDidMount(){
        showLoader();
        const data = history.location.state.data;
        await UserService.getUserProfileData(data.id)
        .then((res)=>{
            this.setState({userData: res.data.data, userExperience: res.data.user_experience});
        }).catch((e)=>console.error("error: "+ e));

        await UserService.getUserProfileAlbum(data.id)
        .then((res) => {
            this.setState({userAlbum: res.data.albums})
            console.log("user details: ", res.data);
        }).catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
        hideLoader();
    }

    openAlbumLink = () => {
        this.setState({albums: true, post: false, experience: false});
    }

    openPostLink = () => {
        this.setState({post: true, albums: false, experience: false});
    }

    openExperienceLink = () => {
        this.setState({experience: true, albums: false, post: false});
    }

    openModal = (data) => {
        this.setState({userModal: true, userModalData: data});
    }
    closeModal = () => {
        this.setState({userModal: false});
    }

    render(){
        const {albums, post, experience, userExperience, userModal, userModalData, userAlbum} = this.state;
        const {rating, profile_picture, username, cover_picture, full_name, bio, post_count, tag_count, rating_count, followers_count, following_count} = this.state.userData;
        const {path, type} = this.state.userAlbum;
        console.log('adasdasd', this.state.userAlbum)
        return(
            <div className='h100p scrolling'>
                <div className="row m0">
                    <div className="col-md-12 p0">
                        <img style={{width:'100%', height:'300px'}} src={cover_picture ? siteUrl+""+cover_picture : require('../assets/cover.svg')} />
                        <div className='center__item clr__white flex-dir-col align-item'>
                            <div />
                            <ProfilePicHeader
                                rating={rating}
                                profile_picture={profile_picture}
                                username={username}
                                full_name={full_name}
                                bio={bio}
                            />
                        </div>
                        <div className='border-bottom'>
                            <ul className='no-text-decoration d-flex space-evenly p0 mb0'>
                                <li className={albums ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openAlbumLink}>Albums</li>
                                <li className={post ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openPostLink}>{post_count} Posts</li>
                                <li className='p10'>{tag_count} Tags</li>
                                <li className='p10'>{rating_count} Ratings</li>
                                <li className='p10'>About</li>
                                <li className={experience ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openExperienceLink}>Experience</li>
                                <li className='p10'>{followers_count} Followers</li>
                                <li className='p10'>{following_count} Following</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row d-flex m0">
                    <div className="col-md-12 br-white pl80">
                        <div className='mt20'>
                            {experience ? <UserExperience 
                                            userExperience={userExperience} 
                                            userModal={userModal}
                                            openModal={this.openModal}
                                            closeModal={this.closeModal}
                                            userModalData={userModalData}
                                        /> : null}
                            {albums ? userAlbum==='empty' ?<p>No Albums found</p> : <UserAlbum 
                                        userAlbum={userAlbum}
                                    /> : null}
                        </div>
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
