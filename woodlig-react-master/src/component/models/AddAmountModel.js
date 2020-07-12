import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import PaystackButton from 'react-paystack';
import  {ValidationHelper} from '../../helper/ValidationHelper';
import  {SkillServices} from '../../services/SkillServices'; 
import {AuthServices} from '../../services/AuthServices'; 
import FileUploadComponent from '../FileUploadComponent'; 


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { PayPalButton } from 'react-paypal-button'
 
class AddAmountModel extends React.Component {
  constructor(props) {
      super(props); 
      this.state = { 
          amount: 100,
          showPaymentMethod: false,
          initPaystack: false,
          initPaypal:false,
          payStackKey: "pk_test_d843094e5d98ad888990b7bdfa8a54b03b944983", //PAYSTACK PUBLIC KEY
          pypalKey: "AcCcPJdsxZYWoeVp8xhw0LAdJrJNc75_UryaI2oWLibiUdn7iL-7H8U-JtUaVrzvcJLT2eB2GqpNtq5b", //PAYSTACK PUBLIC KEY
          email: "foobar@example.com",

      }; 
      this.handleChange = this.handleChange.bind(this);
      
  }
  
  componentDidMount() {  
      
  }
  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value }); 
  }  
  closeModel(){
      this.props.sendCallBackCloseModel();
  }
  selectPaymentMethod(){
   // this.props.sendCallBackCloseModel();
    this.setState({showPaymentMethod:true});
  }
  initPaystack(){
   // this.props.sendCallBackCloseModel();
    this.setState({showPaymentMethod:false,initPaystack:true});
    
  }
   
  payStackCallback = (response) => {
      console.log(response); // card charged successfully, get reference here
       this.props.recivePaymentCallBack();
       this.setState({showPaymentMethod:false,initPaystack:false,amount:"00"});
  }

  payStackClose = () => {
      console.log("Payment closed");
  }

  payStackGetReference = () => {
      //you can put any unique reference implementation code here
      let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

      for( let i=0; i < 15; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

  /********************************/
        PayPalButton
  /********************************/    
  onPaymentStart = () => {
    this.setState({initPaypal:true});  
    console.log("The payment was succeeded!");
      
  }

  onPaymentCancel = () => {
    this.setState({initPaypal:false,showPaymentMethod:false});  
    console.log("The payment was cacacaca!");
      
  } 
  render() { 
      const client = {
            sandbox: 'AcCcPJdsxZYWoeVp8xhw0LAdJrJNc75_UryaI2oWLibiUdn7iL-7H8U-JtUaVrzvcJLT2eB2GqpNtq5b',
            
        }  
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
                    console.log("The payment was succeeded!", payment);
                    this.props.recivePaymentCallBack();
                    this.setState({showPaymentMethod:false,amount:"00"});
                    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        } 
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
          const paypalOptions = {
            clientId: this.state.pypalKey,
            intent: 'capture',
            disableCard:['visa','mastercard','amex']
          } 
          const buttonStyles = {
            layout: 'vertical',
            shape: 'rect',
          }
      return (  
                  <div className={`modal-wrep ${this.state.initPaypal ? 'hide-payment-modal' : ''}`}>
                    { !this.state.showPaymentMethod && !this.state.initPaystack &&
                    <div className="add-funds">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header funds-header">      
                            <button type="button" onClick={this.closeModel.bind(this)}  class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div class="modal-body"> 
                            <div action="" method="post" name="funds" class="funds-form">
                              <div class="form-group">
                                <input type="text" name="amount" value={this.state.amount} class="form-control funds-add" onChange={this.handleChange} />
                              </div>
                              <button  class="add-fund-btnt" onClick={this.selectPaymentMethod.bind(this)}><i class="fas fa-fingerprint"></i>Add Funds</button>
                            </div>
                          </div>
                        </div>   
                      </div> 
                    </div>
                    } 
                    { this.state.showPaymentMethod && 
                        <div className="account-payment">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header upgrade-header"> 
                                <button type="button" onClick={this.closeModel.bind(this)} class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <div class="payment-gateway">
                                  <div class="paystack-payment">
                                    <img src={require('../../assets/img/paystack.png')} />  
                                    <div class="paystack-btn">            
                                      <button onClick={this.initPaystack.bind(this)} class="payment-btn">Continue with
                                        <img src={require('../../assets/img/paystack2.png')} />
                                      </button>
                                    </div>
                                  </div>
                                  <div class="paypal-payment">
                                    <img src={require('../../assets/img/paypal.png')} />
                                    <div class="paystack-btn">            
                                      <button href="" class="payment-btn">Continue with
                                        <img src={require('../../assets/img/paypal-2.png')} />
                                      </button>
                                       <PayPalButton
                                        paypalOptions={paypalOptions}
                                        buttonStyles={buttonStyles}
                                        amount={1.00}
                                        onPaymentSuccess={onSuccess} 
                                        onPaymentStart={this.onPaymentStart}  
                                        onPaymentCancel={this.onPaymentCancel}  
                                      />   
                                    </div>
                                  </div>
                                </div>
                              </div> 
                            </div>
                          </div>
                        </div>
                    } 
                     { this.state.initPaystack && !this.state.showPaymentMethod &&
                      <div className="paystack-card">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header upgrade-header"> 
                                <button type="button" onClick={this.closeModel.bind(this)} class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <div class="payment-gateway">
                                 <PaystackButton
                                    text="Make Payment"
                                    className="payButton"
                                    callback={this.payStackCallback}
                                    close={this.payStackClose}
                                    disabled={true}  
                                    embed={true}  
                                    reference={this.payStackGetReference()}
                                    email={this.state.email}
                                    amount={this.state.amount}
                                    paystackkey={this.state.payStackKey}
                                    tag="button" 
                                  /> 
                                </div>  
                              </div> 
                            </div>
                          </div>
                        </div>
                        
                    }
                  </div> 

      );
  }
}
 
export default AddAmountModel
