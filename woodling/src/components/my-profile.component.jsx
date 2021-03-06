import React, { Component } from 'react';
import { AuthService } from '../services/AuthService';
import ProfilePicHeader from './common/profile-header.component';
import { showLoader, hideLoader } from '../public/loader';
import { UserService } from '../services/UserService';
import { FollowService } from '../services/FollowService';
import { siteUrl, picUrl } from '../public/endpoins';
import UserExperience from './common/profile-user-experience.component';
import UserAlbum from './common/profile-user-album.component';
import InsightPost from './common/insightPosts.component';
import Post from './common/post.component';
import Reviews from './common/profile-user-rating.component';
import UserFollowers from './common/profile-user-followers.component';
import UserFollowing from './common/profile-user-following.component';
import UserAbout from './common/profile-user-about.component';

class MyProfile extends Component {
  constructor(props) {
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
      promotion: false,
      userModal: false,
      ratingModal: false,
      accountModal: false,
      userModalData: {},
      status: '',
      MyProfile: true,
    };
  }

  async componentDidMount() {
    showLoader();
    const userId = AuthService.getUserId();
    await UserService.getUserProfileData(userId)
      .then((res) => {
        this.setState({
          userData: res.data.data,
          userExperience: res.data.user_experience,
          rolesData: res.data.user_roles,
          status: res.data.status,
        });
        // console.log("user details: ", res.data);
      })
      .catch((e) => console.error('error: ' + e));

    await UserService.getUserProfileAlbum(userId)
      .then((res) => {
        this.setState({ userAlbum: res.data.albums, status: res.data.status });
      })
      .catch((e) => console.error('error: ' + e));

    await FollowService.getUSerFollowings(userId)
      .then((res) => {
        this.setState(
          { userFollowing: res.data.data, status: res.data.status },
          () => {
            if (this.state.status !== 'empty') {
              this.state.userFollowing.map((i, index) => {
                UserService.getUserProfileData(i.id).then((res) => {
                  this.state.followingId.push(res.data.data);
                });
              });
            }
          }
        );
      })
      .catch((e) => console.error('error: ' + e));

    await FollowService.getUSerFollowings()
      .then((res) => {
        this.setState({ myFollowing: res.data.data, status: res.data.status });
      })
      .catch((e) => console.error('error: ' + e));

    await FollowService.getUSerFollowiers(userId)
      .then((res) => {
        this.setState(
          { userFollowers: res.data.data, status: res.data.status },
          () => {
            this.state.userFollowers &&
              this.state.userFollowers.map((i, index) => {
                UserService.getUserProfileData(i.id).then((res) => {
                  this.state.followerId.push(res.data.data);
                });
              });
          }
        );
      })
      .catch((e) => console.error('error: ' + e));

    await UserService.getUserProfileReview(userId)
      .then((res) => {
        this.setState({
          userReviews: res.data.user_review,
          status: res.data.status,
        });
        console.log('userReview', res);
      })
      .catch((e) => console.error('error: ' + e));

    await UserService.getUserPost(userId)
      .then((res) => {
        this.setState({ userPosts: res.data.data, status: res.data.status });
      })
      .catch((e) => console.error('error: ' + e));

    await UserService.getUserTagPost(userId)
      .then((res) => {
        this.setState({ userTags: res.data.data, status: res.data.status });
      })
      .catch((e) => console.error('error: ' + e))

      .then(() => hideLoader());
    hideLoader();
  }

  onCrash = (e) => {
    e.currentTarget.src =
      'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png';
  };

  openAlbumLink = () => {
    this.setState({
      albums: true,
      post: false,
      tag: false,
      reviews: false,
      experience: false,
      about: false,
      following: false,
      follower: false,
      promotion: false,
    });
  };

  openPostLink = () => {
    this.setState({
      post: true,
      albums: false,
      tag: false,
      reviews: false,
      experience: false,
      about: false,
      following: false,
      follower: false,
      promotion: false,
    });
  };

  openTagLink = () => {
    this.setState({
      tag: true,
      albums: false,
      post: false,
      reviews: false,
      experience: false,
      about: false,
      following: false,
      follower: false,
      promotion: false,
    });
  };

  openRatingLink = () => {
    this.setState({
      reviews: true,
      albums: false,
      post: false,
      tag: false,
      experience: false,
      about: false,
      following: false,
      follower: false,
      promotion: false,
    });
  };

  openExperienceLink = () => {
    this.setState({
      experience: true,
      albums: false,
      post: false,
      tag: false,
      reviews: false,
      about: false,
      following: false,
      follower: false,
      promotion: false,
    });
  };

  openAboutLink = () => {
    this.setState({
      about: true,
      albums: false,
      post: false,
      tag: false,
      reviews: false,
      experience: false,
      following: false,
      follower: false,
      promotion: false,
    });
  };

  openFollowingLink = () => {
    this.setState({
      following: true,
      albums: false,
      post: false,
      tag: false,
      reviews: false,
      experience: false,
      about: false,
      follower: false,
      promotion: false,
    });
  };

  openFollowerLink = () => {
    this.setState({
      follower: true,
      albums: false,
      post: false,
      tag: false,
      reviews: false,
      experience: false,
      about: false,
      following: false,
      promotion: false,
    });
  };

  openPromotionLink = () => {
    this.setState({
      promotion: true,
      albums: false,
      post: false,
      tag: false,
      reviews: false,
      experience: false,
      about: false,
      following: false,
      follower: false,
    });
  };

  openRatingModal = () => {
    this.setState({ ratingModal: true });
  };

  closeRatingModal = () => {
    this.setState({ ratingModal: false });
  };

  openModal = (data) => {
    this.setState({ userModal: true, userModalData: data });
  };

  closeModal = () => {
    this.setState({ userModal: false });
  };

  openAccountModal = () => {
    this.setState({ accountModal: true });
  };

  closeAccountModal = () => {
    this.setState({ accountModal: false });
  };

  render() {
    const {
      status,
      MyProfile,
      albums,
      post,
      tag,
      reviews,
      experience,
      about,
      following,
      userExperience,
      userModal,
      userModalData,
      userAlbum,
      rolesData,
      userFollowing,
      followingId,
      myFollowing,
      follower,
      followerId,
      userFollowers,
      website,
      userPosts,
      ratingModal,
      userTags,
      userReviews,
      accountModal,
      promotion,
    } = this.state;
    const {
      email,
      address,
      date_of_birth,
      gender,
      marital_status,
      phone_1,
      rating,
      profile_picture,
      username,
      cover_picture,
      full_name,
      bio,
      post_count,
      tag_count,
      rating_count,
      followers_count,
      following_count,
    } = this.state.userData;
    return (
      <div className="h100p scrolling">
        <div className="row m0">
          <div className="col-md-12 p0">
            <img
              style={{ width: '100%', height: '300px' }}
              src={
                cover_picture
                  ? siteUrl + '' + cover_picture
                  : require('../assets/cover.svg')
              }
            />
            <div className="center__item clr__white flex-dir-col align-item">
              <div />
              <ProfilePicHeader
                rating={rating}
                profile_picture={profile_picture}
                username={username}
                full_name={full_name}
                bio={bio}
                userModal={ratingModal}
                openModal={this.openRatingModal}
                closeModal={this.closeRatingModal}
                id={AuthService.getUserId()}
                accountModal={accountModal}
                openAccountModal={this.openAccountModal}
                closeAccountModal={this.closeAccountModal}
                myProfile={MyProfile}
              />
            </div>
            <div className="border-bottom">
              <ul className="no-text-decoration d-flex space-evenly p0 mb0">
                <li
                  className={
                    albums
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openAlbumLink}
                >
                  Albums
                </li>
                <li
                  className={
                    post
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openPostLink}
                >
                  {post_count} Posts
                </li>
                <li
                  className={
                    tag
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openTagLink}
                >
                  {tag_count} Tags
                </li>
                <li
                  className={
                    reviews
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openRatingLink}
                >
                  {rating_count} Ratings
                </li>
                <li
                  className={
                    about
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openAboutLink}
                >
                  About
                </li>
                <li
                  className={
                    experience
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openExperienceLink}
                >
                  Experience
                </li>
                <li
                  className={
                    follower
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openFollowerLink}
                >
                  {followers_count} Followers
                </li>
                <li
                  className={
                    following
                      ? 'p10 clr__red border-top-bottom pointer'
                      : 'p10 pointer'
                  }
                  onClick={this.openFollowingLink}
                >
                  {following_count} Following
                </li>
                <div className="d-flex flex-dir-col">
                  <li
                    className={
                      promotion
                        ? 'p10 clr__red border-top-bottom pointer'
                        : 'p10 pointer'
                    }
                    onClick={this.openPromotionLink}
                  >
                    Promotion
                  </li>
                  {promotion ? (
                    <select className="border-none">
                      <option>Active</option>
                      <option>Paused</option>
                      <option>Completed</option>
                    </select>
                  ) : null}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="row d-flex m0">
          <div className="col-md-12 br-white pl80">
            <div className="mt20">
              {experience ? (
                status === 'empty' ? (
                  <p>No Experience Found</p>
                ) : (
                  <UserExperience
                    userExperience={userExperience}
                    userModal={userModal}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    userModalData={userModalData}
                  />
                )
              ) : null}

              {albums ? (
                userAlbum === 'empty' ? (
                  <p>No Albums found</p>
                ) : (
                  <UserAlbum userAlbum={userAlbum} />
                )
              ) : null}

              {post ? (
                userPosts === 'empty' ? (
                  <p>No Post Found</p>
                ) : (
                  <Post
                    posts={userPosts}
                    profile_picture={profile_picture}
                    onCrash={this.onCrash}
                  />
                )
              ) : null}

              {tag ? (
                userTags === 'empty' ? (
                  <p>No Tags Found</p>
                ) : (
                  <Post
                    posts={userTags}
                    profile_picture={profile_picture}
                    onCrash={this.onCrash}
                  />
                )
              ) : null}

              {reviews ? (
                userReviews === 'empty' ? (
                  <p>No Rating Found</p>
                ) : (
                  <Reviews userReviews={userReviews} onCrash={this.onCrash} />
                )
              ) : null}

              {about ? (
                <UserAbout
                  full_name={full_name}
                  email={email}
                  address={address}
                  date_of_birth={date_of_birth}
                  gender={gender}
                  marital_status={marital_status}
                  phone_1={phone_1}
                  rolesData={rolesData}
                  website={website}
                />
              ) : null}

              {following ? (
                status === 'empty' ? (
                  <p>No Following Found</p>
                ) : (
                  <UserFollowing
                    followingId={followingId}
                    userFollowing={userFollowing}
                    myFollowing={myFollowing}
                    onCrash={this.onCrash}
                  />
                )
              ) : null}

              {follower ? (
                status === 'empty' ? (
                  <p>No Followers Found</p>
                ) : (
                  <UserFollowers
                    followerId={followerId}
                    userFollowers={userFollowers}
                    onCrash={this.onCrash}
                  />
                )
              ) : null}

              {promotion ? (
                userPosts === 'empty' ? (
                  <p>No Post Found</p>
                ) : (
                  <InsightPost
                    posts={userPosts}
                    profile_picture={profile_picture}
                    onCrash={this.onCrash}
                  />
                )
              ) : null}
            </div>
          </div>

          <div className="mt10 mb10">{/* <ExploreCard /> */}</div>
        </div>
      </div>
    );
  }
}

export default MyProfile;
