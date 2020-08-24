import React, {Component} from 'react';
import MarketPlacePost from './market_place-postCards.component';
import MarketPlaceModal from '../../models/market-place-modal.component';


class SearchServices extends Component {
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
        const { allServices, scrollRef, loadMoreServices } = this.props;
        const { modalData, postModal } = this.state;
        return ( 
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <MarketPlacePost 
                            posts={allServices}
                            handleOpenModal={this.handleOpenModal}
                            scrollRef={scrollRef}
                        />
                        {allServices && allServices.length!==0 ? (
                        <div className='d-flex justify-content-center w80'>
                            <button onClick={loadMoreServices} className='load-btn'>Load More</button>
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
 
export default SearchServices;