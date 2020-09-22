import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { PaystackButton, PaystackConsumer } from 'react-paystack';
import { ToastsStore } from 'react-toasts';
import paypalImg from '../assets/paypal.png';
import paystackImg from '../assets/paystack.png';
import history from '../public/history';

class PaymentOptions extends Component {

    constructor(props){
        super(props);
        this.state = {
            config: {
                reference: (new Date()).getTime(),
                email: "user@example.com",
                amount: 20000,
                publicKey: 'pk_live_e5cf7c70710f65e70bad88bbced413bcbc0b300b',
            }
        }
    }

    paypalBtnReady = () => {
        const { location: {val: funds }} = history;
        if(!funds){
            ToastsStore.error("You didn't enter funds.")
        }
    }

    paypalPayment = () => {debugger

    }

    paypalPaymentError = (err) => {
        console.log("paypal Err: ", err);
    }

    paystackPayment = () => {

    }

    render() {

        const { location: {val: funds }} = history;
        const componentProps = {
            ...this.state.config,
            text: 'Paystack Button Implementation',
            onSuccess: () => null,
            onClose: () => {debugger}
        };
        return ( 
            <div className="row">
                <div className="col-md-12 border-bottom-gray">
                    <div style={{backgroundImage: `url(${paypalImg})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center', height:'200px'}}>
                        {/* <button className="paypalBtn" onClick={()=>this.paypalPayment}>
                            Continue with &nbsp;&nbsp;
                            <img src={require('../assets/paypal-2.png')} style={{width:'50px'}} alt="paypal" />
                        </button> */}
                        {/* ProductionPay pal button */}
                        
                        <div className="paypalBtn">
                            <PayPalButton
                                style={{ color:"silver" }}
                                amount={funds}
                                onButtonReady={this.paypalBtnReady}
                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                onSuccess={(details, data)=>this.paypalPayment(details, data)}
                                onError={(err)=>this.paypalPaymentError(err)}
                                options={{
                                    clientId: "ARfhLhQPQkuxet2_1N6XYbIT_wOYiq3vVZF3GzH3S0zL5Fwx6rPkJwYdses8kePo6uKdjr37dBG_QGb8",
                                    components: "buttons",
                                    disableFunding:"card"
                                    // buttons:{PAYPAL:true*}
                                    // merchantId: "woodligtechnologyhub",
                                    // currency: "USD",
                                    // intent: "sale"
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div style={{backgroundImage: `url(${paystackImg})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center', height:'200px'}}>
                        <PaystackConsumer {...componentProps} >
                            {({initializePayment}) => (
                                <button className="paypalBtn" onClick={() => initializePayment()}>
                                    Continue with &nbsp;&nbsp;
                                    <img src={require('../assets/paystack2.png')} style={{width:'50px'}} alt="paystack" />
                                </button>
                            )}
                        </PaystackConsumer>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default PaymentOptions;