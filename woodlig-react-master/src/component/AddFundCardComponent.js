import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select'; 
import  {ValidationHelper} from '../helper/ValidationHelper';
import  {SkillServices} from '../services/SkillServices'; 
import AddFundsModel from '../component/models/AddFundsModel';  
import SelectPaymentMethodModel from '../component/models/SelectPaymentMethodModel';  
 
class AddFundCardComponent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            amount:"00", 
            addFundsOpen:false,
            paymentMethodModel:false,
        }; 
        //this.handleChange = this.handleChange.bind(this); 
        this.addFunds = this.addFunds.bind(this); 
        this.addFundModelClose = this.addFundModelClose.bind(this); 
        this.paymentMethodModelClose = this.paymentMethodModelClose.bind(this); 
        this.reciveFunds = this.reciveFunds.bind(this); 
        this.receivePaymentMathod = this.receivePaymentMathod.bind(this); 
    }

    componentDidMount() {  
        
    }

    addFunds(){
        this.setState({addFundsOpen:true});
    }
    addFundModelClose(){
        this.setState({addFundsOpen:false});
    }
    paymentMethodModelClose(){
        this.setState({paymentMethodModel:false});
    }
    reciveFunds(amount){
        this.setState({amount:amount,paymentMethodModel:true});

    } 
    receivePaymentMathod(paymentMathod){ 
        alert(paymentMathod);
    } 
 
    render() { 
        return (
            <div>
			<div class="debit-card promote-card">
                <img src={require('../assets/img/card-template.png')} />
                <button onClick={this.addFunds} class="card-fund-btnt"><i class="fas fa-fingerprint"></i>View Original Post</button>
            
            </div>
            {this.state.addFundsOpen && 
                <AddFundsModel sendFund={this.reciveFunds} modelOpen={this.state.addFundsOpen} modelClose={this.addFundModelClose}/>
            }

            {this.state.paymentMethodModel &&
                <SelectPaymentMethodModel sendPaymentMathod={this.receivePaymentMathod} modelOpen={this.state.paymentMethodModel} modelClose={this.paymentMethodModelClose} />
            }
            </div>  
        );
    }
} 
export default AddFundCardComponent