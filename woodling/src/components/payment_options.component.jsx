import React from 'react';
import paypalImg from '../assets/paypal.png';
import paystackImg from '../assets/paystack.png';
import { Modal } from 'react-bootstrap';
import history from '../public/history';

const PaymentOptions = (props) => {
    const { location: {val: funds }} = history;

    return ( 
        <div className="row">
            <div className="col-md-12 border-bottom-gray">
                <div style={{backgroundImage: `url(${paypalImg})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center', height:'200px'}}>
                    <button className="paypalBtn" onClick="" >
                        Continue with &nbsp;&nbsp;
                        <img src={require('../assets/paypal-2.png')} style={{width:'50px'}} alt="paypal" />
                    </button>
                </div>
            </div>
            <div className="col-md-12">
                <div style={{backgroundImage: `url(${paystackImg})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center', height:'200px'}}>
                    <button className="paypalBtn" onClick="" >
                        Continue with &nbsp;&nbsp;
                        <img src={require('../assets/paystack2.png')} style={{width:'50px'}} alt="paystack" />
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default PaymentOptions;