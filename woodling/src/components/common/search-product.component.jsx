import React, {Component} from 'react';
import MarketPlacePost from './market_place-postCards.component';
import MarketPlaceModal from '../../models/market-place-modal.component';

class SearchProduct extends Component {
    state = {
        postModal: false,
        modalData: []
    }
    handleOpenModal = (data) => {
        this.setState({postModal: true, modalData: data});
    }
    handleCloseModal = () => {
        this.setState({postModal: false})
    }
    render() {
        const { allProducts, loadMoreProducts, scrollRef } = this.props;
        const { modalData, postModal } = this.state;
        return ( 
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <MarketPlacePost 
                            posts={allProducts}
                            handleOpenModal={this.handleOpenModal}
                            scrollRef={scrollRef}
                        />
                        {allProducts && allProducts.length!==0 ? (
                        <div className='d-flex justify-content-center w80'>
                            <button onClick={loadMoreProducts} className='load-btn'>Load More</button>
                        </div>
                    ): null}
                    </div>
                </div>
                {postModal ? <MarketPlaceModal 
                                modalData={modalData}
                                postModal={postModal}
                                handleOpenModal={this.handleOpenModal}
                                handleCloseModal={this.handleCloseModal}
                            /> : null}
            </div>
        );
    }
}
 
export default SearchProduct;