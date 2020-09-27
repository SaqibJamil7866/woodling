import React, { Component } from 'react';
import { MarketPlaceService } from '../services/MarketPlace';
import MarketPlacePost from './common/market_place-postCards.component';
import MarketPlaceModal from '../models/market-place-modal.component';
import { showLoader, hideLoader } from '../public/loader';
import { copyToClipboard } from '../public/helperFunctions';
import MarketPlaceFilter from './common/market-place-filter.component';
import SharePostModal from '../models/share-post-modal';
import PostOptionModal from '../models/post-option-modal';
import { AuthService } from '../services/AuthService';
import { PostCommentsService } from '../services/PostCommentService';
import { ReactComponent as AddButtonIcon } from '../assets/add-button.svg';

class MarketPlace extends Component {

    state = { 
        popular: true,
        feature: false,
        latest: false,
        fav: false, 
        postedProd: false,
        posts: [],
        status: '',
        sortedBy: 'popular',
        postModal: false,
        modalData: [],
        showSharePostModel: false,
        showPostOptionsModel: false
    }

    async componentDidMount() {
        showLoader();
        await MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
        .then((res) => {
            console.log(res.data.data)
            this.setState({posts: res.data.data, status: res.data.status})
        }).catch((e) => console.log(e))

        .then(() => hideLoader());
        hideLoader();
    }

