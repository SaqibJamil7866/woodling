import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
import Autocomplete from "react-autocomplete";
import Select from 'react-select'; 
import { Slider, Switch,Checkbox } from 'antd';

class DurationBudgetComponent extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = { 
             selectedDuration:10,
             selectedBudget:10,
             estimateReached:0,
             totalPrice:0,
             promotData: this.props.promotstate
        };

      this.handleDurationChange = this.handleDurationChange.bind(this);
      this.handleBudgetChange = this.handleBudgetChange.bind(this);
    }

    componentDidMount() {  
      
    } 

    handleBudgetChange(value){
       const selectedDuration = this.state;
       this.setState({selectedBudget:value});
       this.calculateEstReach(value,this.state.selectedDuration);
    }
    handleDurationChange(value){ 
      this.calculateEstReach(this.state.selectedBudget,value);
      this.setState({selectedDuration:value});
    } 

     calculateEstReach(price,days){ 
     var x = price * days;
     var y = (x/5)*1000;
     this.setState({estimateReached:y,totalPrice:x})
     console.log("Number Of Reached : " + price)
   }
     
    render() { 
        console.log("promotData",this.state.promotData);
        return (
        <div class="promote-page">
          <div class="promote-title-main">
            <h2>Duration & Budget</h2> 
          </div>  
          <div class="promote-section">
            <div class="promote-list">
              <div class="promote-activity">
                <div class="estimated-reach">
                  <h2>{this.state.estimateReached}</h2> 
                  <span>Estimated reach</span>
                </div>
                <div class="total-spend">           
                  <span>Total spend is;</span>
                  <h2>${this.state.selectedBudget} over {this.state.selectedDuration} days</h2>  
                </div>  
                <div class="proceed-btn-esti"> 
                  <Link to={{
                    pathname: '/promote-post-summary',
                    state: {
                      promote: this.state
                    }
                  }} className="btn blue-btn">View Profile</Link> 
                </div>
              </div>        
            </div>
            <div class="choose_audience-detail">
              <div class="duraction">
                  <div class="duraction-title">
                    <h2>Duration</h2>
                  </div>
                <div class="duraction-slider">
                   <Slider max={20} min={1} tooltipVisible defaultValue={this.state.selectedDuration} onChange={this.handleDurationChange}/>
                </div>
              </div>  
              <div class="budget">
                <div class="budget-title">
                  <h2>Budget</h2>
                </div>
                <div class="budget-slider">
                   <Slider max={20} min={1} tooltipVisible defaultValue={this.state.selectedBudget} onChange={this.handleBudgetChange}/>
                </div>
              </div>  
            </div>  
          </div>
        </div>      
        );
    }
}
 
export default DurationBudgetComponent