import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select'; 
import  {ValidationHelper} from '../helper/ValidationHelper';
import  {SkillServices} from '../services/SkillServices'; 
import  AddFundCardComponent from '../component/AddFundCardComponent'; 
import  {WalletServices} from '../services/WalletServices'; 
 
class SummaryPromote extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            userBalance:'0', 
            skillsList:[],
            pramotionData:[],
        }; 
        //this.handleChange = this.handleChange.bind(this); 
    }

    componentDidMount() {  
        console.log(this.props.location.state.promote);
        this.setState({ pramotionData: this.props.location.state.promote,reviewLoad:false});
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
 
    render() { 
        const {pramotionData} = this.state;
        return (
            <div class="promote-page">
                <div class="promote-title-main">
                    <h2>Ready. Set. Promote!</h2> 
                </div>  
                <div class="promote-section">
                    <div class="promote-list">
                        <div class="promote-activity">
                            <div class="currently-wallet">
                                <p>You currently have ${this.state.userBalance} USD in your wallet.</p>
                            </div>
                            <AddFundCardComponent /> 
                            <div class="proceed-btn-esti">
                                <button href="" class="proceed-btn">Proceed</button>
                            </div>
                        </div>              
                    </div>
                    <div class="choose_audience-detail">
                        <div class="summary">
                            <div class="summary-title">
                                <p>Summary</p>
                            </div>
                            <div class="summary-details">
                                <table class="summary-table">
                                    <tr>
                                        <th>Audience</th>
                                        <td>1,350,000</td>
                                    </tr>
                                    <tr>
                                        <th>Duration & Budget</th>
                                        <td>${pramotionData.selectedBudget}/{pramotionData.selectedDuration} days</td>
                                    </tr>
                                    <tr>
                                        <th>Estimated reach</th>
                                        <td>{pramotionData.estimateReached}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="promotion-cost">
                                <p>This promotion will cost you a total of</p>
                                <h2>${pramotionData.totalPrice}</h2>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>        
        );
    }
} 
export default SummaryPromote