    openPopularLink = () => {
        this.setState({popular: true, feature: false, latest: false, fav: false, postedProd: false, sortedBy: 'popular'}, () => {
            showLoader();
            MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
            .then((res) => {
                console.log(res.data.data)
                this.setState({posts: res.data.data, status: res.data.status})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
            hideLoader();
        });
    }

    openFeatureLink = () => {
        this.setState({feature: true, popular: false, latest: false, fav: false, postedProd: false, sortedBy: 'feature'}, () => {
            showLoader();
            MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
            .then((res) => {
                console.log(res.data.data)
                this.setState({posts: res.data.data, status: res.data.status})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
            hideLoader();
        });
    }

    openLatestLink = () => {
        this.setState({latest: true, popular: false, feature: false, fav: false, postedProd: false, sortedBy: 'newest'}, () => {
            showLoader();
            MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
            .then((res) => {
                this.setState({posts: res.data.data, status: res.data.status})
            }).catch((e) => console.log(e))
            
            .then(() => hideLoader());
            hideLoader();
        });
    }

    openFavLink = () => {
        this.setState({fav: true, postedProd: false, latest: false, feature: false, popular: false}, () => {
            showLoader();
            MarketPlaceService.getFavProduct()
            .then((res) => {
                this.setState({posts: res.data.favorite_products, status: res.data.status})
            }).catch((e) => console.log(e))

            .then(() => hideLoader());
            hideLoader();
        })
    }

    openPostedProdLink = () => {
        this.setState({postedProd: true, fav: false, latest: false, feature: false, popular: false}, () => {
            showLoader();
            MarketPlaceService.getMyPostedPost()
            .then((res) => {
                this.setState({posts: res.data.posted_adverts, status: res.data.status})
            }).catch((e) => console.log(e))
            
            .then(() => hideLoader());
            hideLoader();
        })
    }

    handleOpenModal = (data) => {
        this.setState({postModal: true, modalData: data});
    }

    handleCloseModal = () => {
        this.setState({postModal: false})
    }

    updateOnDeletePost= () => {
        if(this.state.popular){
            this.openPopularLink();
        }
        else if(this.state.feature){
            this.openFeatureLink();
        }
        else if(this.state.latest){
            this.openLatestLink();
        }
        else if(this.state.fav){
            this.openFavLink();
        }
        else if(this.state.postedProd){
            this.openPostedProdLink();
        }

        if(this.state.postModal){
            this.handleCloseModal();
        }
    }

    openPostOptionsModel = (post) =>{
        post.post_user_id = post.created_by;
        this.setState({showPostOptionsModel: true, selectedPost: post});
    }

    sharePost = () => {
        this.setState({showSharePostModel: true});
        // setShowSharePostModel(true);
    }

    copy_to_clipboard = (text) => {
        copyToClipboard(text);
    }

    addPostReaction = (postData) =>{
        const { post_id, like_status } = postData;
        const reaction = (like_status ? like_status : '0');
        const data = { user_id: AuthService.getUserId(), post_id , reaction: (reaction === '1' ? 'dislike':'like') };
        showLoader();
        PostCommentsService.addPostReaction(data).then((res)=>{
            hideLoader();
            postData.like_status = reaction === '1' ? '0' : '1';
            if(postData.like_status === '0'){
                postData.likes--;
            }
            else{
                postData.likes++;
            }
            this.setState({posts: [...this.state.posts, postData]});
        })
    }

    render() { 
        const {popular, feature, latest, posts, fav, postedProd, status, postModal, showPostOptionsModel, modalData, showSharePostModel} = this.state;
        return ( 
            <>
                <div className='h100p scrolling'>
                    <div className="row m0">
                        <div className='col-md-8 pl100 d-flex'>
                            <div>
                                <div className={fav || postedProd ? 'noDisplay' : 'd-flex space-between align-item mt20'}>
                                    <div className='d-flex'>
                                        <h1 className={popular ? 'p10 pointer' : 'p10 clr-grey pointer'} onClick={this.openPopularLink}>Popular</h1>
                                        <h1 className={feature ? 'p10 pointer' : 'p10 clr-grey pointer'} onClick={this.openFeatureLink}>Featured</h1>
                                        <h1 className={latest ? 'p10 pointer' : 'p10 clr-grey pointer'} onClick={this.openLatestLink}>Latest</h1>
                                    </div>
                                    <div className={this.state.fav || this.state.postedProd ? 'noDisplay' : null}>
                                        <i className="fa fa-heart-o fs25 red p10 pointer" onClick={this.openFavLink} title="Favourite" />
                                        <i className="fa fa-tags fs25 red p10 pointer" onClick={this.openPostedProdLink} title="PostedProducts" />
                                    </div>
                                </div>
                                <div className={popular || feature || latest ? 'noDisplay' : 'd-flex align-item mt20'}>
                                    <i onClick={this.openPopularLink} className='fa fa-arrow-left pointer' />
                                    <h3 className={fav ? 'p10 pointer' : 'p10 clr-grey pointer'} onClick={this.openFavLink}>Favourited</h3>
                                    <h3 className={postedProd ? 'p10 pointer' : 'p10 clr-grey pointer'} onClick={this.openPostedProdLink}>Posted Products/Services</h3>
                                </div>
                                <div className='mt20'>
                                    {popular ? status==='empty' ? 
                                                        <img src={require('../assets/Group 2055.svg')} />
                                                        :
                                                        <MarketPlacePost 
                                                            posts={posts}
                                                            copy_to_clipboard={this.copy_to_clipboard}
                                                            sharePost={this.sharePost}
                                                            handleOpenModal={this.handleOpenModal}
                                                            openPostOptionsModel={this.openPostOptionsModel}
                                                            addPostReaction={this.addPostReaction}
                                                        />
                                            : 
                                            null}
                                    
                                    {feature ? status==='empty' ? 
                                                        <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                        :
                                                        <MarketPlacePost 
                                                            posts={posts}
                                                            copy_to_clipboard={this.copy_to_clipboard}
                                                            sharePost={this.sharePost}
                                                            handleOpenModal={this.handleOpenModal}
                                                            openPostOptionsModel={this.openPostOptionsModel}
                                                            addPostReaction={this.addPostReaction}
                                                        />
                                            : 
                                            null}

                                    {latest ? status==='empty' ? 
                                                        <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                        :
                                                        <MarketPlacePost 
                                                            posts={posts}
                                                            copy_to_clipboard={this.copy_to_clipboard}
                                                            sharePost={this.sharePost}
                                                            handleOpenModal={this.handleOpenModal}
                                                            openPostOptionsModel={this.openPostOptionsModel}
                                                            addPostReaction={this.addPostReaction}
                                                        />
                                            : 
                                            null}
                                    
                                    {fav ? status==='empty' ? 
                                                        <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                        :
                                                        <MarketPlacePost 
                                                            posts={posts}
                                                            copy_to_clipboard={this.copy_to_clipboard}
                                                            sharePost={this.sharePost}
                                                            handleOpenModal={this.handleOpenModal}
                                                            openPostOptionsModel={this.openPostOptionsModel}
                                                            addPostReaction={this.addPostReaction}
                                                        />
                                            : 
                                            null}
                                    
                                    {postedProd ? status==='empty' ? 
                                                        <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                        :
                                                        <MarketPlacePost 
                                                            posts={posts}
                                                            copy_to_clipboard={this.copy_to_clipboard}
                                                            sharePost={this.sharePost}
                                                            handleOpenModal={this.handleOpenModal}
                                                            openPostOptionsModel={this.openPostOptionsModel}
                                                            addPostReaction={this.addPostReaction}
                                                        />
                                            : 
                                            null}

                                </div>
                            </div>
                            <div>
                                <AddButtonIcon className='pointer position-fixed ml20 mt30p' height="50px" width="50px" />
                            </div>
                        </div>

                        <div className='col-md-4 br-white'>
                            <MarketPlaceFilter />
                        </div>
                    </div>
                </div>
                {postModal ? (
                    <MarketPlaceModal 
                        modalData={modalData}
                        postModal={postModal}
                        handleOpenModal={this.handleOpenModal}
                        handleCloseModal={this.handleCloseModal}
                        copy_to_clipboard={this.copy_to_clipboard}
                        sharePost={this.sharePost}
                        openPostOptionsModel={this.openPostOptionsModel}
                        addPostReaction={this.addPostReaction}
                    />
                ) : null }

                <SharePostModal title="Share Post" sharedUrl={window.location.href} showModel={showSharePostModel} hideShareModel={()=> this.setState({showSharePostModel: false})} />
                <PostOptionModal
                    showModal={showPostOptionsModel}
                    hideModel={()=>this.setState({showPostOptionsModel: false})}
                    post={this.state.selectedPost}
                    updatePosts={this.updateOnDeletePost}
                />
            </>
         );
    }
}
 
export default MarketPlace;