import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import history from '../public/history';
import cardImg from '../assets/card-template.png';
import AddFundModal from '../models/add-fund-modal.component';
import { SettingService } from '../services/Setting';
import { showLoader, hideLoader } from '../public/loader';

class Wallet extends Component {

    constructor(props){
        super(props);
        this.state= {
            showAddFundPopup: false,
            transactionHistory: [],
            userBalance: ''
        }
    }

    componentDidMount(){
        showLoader();
        Promise.all([SettingService.getTransactionHistory(), SettingService.getUserBalance()])
        .then((res)=>{
            if(res[0].data.status !== 'error'){
                this.setState({transactionHistory: res[0].data.transaction_history});
            }else {
                ToastsStore.error(res[0].message); 
            }
            if(res[1].data.status !== 'error'){
                this.setState({userBalance: res[1].data.user_balance});
            }else { 
                ToastsStore.error(res[1].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }

    openAddFundPopup = () => {
        this.setState({showAddFundPopup: true});
    }

    addFunds = (funds) => {
        if(funds){
            history.push({
                pathname: '/paymentoptions',
                val: funds
            })
        }
        else{
            ToastsStore.warning(`You didn't enter the funds.`); 
        }
    }

    render() { 
        const { showAddFundPopup, userBalance, transactionHistory } = this.state;
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
                                    <p>{userBalance} USD</p>
                                </div>
                                <div className="mt10" style={{backgroundImage: `url(${cardImg})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center', height:'230px'}}>
                                    <div className="">
                                        <button className="addFundsBtn" onClick={()=>this.openAddFundPopup()}>
                                            <img src={require('../assets/fingerprint.png')} style={{width:'30px'}} alt="finger print" />
                                            ADD FUNDS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8 clr__white alignCenter'>
                            <h2 className="mt20">Transaction History</h2>
                            <div className="border scrolling margin-auto w70 row">
                            {/* transactionHistory    ll implement it later */}
                                {/* <div className="col-md-2">
                                    <i className="fa fa-usd" />
                                </div>
                                <div className="col-md-8">
                                    <i className="fa fa-usd" />
                                </div>
                                <div className="col-md-2">
                                    July 2020 <br/>
                                    8:26 PM
                                </div> */}
                            </div>
                    </div>
                </div>

                {showAddFundPopup && (
                    <AddFundModal
                        showModal={showAddFundPopup}
                        handleAddFund={(funds)=>this.addFunds(funds)}
                        handleFundCloseModal={()=>this.setState({showAddFundPopup: false})}
                    />
                )}
            </div>
         );
    }
}
 
export default Wallet;