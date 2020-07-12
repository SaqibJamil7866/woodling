import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import PaystackButton from 'react-paystack'; 
import AddAmountModel from '../component/models/AddAmountModel'; 
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { PayPalButton } from "react-paypal-button-v2";
  

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
        }  
        this.callBackCloseModel = this.callBackCloseModel.bind(this);
    } 

    componentDidMount() {  
       
    } 
    callBackCloseModel(){
        this.setState({ addAmountModelStatus:false }); 
    }
    callback = (response) => {
            console.log(response); // card charged successfully, get reference here
        }

        close = () => {
            console.log("Payment closed");
        }

        getReference = () => {
            //you can put any unique reference implementation code here
            let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

            for( let i=0; i < 15; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

     addFundModal(){
         this.setState({addAmountModelStatus:true});
     }   
     
    render() { 
         const client = {
            sandbox:    'sandbox_zjnvps83_tppvxcyz39pd62jc',
            
        }
        return (
             <div className="page">
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
                                        20.039 USD
                                    </p>
                                </div>

                                <div class="debit-card">
                                    <img src={require('../assets/img/card-template.png')} />
                                    <button  onClick={this.addFundModal.bind(this)} class="card-fund-btnt"><i class="fas fa-fingerprint"></i>Add Funds</button>
                                </div> 
                                <PayPalButton
                                    amount="0.01"
                                    shippingPreference="NO_SHIPPING"
                                    vault="false"
                                    onSuccess={(details, data) => {
                                      alert("Transaction completed by " + details.payer.name.given_name);
                             
                                      // OPTIONAL: Call your server to save the transaction
                                      return fetch("/paypal-transaction-complete", {
                                        method: "post",
                                        body: JSON.stringify({
                                          orderId: data.orderID
                                        })
                                      });
                                    }}
                                    options={{
                                      clientId: "AcCcPJdsxZYWoeVp8xhw0LAdJrJNc75_UryaI2oWLibiUdn7iL-7H8U-JtUaVrzvcJLT2eB2GqpNtq5b", 
                                    }}
                                  />                    
                            </div>
                            
                        </div>
                        <div class="transation-history">
                            <div class="transation-history-title">
                                <h2>Transation History</h2>
                            </div>
                            <div class="transation-history-list">
                                <ul>
                                    <li>
                                        <div class="history-list">
                                                <div class="Transation">
                                                    <img src={require('../assets/img/doller.png')} alt="" />
                                                    <div class="Transation-price">
                                                        <h2 class="credit-funding-price">+ $20</h2>
                                                        <p class="credit-funding">Credit > Funding</p>
                                                    </div>     
                                                </div> 
                                                <div class="transation-date_time">
                                                    <p>July 1, 2019</p>
                                                    <p>09:02:56</p>
                                                </div>    
                                        </div>
                                    </li>
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
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                             </div>    
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                             </div>    
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                             </div>    
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                             </div>    
                                        </div>
                                    </li>
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
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                            </div>     
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                            </div>     
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                            </div>     
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                            </div>     
                                        </div>
                                    </li>
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
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                            </div>     
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
                                                </div>
                                            </div>
                                            <div class="transation-date_time">
                                                <p>July 1, 2019</p>
                                                <p>09:02:56</p>
                                            </div>     
                                        </div>
                                    </li>
                                    <li>
                                        <div class="history-list">
                                            <div class="Transation">
                                                <img src={require('../assets/img/doller.png')} alt="" />
                                                <div class="Transation-price">
                                                    <h2 class="credit-funding-price">+ $20</h2>
                                                    <p class="credit-funding">Credit > Funding</p>
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
                    <AddAmountModel  sendCallBackCloseModel={this.callBackCloseModel}/>
                }
             </div>
        );
    }
} 
export default WalletScreen