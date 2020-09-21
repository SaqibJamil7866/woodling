import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import paypalImg from '../assets/paypal.png';
import paystackImg from '../assets/paystack.png';
import history from '../public/history';

class PaymentOptions extends Component {

    constructor(props){
        super(props);
    }

    paypalPayment = (details, data) => {debugger

    }

    paypalPaymentError = (err) => {debugger

    }

    paystackPayment = () => {

    }

    render() {

        const { location: {val: funds }} = history;
        return ( 
            <div className="row">
                <div className="col-md-12 border-bottom-gray">
                    <div style={{backgroundImage: `url(${paypalImg})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center', height:'200px'}}>
                        <button className="paypalBtn" onClick={()=>this.paypalPayment}>
                            Continue with &nbsp;&nbsp;
                            <img src={require('../assets/paypal-2.png')} style={{width:'50px'}} alt="paypal" />
                        </button>
                        {/* ProductionPay pal button */}
                        
                        {/* <PayPalButton
                            amount={funds}
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                            onSuccess={(details, data)=>this.paypalPayment(details, data)}
                            onError={(err)=>this.paypalPaymentError(err)}
                            options={{
                                clientId: "sandbox_zjnvps83_tppvxcyz39pd62jc",
                                merchantId: "woodligtechnologyhub",
                                currency: "USD",
                                intent: "sale"
                            }}
                        /> */}

                        {/* usage */}

                        {/* <PayPalButton
                            amount="0.01"
                            onSuccess={(details, data)=>this.paypalPayment(details, data)}
                        /> */}
                    </div>
                </div>
                <div className="col-md-12">
                    <div style={{backgroundImage: `url(${paystackImg})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center', height:'200px'}}>
                        <button className="paypalBtn" onClick={()=>this.paystackPayment}>
                            Continue with &nbsp;&nbsp;
                            <img src={require('../assets/paystack2.png')} style={{width:'50px'}} alt="paystack" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default PaymentOptions;