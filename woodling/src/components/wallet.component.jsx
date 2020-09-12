import React, { Component } from 'react';

class Wallet extends Component {

    constructor(props){
        super(props);
    }


    render() { 
        // const { profile, account, notification, privacy, sharing, faq, about } = this.state;
        return ( 
            <div className='h100p scrolling'>
                <div className='row m0 '>
                    <h1 className='mt10 p20 ml20 w100p'><b>Wallet</b></h1>
                    <div className='col-md-4 border-right clr__white'>
                        <div className=" alignCenter">
                            <h2 className="mt20">Total Balance</h2>
                            <div className="">
                                <div className="border margin-auto w140">
                                    <i className="_ml115 fa fa-usd" />
                                    <p>20.039 USD</p>
                                </div>
                                <div>
                                    <img src={require('../assets/atm-card.png')} alt="Atm Card"/>
                                    <img src={require('../assets/add-fund-btn.png')} alt="btn" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8 clr__white alignCenter'>
                            <h2 className="mt20">Transaction History</h2>
                            <div className="border scrolling margin-auto w70 row">
                                <div className="col-md-2">
                                    <i className="fa fa-usd" />
                                </div>
                                <div className="col-md-8">
                                    <i className="fa fa-usd" />
                                </div>
                                <div className="col-md-2">
                                    July 2020 <br/>
                                    8:26 PM
                                </div>
                            </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Wallet;