import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import PaystackButton from 'react-paystack'; 
import AddAmountModel from '../component/models/AddAmountModel';  
import PaypalExpressBtn from 'react-paypal-express-checkout';
import  {WalletServices} from '../services/WalletServices'; 
 
import { PayPalButton } from 'react-paypal-button';

 import moment from "moment";
  import Moment from 'react-moment';
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

class WalletScreen extends React.Component {
    constructor(props){  
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            homeSliders:[],
            sliderLoad:true,
            homeData:[],
            homeDataLoad:true,
            modelType:'',
            key: "pk_test_d843094e5d98ad888990b7bdfa8a54b03b944983", //PAYSTACK PUBLIC KEY
            email: "foobar@example.com",  // customer email
            amount: 10000,
            addAmountModelStatus: false,
            userBalance:0.00,
            walletHistory:[],
        }  
        this.callBackCloseModel = this.callBackCloseModel.bind(this);
        this.getUserBalance = this.getUserBalance.bind(this);
        this.getWalletHistory = this.getWalletHistory.bind(this);
        this.addAmount = this.addAmount.bind(this);
    } 

    componentDidMount() {  
       this.getUserBalance();
       this.getWalletHistory();
    } 
    // get user balance
    getUserBalance(){
         try{  
          WalletServices.userBalance().then(async (result) => {
             if(result.status){  
                 //console.log(result.user_balance[0].usd_balance);
                  this.setState(
                    {userBalance: result.user_balance[0].usd_balance}
                  ); 
                    
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("jhere");
      }  
    } 
    getWalletHistory(){
         try{  
          WalletServices.getWalletHistory().then(async (result) => {
             if(result.status){  
                 //console.log(result.user_balance[0].usd_balance);
                  this.setState(
                    {walletHistory: result.data}
                  ); 
                    
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("jhere");
      }  
    } 
    addAmount(){
         try{  
          WalletServices.AddAmount().then(async (result) => {
             if(result.status){  
                 //console.log(result.user_balance[0].usd_balance);
                  this.setState(
                    {userBalance: result.data[0].usd_balance}
                  ); 
                  this.getWalletHistory();
                  toast.success("Your wallet balance is "+result.data[0].usd_balance+" USD");  
                }else {
                    console.log(result); 
                  
                } 
          });
        }catch(e){
             console.log('error', e);
              alert("jhere");
      }  
    }
    callBackCloseModel(){
        this.setState({ addAmountModelStatus:false }); 
    }
    
    addFundModal(){
         this.setState({addAmountModelStatus:true});
    }  

     
    render() { 
        const { walletHistory } = this.state; 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        } 
          var walletHistoryList = '';
           walletHistoryList = walletHistory.map((wallet,index)=>{ 
                    return   <li>
                                    <div class="history-list">
                                        <div class="Transation">
                                            <img src={require('../assets/img/doller.png')} alt="" />
                                            <div class="Transation-price">
                                                <h2 class="credit-funding-price">+ {wallet.amount}</h2>
                                                <p class="credit-funding">Credit > Funding</p>
                                            </div>     
                                        </div> 
                                        <div class="transation-date_time">
                                            <p> <Moment format="MMM DD, Y">{wallet.payment_date}</Moment> </p>
                                            <p><Moment format="hh:mm:ss">{wallet.payment_date}</Moment> </p>
                                        </div>    
                                    </div>
                              </li>;
              }); 
        
        return (
             <div className="page">
                    <ToastContainer />
                  <div class="wallet-page">
                    <div class="wallet-title-main">
                        <h2>Wallet</h2><img src={require('../assets/img/wallet.png')} />
                    </div>  
                    <div class="wallet-section">
                        <div class="wallet-count">
                            <div class="wallet-activity">
                                <div class="wallet-title">
                                    <h2>Total Balance</h2>
                                </div>
                                <div class="total-balance">
                                    <span><i class="fas fa-dollar-sign"></i></span>
                                    <p>
                                       {this.state.userBalance} USD
                                    </p>
                                </div>

                                <div class="debit-card">
                                    <img src={require('../assets/img/card-template.png')} />
                                    <button  onClick={this.addFundModal.bind(this)} class="card-fund-btnt"><i class="fas fa-fingerprint"></i>Add Funds</button>
                                </div>          
                            </div>
                            
                        </div>
                        <div class="transation-history">
                            <div class="transation-history-title">
                                <h2>Transation History</h2>
                            </div>
                            <div class="transation-history-list">
                                <ul>
                                    {walletHistoryList} 
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price debit-promotion-price">- $20</h2>
                                                    <p class="credit-funding">Debit > Promotion</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                             </div>    
                                        </div>
                                    </li> 
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>  

                { this.state.addAmountModelStatus && 
                    <AddAmountModel  sendCallBackCloseModel={this.callBackCloseModel} recivePaymentCallBack={this.addAmount}/>
                }
             </div>
        );
    }
} 
export default WalletScreen