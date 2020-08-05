import React, { Component } from 'react';
import { MarketPlaceService } from '../services/MarketPlace';
import MarketPlacePost from './common/market_place-postCards.component';
import MarketPlaceModal from '../models/market-place-modal.component';

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
        modalData: []
    }
    async componentDidMount() {
        await MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
        .then((res) => {
            this.setState({posts: res.data.data, status: res.data.status})
        }).catch((e) => console.log(e));
    }
    openPopularLink = () => {
        this.setState({popular: true, feature: false, latest: false, fav: false, postedProd: false, sortedBy: 'popular'}, () => {
            MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
            .then((res) => {
                console.log(res.data.data)
                this.setState({posts: res.data.data, status: res.data.status})
            }).catch((e) => console.log(e));
        });
    }
    openFeatureLink = () => {
        this.setState({feature: true, popular: false, latest: false, fav: false, postedProd: false, sortedBy: 'feature'}, () => {
            MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
            .then((res) => {
                console.log(res.data.data)
                this.setState({posts: res.data.data, status: res.data.status})
            }).catch((e) => console.log(e));
        });
    }
    openLatestLink = () => {
        this.setState({latest: true, popular: false, feature: false, fav: false, postedProd: false, sortedBy: 'newest'}, () => {
            MarketPlaceService.getPopularProduct(1, this.state.sortedBy)
            .then((res) => {
                this.setState({posts: res.data.data, status: res.data.status})
            }).catch((e) => console.log(e));
        });
    }
    openFavLink = () => {
        this.setState({fav: true, postedProd: false, latest: false, feature: false, popular: false}, () => {
            MarketPlaceService.getFavProduct()
            .then((res) => {
                this.setState({posts: res.data.favorite_products, status: res.data.status})
            }).catch((e) => console.log(e))
        })
    }
    openPostedProdLink = () => {
        this.setState({postedProd: true, fav: false, latest: false, feature: false, popular: false}, () => {
            MarketPlaceService.getMyPostedPost()
            .then((res) => {
                this.setState({posts: res.data.posted_adverts, status: res.data.status})
            }).catch((e) => console.log(e))
        })
    }
    handleOpenModal = (data) => {
        console.log(data)
        this.setState({postModal: true, modalData: data});
    }
    handleCloseModal = () => {
        this.setState({postModal: false})
    }
    render() { 
        const {popular, feature, latest, posts, fav, postedProd, status, postModal, modalData} = this.state;
        return ( 
            <>
                <div className='h100p scrolling'>
                    <div className="row m0">
                        <div className='col-md-8 pl100'>
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
                                                        handleOpenModal={this.handleOpenModal}
                                                    />
                                        : 
                                        null}
                                
                                {feature ? status==='empty' ? 
                                                    <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                    :
                                                    <MarketPlacePost 
                                                        posts={posts}
                                                        handleOpenModal={this.handleOpenModal}
                                                    />
                                        : 
                                        null}

                                {latest ? status==='empty' ? 
                                                    <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                    :
                                                    <MarketPlacePost 
                                                        posts={posts}
                                                        handleOpenModal={this.handleOpenModal}
                                                    />
                                        : 
                                        null}
                                
                                {fav ? status==='empty' ? 
                                                    <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                    :
                                                    <MarketPlacePost 
                                                        posts={posts}
                                                        handleOpenModal={this.handleOpenModal}
                                                    />
                                        : 
                                        null}
                                
                                {postedProd ? status==='empty' ? 
                                                    <img style={{width: '55%'}} src={require('../assets/Group 2055.svg')} />
                                                    :
                                                    <MarketPlacePost 
                                                        posts={posts}
                                                        handleOpenModal={this.handleOpenModal}
                                                    />
                                        : 
                                        null}

                            </div>
                        </div>
                        <div className='col-md-4 br-white'>

                        </div>
                    </div>
                </div>
                {postModal ? <MarketPlaceModal 
                                modalData={modalData}
                                postModal={postModal}
                                handleOpenModal={this.handleOpenModal}
                                handleCloseModal={this.handleCloseModal}
                            /> : null}
            </>
         );
    }
}
 
export default MarketPlace;