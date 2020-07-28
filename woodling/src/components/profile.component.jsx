/* eslint-disable prefer-destructuring */
import React, {Component} from 'react';
import { showLoader, hideLoader } from '../public/loader';
import history from '../public/history';
import { UserService } from '../services/UserService';
import { FollowService } from '../services/FollowService';
import { siteUrl } from '../public/endpoins';
import ProfilePicHeader from './common/profile-header.component';
import UserExperience from './common/profile-user-experience.component';
import UserAlbum from './common/profile-user-album.component';
import UserAbout from './common/profile-user-about.component';
import UserFollowing from './common/profile-user-following.component';
import UserFollowers from './common/profile-user-followers.component';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: [],
            rolesData: [],
            userAlbum: [],
            userExperience: [],
            userFollowing: [],
            userFollowers: [],
            userReviews: [],
            followingId: [],
            followerId: [],
            myFollowing: [],
            albums: true,
            post: false,
            experience: false,
            about: false,
            following: false,
            follower: false,
            userModal: false,
            userModalData: {}
        }
    }

    async componentDidMount(){
        showLoader();
        const data = history.location.state.data;
        await UserService.getUserProfileData(data.id)
        .then((res)=>{
            this.setState({userData: res.data.data, userExperience: res.data.user_experience, rolesData: res.data.user_roles});
            // console.log("user details: ", res.data);
        }).catch((e)=>console.error("error: "+ e));

        await UserService.getUserProfileAlbum(data.id)
        .then((res) => {
            this.setState({userAlbum: res.data.albums})
        }).catch((e)=>console.error("error: "+ e))

        await FollowService.getUSerFollowings(data.id)
        .then((res) => {
            this.setState({userFollowing: res.data.data}, () => {
                this.state.userFollowing.map((i, index) => {
                    UserService.getUserProfileData(i.id)
                    .then((res)=>{
                        this.state.followingId.push(res.data.data)
                    })
                })
            })
        }).catch((e)=>console.error("error: "+ e))

        await FollowService.getUSerFollowings()
        .then((res) => {
            this.setState({myFollowing: res.data.data})
        }).catch((e)=>console.error("error: "+ e))

        await FollowService.getUSerFollowiers(data.id)
        .then((res) => {
            this.setState({userFollowers: res.data.data}, () => {
                this.state.userFollowers.map((i, index) => {
                    UserService.getUserProfileData(i.id)
                    .then((res) => {
                        this.state.followerId.push(res.data.data)
                    })
                })
            })
        }).catch((e)=>console.error("error: "+ e))

        await UserService.getUserProfileReview(data.id)
        .then((res) => {
            //this.setState({userReviews: res.data.user_review})
            console.log('userReview', res)
        })
        
        .then(() => hideLoader());
        hideLoader();
    }

    onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }

    openAlbumLink = () => {
        this.setState({albums: true, post: false, experience: false, about: false, following: false, follower: false});
    }

    openPostLink = () => {
        this.setState({post: true, albums: false, experience: false, about: false, following: false, follower: false});
    }

    openExperienceLink = () => {
        this.setState({experience: true, albums: false, post: false, about: false, following: false, follower: false});
    }

    openAboutLink = () => {
        this.setState({about: true, albums: false, post: false, experience: false, following: false, follower: false});
    }

    openFollowingLink = () => {
        this.setState({following: true, albums: false, post: false, experience: false, about: false, follower: false})
    }

    openFollowerLink = () => {
        this.setState({follower: true, albums: false, post: false, experience: false, about: false, following: false})
    }

    openModal = (data) => {
        this.setState({userModal: true, userModalData: data});
    }
    closeModal = () => {
        this.setState({userModal: false});
    }

    render(){
        const {albums, post, experience, about, following, userExperience, userModal, userModalData, userAlbum, rolesData, userFollowing, followingId, myFollowing, follower, followerId, userFollowers, website} = this.state;
        const {email, address, date_of_birth, gender, marital_status, phone_1, rating, profile_picture, username, cover_picture, full_name, bio, post_count, tag_count, rating_count, followers_count, following_count} = this.state.userData;
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
                                <li className={about ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openAboutLink}>About</li>
                                <li className={experience ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openExperienceLink}>Experience</li>
                                <li className={follower? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openFollowerLink}>{followers_count} Followers</li>
                                <li className={following ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openFollowingLink}>{following_count} Following</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row d-flex m0">
                    <div className="col-md-12 br-white pl80">
                        <div className='mt20'>
                            {experience ? userExperience==='empty' ? <p>No Experience Found</p> 
                                        :<UserExperience 
                                            userExperience={userExperience} 
                                            userModal={userModal}
                                            openModal={this.openModal}
                                            closeModal={this.closeModal}
                                            userModalData={userModalData}
                                        /> : null}
                            {albums ? userAlbum==='empty' ?<p>No Albums found</p> : <UserAlbum 
                                        userAlbum={userAlbum}
                                    /> : null}
                            {about ? <UserAbout 
                                            full_name={full_name}
                                            email={email}
                                            address={address}
                                            date_of_birth={date_of_birth}
                                            gender={gender}
                                            marital_status={marital_status}
                                            phone_1={phone_1}
                                            rolesData={rolesData}
                                            website={website}
                                    /> : null}

                            {following ? userFollowing==='empty' ? <p>No Following Found</p> : <UserFollowing
                                            followingId={followingId}
                                            userFollowing={userFollowing}
                                            myFollowing={myFollowing}
                                            onCrash={this.onCrash}
                                        /> : null}

                            {follower ? userFollowers==='empty' ? <p>No Followers Found</p> : <UserFollowers 
                                            followerId={followerId}
                                            userFollowers={userFollowers}
                                            onCrash={this.onCrash}
                                        />:null}
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
