import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select';
import { PayPalButton } from 'react-paypal-button'
import PaystackButton from 'react-paystack';
 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class SelectPaymentMethodModel extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.logout();

        this.state = { 
             amount: 10000,
             modalOpen:this.props.modelOpen,
             initPaystack:false,
             initPaypal:false,
             paymentMethod:'',
             payStackKey: "pk_test_d843094e5d98ad888990b7bdfa8a54b03b944983", //PAYSTACK PUBLIC KEY
             pypalKey: "AcCcPJdsxZYWoeVp8xhw0LAdJrJNc75_UryaI2oWLibiUdn7iL-7H8U-JtUaVrzvcJLT2eB2GqpNtq5b", //PAYSTACK PUBLIC KEY
             email: "foobar@example.com",
        };

        this.handleChange = this.handleChange.bind(this);
        this.addFunds = this.addFunds.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.initPaystack = this.initPaystack.bind(this);
        
    }

    componentDidMount() {  
       
    } 
   
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }); 
    }
    addFunds(){ 
      this.props.sendFund(this.state.amount);
      this.closeModel();
    }
    closeModel(){
      
       this.setState({modalOpen:false,initPaystack:true});
       this.props.modelClose();
    }
    initPaystack(){
       this.setState({initPaystack:true,paymentMethod:'payStack'});
      
    }
    initPaypal(){
       this.setState({initPaypal:true,paymentMethod:'paypal'});
      
    }
    payStackCallback = (response) => {
      console.log(response); // card charged successfully, get reference here
       
    } 
    payStackClose = () => {
      this.setState({initPaystack:false});
      alert("close");
      
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
    this.setState({initPaypal:false});  
    console.log("The payment was cacacaca!");
      
  } 
  onSuccess = (payment) => { 
    console.log("The payment was succeeded!", payment);
    this.props.recivePaymentCallBack();
    this.setState({amount:"00",modalOpen:false});
  } 

    render() {
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
            <div>
              <div className={`modal-wrep ${this.state.initPaypal ? 'hide-payment-modal' : ''}`}>
                {!this.state.initPaystack && 
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
                                        <button  onClick={this.initPaystack}class="payment-btn">Continue with
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
                                          onPaymentSuccess={this.onSuccess} 
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
              </div>
              {this.state.initPaystack &&
                <div className="modal-wrep" >
                 <div className="add-funds account-payment">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header upgrade-header"> 
                                <button type="button" onClick={this.closeModel.bind(this)} class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div class="modal-body">  
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
               {this.state.initPaypal &&
                                   <PayPalButton
                                          paypalOptions={paypalOptions}
                                          buttonStyles={buttonStyles}
                                          amount={1.00}
                                          onPaymentSuccess={this.onSuccess} 
                                          onPaymentStart={this.onPaymentStart}  
                                          onPaymentCancel={this.onPaymentCancel}  
                                        /> 

                                   }  
            </div>        
        );
    }
}
 
export default SelectPaymentMethodModel