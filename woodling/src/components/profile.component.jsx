/* eslint-disable prefer-destructuring */
import React, {Component} from 'react';
import { ToastsStore } from 'react-toasts';
import { showLoader, hideLoader } from '../public/loader';
import history from '../public/history';
import { UserService } from '../services/UserService';
import { FollowService } from '../services/FollowService';
import { siteUrl } from '../public/endpoins';
import ProfilePicHeader from './common/profile-header.component';
import UserExperience from './common/profile-user-experience.component';
import UserAlbum from './common/profile-user-album.component';
import Post from './common/post.component';
import { AuthService } from '../services/AuthService';
import UserAbout from './common/profile-user-about.component';
import UserFollowing from './common/profile-user-following.component';
import UserFollowers from './common/profile-user-followers.component';
import Reviews from './common/profile-user-rating.component';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: [],
            rolesData: [],
            userAlbum: [],
            userExperience: [],
            userReviews: [],
            userPosts: [],
            userTags: [],
            userFollowing: [],
            userFollowers: [],
            followingId: [],
            followerId: [],
            myFollowing: [],
            albums: true,
            post: false,
            tag: false,
            reviews: false,
            experience: false,
            about: false,
            following: false,
            follower: false,
            userModal: false,
            ratingModal: false,
            userModalData: {},
            status: ''
        }
    }

    async componentDidMount(){
        showLoader();
        const data = history.location.state.data;
        const people = history.location.state.people;
        await UserService.getUserProfileData(data.id)
        .then((res)=>{
            this.setState({userData: res.data.data, userExperience: res.data.user_experience, rolesData: res.data.user_roles, status: res.data.status});
            // console.log("user details: ", res.data);
        }).catch((e)=>console.error("error: "+ e));

        await UserService.getUserProfileAlbum(data.id)
        .then((res) => {
            this.setState({userAlbum: res.data.albums, status: res.data.status})
        }).catch((e)=>console.error("error: "+ e))

        await FollowService.getUSerFollowings(data.id)
        .then((res) => {
            this.setState({userFollowing: res.data.data, status: res.data.status}, () => {
                if(this.state.status!=='empty') {
                    this.state.userFollowing.map((i, index) => {
                        UserService.getUserProfileData(i.id)
                        .then((res)=>{
                            this.state.followingId.push(res.data.data)
                        })
                    })
                }
            })
        }).catch((e)=>console.error("error: "+ e))

        await FollowService.getUSerFollowings()
        .then((res) => {
            this.setState({myFollowing: res.data.data, status: res.data.status})
        }).catch((e)=>console.error("error: "+ e))

        await FollowService.getUSerFollowiers(data.id)
        .then((res) => {
            this.setState({userFollowers: res.data.data, status: res.data.status}, () => {
                if(this.state.userFollowers){
                    this.state.userFollowers.map((i, index) => {
                        UserService.getUserProfileData(i.id)
                        .then((res) => {
                            res.data.data.id = i.id;
                            this.state.followerId.push(res.data.data)
                        })
                    })
                }
            })
        }).catch((e)=>console.error("error: "+ e))

        await UserService.getUserProfileReview(data.id)
        .then((res) => {
            this.setState({userReviews: res.data.user_review, status: res.data.status})
            console.log('userReview', res)
        }).catch((e)=>console.error("error: "+ e))
        
        await UserService.getUserPost(data.id)
        .then((res) => {
            this.setState({userPosts: res.data.data, status: res.data.status})
        }).catch((e)=>console.error("error: "+ e))

        await UserService.getUserTagPost(data.id)
        .then((res) => {
            this.setState({userTags: res.data.data, status: res.data.status});
        }).catch((e)=>console.error("error: "+ e))

        .then(() => hideLoader());
        hideLoader();
    }

    onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }

    openAlbumLink = () => {
        this.setState({albums: true, post: false, tag: false, reviews: false, experience: false, about: false, following: false, follower: false});
    }

    openPostLink = () => {
        this.setState({post: true, albums: false, tag: false, reviews: false, experience: false, about: false, following: false, follower: false});
    }

    openTagLink = () => {
        this.setState({tag: true, albums: false, post: false, reviews: false, experience: false, about: false, following: false, follower: false})
    }

    openRatingLink = () => {
        this.setState({reviews: true, albums: false, post: false, tag: false, experience: false, about: false, following: false, follower: false})
    }

    openExperienceLink = () => {
        this.setState({experience: true, albums: false, post: false, tag: false, reviews: false, about: false, following: false, follower: false});
    }

    openAboutLink = () => {
        this.setState({about: true, albums: false, post: false, tag: false, reviews: false, experience: false, following: false, follower: false});
    }

    openFollowingLink = () => {
        this.setState({following: true, albums: false, post: false, tag: false, reviews: false, experience: false, about: false, follower: false})
    }

    openFollowerLink = () => {
        this.setState({follower: true, albums: false, post: false, tag: false, reviews: false, experience: false, about: false, following: false})
    }

    openRatingModal = () => {
        this.setState({ratingModal: true});
    }
    
    closeRatingModal = () => {
        this.setState({ratingModal: false});
    }

    openModal = (data) => {
        this.setState({userModal: true, userModalData: data});
    }

    closeModal = () => {
        this.setState({userModal: false});
    }

    followUnfollowUser = (index) => {
        const { followerId } = this.state;
        const data = { user_id: AuthService.getUserId(), follower_id: followerId[index].id};
        showLoader();
        if(followerId[index].following_status){
            FollowService.unfollowUser(data).then((res)=>{
                hideLoader();
                if(res.data.status !== 'error'){
                    followerId[index].following_status = false;
                    this.setState({followerId});
                    ToastsStore.success(res.data.message);
                }
            });
        }
        else{
            FollowService.followUser(data).then((res)=>{
                hideLoader();
                if(res.data.status !== 'error'){
                    followerId[index].following_status = true;
                    this.setState({followerId});
                    ToastsStore.success(res.data.message);
                }
            });
        }
    }

    render(){
        const {people, status, albums, post, tag, reviews, experience, about, following, userExperience, userModal, userModalData, userAlbum, rolesData, userFollowing, followingId, myFollowing, follower, followerId, userFollowers, website, userPosts, ratingModal, userTags, userReviews} = this.state;
        const {email, address, date_of_birth, gender, marital_status, phone_1, rating, profile_picture, username, cover_picture, full_name, bio, post_count, tag_count, rating_count, followers_count, following_count, following_status} = this.state.userData;
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
                                bio={people ? 'No Bio Found' : bio}
                                userModal={ratingModal}
                                openModal={this.openRatingModal}
                                closeModal={this.closeRatingModal}
                                id={history.location.state.data.id}
                                following_status={following_status}
                            />
                        </div>
                        <div className='border-bottom'>
                            <ul className='no-text-decoration d-flex space-evenly p0 mb0'>
                                <li className={albums ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openAlbumLink}>Albums</li>
                                <li className={post ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openPostLink}>{post_count} Posts</li>
                                <li className={tag ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openTagLink}>{tag_count} Tags</li>
                                <li className={reviews ? 'p10 clr__red border-top-bottom pointer' : 'p10 pointer'} onClick={this.openRatingLink}>{rating_count} Ratings</li>
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
                            {experience ? status==='empty' ? <p>No Experience Found</p> 
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

                            {post  ? userPosts==='empty' ? <p>No Post Found</p> 
                                    : <Post 
                                        posts={userPosts} 
                                        profile_picture={profile_picture}
                                        onCrash={this.onCrash}
                                    />
                                    : null}

                            {tag ? userTags==='empty' ? <p>No Tags Found</p> 
                                    : <Post 
                                        posts={userTags}
                                        profile_picture={profile_picture}
                                        onCrash={this.onCrash}
                                    /> : null}
                            
                            {reviews ? userReviews==='empty' ? <p>No Rating Found</p> 
                                    : <Reviews 
                                        userReviews={userReviews}
                                        onCrash={this.onCrash}
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

                            {following ? status==='empty' ? <p>No Following Found</p> : <UserFollowing
                                            followingId={followingId}
                                            userFollowing={userFollowing}
                                            myFollowing={myFollowing}
                                            onCrash={this.onCrash}
                                            followUnfollowUser={this.followUnfollowUser}
                                        /> : null}

                            {follower ? status==='empty' ? <p>No Followers Found</p> : <UserFollowers 
                                            followerId={followerId}
                                            userFollowers={userFollowers}
                                            onCrash={this.onCrash}
                                            followUnfollowUser={this.followUnfollowUser}
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
